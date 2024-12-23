'use client';

import AddButton from '@/components/Buttons/AddButton';
import Header from '@/components/Headers/Header';
import BoardView from '@/components/Project/BoardView';
import CalendarView from '@/components/Project/CalendarView';
import TableView from '@/components/Project/TableView';
import TimelineView from '@/components/Project/TimelineView';
import SearchBar from '@/components/SearchBar/SearchBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSideBarStore, useTabStore } from '@/lib/state';
import { Calendar, Clock, Filter, Grid3X3, Share2, Table } from 'lucide-react';
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
  const { value: isSideBarVisible } = useSideBarStore();
  return (
    <TabsTrigger
      value={value}
      className={`flex ${isSideBarVisible ? 'space-x-1 md:space-x-2' : 'sm:space-x-2'}`}
    >
      <Icon
        className={`hidden sm:inline-flex ${isSideBarVisible ? 'h-4 w-4 md:h-5 md:w-5' : 'h-5 w-5'}`}
      />
      <span>{label}</span>
    </TabsTrigger>
  );
};

const Page = ({ params }: Props) => {
  const { id } = use(params);
  const { activeTab, setActiveTab } = useTabStore();
  const { value: isSideBarVisible } = useSideBarStore();

  return (
    <div
      className={`relative py-4 ${isSideBarVisible ? 'pl-2 xl:px-12' : 'px-2 sm:px-6 xl:px-12'} `}
    >
      <div className="relative ml-1 mr-2">
        <div className="relative flex justify-between pt-4">
          <Header name="Product Development " />
          <AddButton />
        </div>
      </div>

      <Tabs
        value={activeTab}
        className="mx-0 w-full px-0"
        onValueChange={setActiveTab}
      >
        <TabsList
          className={`mb-5 flex flex-col space-y-4 px-2 lg:flex-row-reverse lg:items-center lg:justify-between lg:space-y-0 ${isSideBarVisible ? 'text-sm md:text-lg lg:flex lg:flex-col lg:space-y-6 lg:text-xl xl:flex-row-reverse xl:items-center xl:justify-between xl:space-y-0' : 'text-base sm:text-lg lg:text-xl'}`}
        >
          <div
            className={`flex flex-row items-center justify-between ${isSideBarVisible ? 'w-full xl:w-auto' : 'w-full lg:w-auto'} `}
          >
            <div className="mx-2 flex space-x-2">
              <IconButton icon={Filter} />
              <IconButton icon={Share2} />
            </div>

            <SearchBar placeholder="Search Tasks" />
          </div>

          <div
            className={`grid h-full w-full grid-cols-4 ${isSideBarVisible ? 'lg:w-full xl:w-[60%]' : 'lg:w-[60%]'} `}
          >
            <TabTrigger value="Board" icon={Grid3X3} label="Board" />
            <TabTrigger value="Calendar" icon={Calendar} label="Calendar" />
            <TabTrigger value="Timeline" icon={Clock} label="Timeline" />
            <TabTrigger value="Table" icon={Table} label="Table" />
          </div>
        </TabsList>

        <TabsContent value="Board">
          <BoardView id={id} />
        </TabsContent>

        <TabsContent value="Calendar">
          <CalendarView id={id} />
        </TabsContent>

        <TabsContent value="Timeline">
          <TimelineView id={id} />
        </TabsContent>

        <TabsContent value="Table">
          <TableView id={id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
