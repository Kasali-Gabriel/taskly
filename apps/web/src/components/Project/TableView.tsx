'use client';

import { columns } from '@/constants/columns';
import { Project, Task } from '@/types/task';
import { DataTable } from '../ui/DataTable';

const TableView = ({ tasks, project }: { tasks: Task[]; project: Project }) => {
  return (
    <div className="h-full w-full">
      <DataTable columns={columns} data={tasks} project={project} />
    </div>
  );
};

export default TableView;
