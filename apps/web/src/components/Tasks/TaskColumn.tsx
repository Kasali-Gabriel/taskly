import { useSideBarStore } from '@/lib/state';
import { Project, TaskColumnProps } from '@/types/task';
import { Droppable } from '@hello-pangea/dnd';
import { MoreHorizontal, Plus } from 'lucide-react';
import { useState } from 'react';
import { NewTask, NewTaskButton, NewTaskForm } from './NewTask';
import Task from './Task';

const AddTaskSection = ({
  open,
  setOpen,
  project,
  status,
  hideText = false, // Added a new prop to control text visibility
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  project: Project;
  status: string;
  hideText?: boolean;
}) => (
  <NewTask open={open} setOpen={setOpen}>
    <NewTaskButton>
      <div className="hover:bg-light dark:hover:bg-dark2 w-full cursor-pointer items-center justify-center space-x-2 rounded-lg p-2 py-3 text-gray-300 sm:flex">
        <Plus className="h-6 w-6" />
        {!hideText && <span>Add Task</span>}
      </div>
    </NewTaskButton>
    <NewTaskForm setOpen={setOpen} project={project} status={status} />
  </NewTask>
);

const TaskColumn = ({ status, tasks, project }: TaskColumnProps) => {
  const { value: isSideBarVisible } = useSideBarStore();
  const [open, setOpen] = useState(false);

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task) => task.status === status)
    : [];

  return (
    <div className="my-2 flex flex-col rounded-lg py-2">
      <div className="flex w-[70vw] sm:w-[32.5vw] lg:w-[22.5vw]">
        <div
          className={`flex w-full items-center justify-between ${
            isSideBarVisible ? 'pl-2 lg:pl-5 xl:pl-2' : 'pl-5'
          }`}
        >
          <h3 className="flex items-center text-lg font-semibold 2xl:text-2xl">
            {status}
            <span className="ml-2 mt-1 text-sm leading-none text-gray-400">
              {filteredTasks.length}
            </span>
          </h3>

          <div className="flex items-center gap-2">
            <AddTaskSection
              open={open}
              setOpen={setOpen}
              project={project}
              status={status}
              hideText={true}
            />

            <button className="flex h-6 w-5 transform items-center justify-center transition-all hover:scale-125">
              <MoreHorizontal size={26} />
            </button>
          </div>
        </div>
      </div>

      <Droppable droppableId={status} type="TASK">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`h-full space-y-2 rounded-md p-2 transition-colors ${
              snapshot.isDraggingOver ? 'bg-gray-200 dark:bg-gray-700' : ''
            } ${filteredTasks.length === 0 && 'bg-light/30 dark:bg-dark2/30 h-full'}`}
          >
            {!filteredTasks.length && (
              <AddTaskSection
                open={open}
                setOpen={setOpen}
                project={project}
                status={status}
              />
            )}

            {filteredTasks.length > 0 &&
              filteredTasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}

            {filteredTasks.length > 0 && (
              <AddTaskSection
                open={open}
                setOpen={setOpen}
                project={project}
                status={status}
              />
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
