'use client';

import { GET_TASKS } from '@/graphql/queries';
import { Task, TaskTypeItems } from '@/types/task';
import { useQuery } from '@apollo/client';
import { DisplayOption, Gantt, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import { useTheme } from 'next-themes';
import { useCallback, useMemo, useState } from 'react';
import Loader from '../ui/Loader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const TimelineView = ({ id }: { id: string }) => {
  const { data, loading } = useQuery(GET_TASKS, {
    variables: { projectId: id },
  });

  const tasks = data?.tasks || [];

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
      tasks
        .filter((task: Task) => task.startDate && task.dueDate)
        .map((task: Task) => ({
          start: new Date(task.startDate as string),
          end: new Date(task.dueDate as string),
          name: task.title,
          id: task.id,
          type: 'task' as TaskTypeItems,
          progress: task.points ? (task.points / 10) * 100 : 0,
          isDisabled: false,
        })) || []
    );
  }, [tasks]);

  if (loading) {
    return <Loader />;
  }

  const hasTasks = ganttTasks.length > 0;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="me-2 font-bold sm:text-lg">Project Tasks Timeline</h1>

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
      </div>

      <div className="bg-light2 dark:bg-dark2 overflow-hidden rounded-md shadow">
        {hasTasks ? (
          <div className="timeline">
            <Gantt
              tasks={ganttTasks}
              {...displayOptions}
              listCellWidth="100px"
              columnWidth={
                displayOptions.viewMode === ViewMode.Month ? 150 : 100
              }
              barBackgroundColor={darkMode ? '#4B5563' : '#E5E7EB'}
              barBackgroundSelectedColor={darkMode ? '#2D3748' : '#F3F4F6'}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center p-10">
            <p className="text-gray-500 dark:text-gray-400">
              No tasks available. Add a new task to to see timeline !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineView;
