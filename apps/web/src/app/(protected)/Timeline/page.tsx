'use client';

import Header from '@/components/Headers/Header';
import Loader from '@/components/ui/Loader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GET_PROJECTS } from '@/graphql/queries';
import { Task, TaskTypeItems } from '@/types/task';
import { useQuery } from '@apollo/client';
import { DisplayOption, Gantt, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { useTheme } from 'next-themes';
import { useCallback, useMemo, useState } from 'react';

const TimelineView = ({ id }: { id: string }) => {
  const { data, loading } = useQuery(GET_PROJECTS);

  const projects = data?.tasks || [];

  const { theme } = useTheme();
  const darkMode = theme === 'dark' || theme === undefined;

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: 'en-US',
  });

  const changeViewMode = useCallback((mode: ViewMode) => {
    setDisplayOptions((prevOptions) => ({
      ...prevOptions,
      viewMode: mode,
    }));
  }, []);

  const ganttTasks = useMemo(() => {
    return (
      projects
        .filter((task: Task) => task.startDate && task.dueDate)
        .map((task: Task) => ({
          start: new Date(projects.startDate as string),
          end: new Date(projects.endDate as string),
          name: projects.name,
          id: projects.id,
          type: 'projects' as TaskTypeItems,
          progress: 50,
          isDisabled: false,
        })) || []
    );
  }, [projects]);

  if (loading) {
    return <Loader />;
  }

  const hasProjects = ganttTasks.length > 0;

  return (
    <div className="max-w-full p-8">
      <header className="mb-4 flex items-center justify-between">
        <Header name="Projects Timeline" />

        <Select onValueChange={(value) => changeViewMode(value as ViewMode)}>
          <SelectTrigger className="dark:bg-dark2 w-[100px] sm:w-[125px] md:w-[180px]">
            <SelectValue placeholder={displayOptions.viewMode} />
          </SelectTrigger>
          <SelectContent className="dark:bg-dark2">
            <SelectItem value={ViewMode.Day}>Day</SelectItem>
            <SelectItem value={ViewMode.Week}>Week</SelectItem>
            <SelectItem value={ViewMode.Month}>Month</SelectItem>
          </SelectContent>
        </Select>
      </header>

      <div className="bg-light2 dark:bg-dark2 overflow-hidden rounded-md shadow">
        {hasProjects ? (
          <div className="timeline">
            <Gantt
              tasks={ganttTasks}
              {...displayOptions}
              listCellWidth="100px"
              columnWidth={
                displayOptions.viewMode === ViewMode.Month ? 150 : 100
              }
              projectBackgroundColor={darkMode ? '#4B5563' : '#E5E7EB'}
              projectProgressColor={darkMode ? '#1f2937' : '#aeb8c2'}
              projectProgressSelectedColor={darkMode ? '#000' : '#9ba1a6'}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center p-10">
            <p className="text-gray-500 dark:text-gray-400">
              No Projects available. Start a new project to see timeline !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineView;
