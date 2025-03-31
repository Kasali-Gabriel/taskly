'use client';

import { Status, Task } from '@/types/task';
import { useMutation } from '@apollo/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { UPDATE_TASK_STATUS } from '../../graphql/mutations';
import TaskColumn from '../Tasks/TaskColumn';

const BoardView = ({ tasks }: { tasks: Task[] }) => {
  const taskStatus = [
    Status.ToDo,
    Status.InProgress,
    Status.UnderReview,
    Status.Completed,
  ];

  const [updateTaskStatus, { loading }] = useMutation(UPDATE_TASK_STATUS);

  const handleStatusChange = (taskId: string, newStatus: Status) => {
    updateTaskStatus({
      variables: {
        updateTaskStatusInput: {
          id: taskId,
          status: newStatus,
        },
      },
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="overflow-x-auto">
        <div className="flex flex-row space-x-4">
          {taskStatus.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks}
              moveTask={handleStatusChange}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default BoardView;
