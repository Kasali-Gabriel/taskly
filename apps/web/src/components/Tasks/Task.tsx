import { Task as TaskType } from '@/types/task';
import { format } from 'date-fns';
import { EllipsisVertical, MessageSquareMore } from 'lucide-react';
import Image from 'next/image';
import { useDrag } from 'react-dnd';

const Task = ({ task }: { task: TaskType }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const taskTagsSplit = task.tags ? task.tags.split(',') : [];

  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), 'P')
    : '';

  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), 'P')
    : '';

  const numberOfComments = task.comments?.length || 0;

  const PriorityTag = ({ priority }: { priority: TaskType['priority'] }) => (
    <div
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        priority === 'Urgent'
          ? 'bg-red-200 text-red-700'
          : priority === 'High'
            ? 'bg-orange-200 text-orange-700'
            : priority === 'Medium'
              ? 'bg-yellow-200 text-yellow-700'
              : 'bg-gray-200 text-gray-700'
      }`}
    >
      {priority}
    </div>
  );

  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`bg-light2 dark:bg-dark2 mb-4 rounded-md p-1 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`${task.attachments[0].url}`}
          alt={`${task.attachments[0].name}`}
          width={400}
          height={200}
          className="h-auto w-full rounded-md"
        />
      )}

      <div className="p-3 md:p-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}

            <div className="flex gap-2">
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <button className="flex h-6 w-4 flex-shrink-0 transform items-center justify-center transition-all hover:scale-125 dark:text-neutral-500">
            <EllipsisVertical size={26} />
          </button>
        </div>

        <div className="my-3 flex justify-between">
          <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
          {typeof task.points === 'number' && (
            <div className="text-xs font-semibold dark:text-white">
              {task.points} pts
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {formattedStartDate && <span>{formattedStartDate} - </span>}
          {formattedDueDate && <span>{formattedDueDate}</span>}
        </div>
        <p className="text-sm text-gray-600 dark:text-neutral-500">
          {task.description}
        </p>
        <div className="dark:border-stroke-dark mt-4 border-t border-gray-200" />

        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[6px] overflow-hidden">
            {task.assignee && (
              <Image
                key={task.assignee.id}
                src={`${task.assignee.profilePicture!}`}
                alt={task.assignee.name}
                width={30}
                height={30}
                className="dark:border-dark-secondary h-8 w-8 rounded-full border-2 border-white object-cover"
              />
            )}

            {task.author && (
              <Image
                key={task.author.id}
                src={`${task.author.profilePicture!}`}
                alt={task.author.name}
                width={30}
                height={30}
                className="dark:border-dark-secondary h-8 w-8 rounded-full border-2 border-white object-cover"
              />
            )}
          </div>

          <div className="flex items-center text-gray-500 dark:text-neutral-500">
            <MessageSquareMore size={20} />

            <span className="ml-1 text-sm dark:text-neutral-400">
              {numberOfComments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
