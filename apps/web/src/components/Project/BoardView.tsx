'use client';

import { Status } from '@/types/task';
import { useMutation, useQuery } from '@apollo/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { UPDATE_TASK_STATUS } from '../../graphql/mutations';
import { GET_TASKS } from '../../graphql/queries';
import TaskColumn from '../Tasks/TaskColumn';
import Loader from '../ui/Loader';

const BoardView = ({ id }: { id: string }) => {
  const taskStatus = [
    Status.ToDo,
    Status.InProgress,
    Status.UnderReview,
    Status.Completed,
  ];

  const { data, loading: loadingTasks } = useQuery(GET_TASKS, {
    variables: { projectId: id },
  });

  const tasks = data?.tasks || [];

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

  if (loading || loadingTasks) {
    return <Loader />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks}
            moveTask={handleStatusChange}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default BoardView;
