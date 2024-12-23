'use client';

import { columns } from '@/constants/columns';
import { GET_TASKS } from '@/graphql/queries';
import { useQuery } from '@apollo/client';
import { DataTable } from '../ui/DataTable';
import Loader from '../ui/Loader';

const TableView = ({ id }: { id: string }) => {
  const { data, loading } = useQuery(GET_TASKS, {
    variables: { projectId: id },
  });

  const tasks = data?.tasks || [];

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <DataTable columns={columns} data={tasks} />
    </div>
  );
};

export default TableView;
