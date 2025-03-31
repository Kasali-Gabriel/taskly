import { useSideBarStore } from '@/lib/state';
import { TaskColumnProps } from '@/types/task';
import { EllipsisVertical } from 'lucide-react';
import { useDrop } from 'react-dnd';
import Task from './Task';

const TaskColumn = ({ status, tasks, moveTask }: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item: { id: string }) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const { value: isSideBarVisible } = useSideBarStore();

  const taskCount = Array.isArray(tasks)
    ? tasks.filter((task) => task.status === status).length
    : 0;

  const statusColor = {
    'To do': '#60A5FA',
    'In Progress': '#FACC15',
    'Under Review': '#FB923C',
    Completed: '#22C55E',
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`rounded-lg py-2 ${isOver ? 'bg-blue-100 dark:bg-neutral-950' : ''} `}
    >
      <div className="mb-3 flex w-[70vw] sm:w-[32.5vw] lg:w-[22.5vw]">
        <div
          className={`w-2 rounded-s-lg`}
          style={{ backgroundColor: statusColor[status] }}
        />

        <div
          className={`bg-light2 dark:bg-dark2 flex w-full items-center justify-between rounded-e-lg py-4 ${isSideBarVisible ? 'px-2 lg:px-5 xl:px-2' : 'px-5'}`}
        >
          <h3 className="flex items-center text-lg font-semibold 2xl:text-2xl">
            {status}

            <span className="ml-2 inline-block h-6 w-6 rounded-full bg-gray-200 p-1 text-center text-sm leading-none dark:bg-gray-500">
              {taskCount}
            </span>
          </h3>

          <div className="flex items-center gap-1">
            <button className="flex h-6 w-5 transform items-center justify-center transition-all hover:scale-125">
              <EllipsisVertical size={26} />
            </button>
          </div>
        </div>
      </div>

      {Array.isArray(tasks) &&
        tasks
          .filter((task) => task.status === status)
          .map((task) => <Task key={task.id} task={task} />)}
    </div>
  );
};

export default TaskColumn;
