'use client';

import { Project, Status, Task } from '@/types/task';
import { useMutation } from '@apollo/client';
import { DragDropContext } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UPDATE_TASK_STATUS } from '../../graphql/mutations';
import { NewTask, NewTaskButton, NewTaskForm } from '../Tasks/NewTask';
import TaskColumn from '../Tasks/TaskColumn';

const BoardView = ({
  tasks: initialTasks,
  project,
}: {
  tasks: Task[];
  project: Project;
}) => {
  const taskStatus = [
    Status.ToDo,
    Status.InProgress,
    Status.UnderReview,
    Status.Completed,
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS);
  const [open, setOpen] = useState(false);

  const handleStatusChange = (taskId: string, newStatus: Status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );

    updateTaskStatus({
      variables: {
        updateTaskStatusInput: {
          id: taskId,
          status: newStatus,
        },
      },
    });
  };

  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    handleStatusChange(draggableId, destination.droppableId as Status);
  };

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="overflow-x-auto">
        <div className="flex flex-col space-y-2">
          <NewTask open={open} setOpen={setOpen}>
            <NewTaskButton>
              <div className="hidden h-10 w-fit cursor-pointer items-center space-x-2 rounded-lg border border-stone-300 p-2 hover:bg-black/20 sm:flex dark:border-stone-600">
                <Plus className="h-6 w-6" />
                <span className="hidden sm:block">Add Task</span>
              </div>
            </NewTaskButton>

            <NewTaskForm setOpen={setOpen} project={project} />
          </NewTask>

          <div className="flex flex-row space-x-4">
            {taskStatus.map((status) => (
              <TaskColumn
                key={status}
                status={status}
                tasks={tasks.filter((task) => task.status === status)}
                project={project}
              />
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default BoardView;
