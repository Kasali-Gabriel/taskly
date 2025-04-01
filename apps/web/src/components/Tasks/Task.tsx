import { Task as TaskType } from '@/types/task';
import { Draggable } from '@hello-pangea/dnd';
import { format, parseISO } from 'date-fns';
import { MessageSquareMore } from 'lucide-react';
import Image from 'next/image';

const Task = ({ task, index }: { task: TaskType; index: number }) => {
  const taskTagsSplit: string[] = Array.isArray(task.tags) ? task.tags : [];

  const formattedDateRange = (() => {
    const currentYear = new Date().getFullYear();

    if (task.startDate && task.dueDate) {
      const start = parseISO(task.startDate);
      const end = parseISO(task.dueDate);
      if (format(start, 'yyyy') !== format(end, 'yyyy')) {
        return `${format(start, 'MMM d, yyyy')} - ${format(end, 'MMM d, yyyy')}`;
      }
      return format(start, 'MMM') === format(end, 'MMM')
        ? `${format(start, 'MMM d')} - ${format(end, 'd')}`
        : `${format(start, 'MMM d')} - ${format(end, 'MMM d')}`;
    }

    if (task.dueDate) {
      const dueDate = parseISO(task.dueDate);
      return format(dueDate, 'yyyy') !== currentYear.toString()
        ? format(dueDate, 'MMM d, yyyy')
        : format(dueDate, 'MMM d');
    }

    return '';
  })();

  const numberOfComments = task.comments?.length || 0;

  const PriorityTag = ({ priority }: { priority: TaskType['priority'] }) => (
    <div
      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
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
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="dark:bg-dark2 mb-2 w-[70vw] cursor-pointer rounded-xl border-2 bg-gray-100 p-1 hover:border-gray-400 hover:shadow sm:w-[32.5vw] lg:w-[22.5vw] dark:hover:border-gray-400"
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

          <div className="w-full space-y-3 p-3 md:space-y-5">
            <h2 className="text-ellipsis whitespace-normal">{task.title}</h2>

            <div className="flex flex-wrap items-center gap-1.5">
              {task.priority && <PriorityTag priority={task.priority} />}
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="w-fit rounded-2xl bg-gray-300 px-2 py-0.5 text-xs text-black dark:bg-gray-700 dark:text-white"
                >
                  {tag}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center space-x-2 overflow-hidden">
                {task.assignee && (
                  <Image
                    key={task.assignee.id}
                    src={`${task.assignee.profilePicture!}`}
                    alt={task.assignee.name}
                    width={30}
                    height={30}
                    className="h-7 w-7 rounded-full border-2 object-cover"
                  />
                )}

                <div className="text-sm text-gray-400">
                  {formattedDateRange}
                </div>
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
      )}
    </Draggable>
  );
};

export default Task;
