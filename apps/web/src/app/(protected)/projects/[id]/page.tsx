'use client';

import Header from '@/components/Headers/Header';
import BoardView from '@/components/Project/BoardView';
import CalendarView from '@/components/Project/CalendarView';
import Overview from '@/components/Project/Overview';
import TableView from '@/components/Project/TableView';
import TimelineView from '@/components/Project/TimelineView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GET_PROJECT_BY_ID } from '@/graphql/queries';
import { useSideBarStore, useTabStore } from '@/lib/state';
import { Task } from '@/types/task';
import { useQuery } from '@apollo/client';
import {
  Calendar,
  Clock,
  LayoutGrid,
  SquareChartGantt,
  Table,
} from 'lucide-react';
import { use } from 'react';

type Props = {
  params: Promise<{ id: string }>;
};

const IconButton = ({
  icon: Icon,
  ...props
}: {
  icon: React.ComponentType<{ className?: string }>;
}) => (
  <button
    className="flex items-center rounded-md text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300"
    {...props}
  >
    <Icon className="h-5 w-5" />
  </button>
);

const TabTrigger = ({
  value,
  icon: Icon,
  label,
}: {
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) => {
  return (
    <TabsTrigger
      value={value}
      className="flex items-center justify-center space-x-1"
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      <span className="mt-0.5 sm:mt-[0.175rem]">{label}</span>
    </TabsTrigger>
  );
};

const Page = ({ params }: Props) => {
  const { id } = use(params);
  const { activeTab, setActiveTab } = useTabStore();
  const { value: isSideBarVisible } = useSideBarStore();

  const { data } = useQuery(GET_PROJECT_BY_ID, {
    variables: { projectId: id },
  });

  const project = data?.getProjectById;
  const tasks: Task[] = project?.tasks || [];

  return (
    <div
      className={`relative h-full w-full pt-3 ${isSideBarVisible ? 'px-2 sm:pl-4 xl:pl-10' : 'px-2 sm:pl-4 xl:px-10'} `}
    >
      <div className="relative ml-1 mr-2">
        <div className="relative flex justify-between">
          <Header name={project?.name} />
        </div>
      </div>

      <Tabs
        value={activeTab}
        className="mx-0 w-full px-0"
        onValueChange={setActiveTab}
      >
        <TabsList
          className={`flex w-screen flex-row items-center justify-start space-x-2 overflow-x-auto bg-[#E9ECEF] p-1 sm:w-full sm:rounded-md dark:bg-[#252836] ${isSideBarVisible ? 'text-sm md:text-lg lg:text-xl' : 'text-base sm:text-lg lg:text-xl'}`}
        >
          <TabTrigger
            value="Overview"
            icon={SquareChartGantt}
            label="Overview"
          />
          <TabTrigger value="Board" icon={LayoutGrid} label="Board" />
          <TabTrigger value="Calendar" icon={Calendar} label="Calendar" />
          <TabTrigger value="Timeline" icon={Clock} label="Timeline" />
          <TabTrigger value="Table" icon={Table} label="Table" />
        </TabsList>

        {/* <div className="mx-2 flex space-x-2">
            <IconButton icon={Filter} />
            <IconButton icon={ArrowDownUp} />
          </div> */}

        <TabsContent value="Overview">
          <Overview project={project} />
        </TabsContent>

        <TabsContent value="Board">
          <BoardView tasks={tasks} />
        </TabsContent>

        <TabsContent value="Calendar">
          <CalendarView tasks={tasks} />
        </TabsContent>

        <TabsContent value="Timeline">
          <TimelineView tasks={tasks} />
        </TabsContent>

        <TabsContent value="Table">
          <TableView tasks={tasks} project={project} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
