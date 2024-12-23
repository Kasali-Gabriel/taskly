import { Task } from '@/types/task';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

const statusColors: Record<string, string> = {
  'To do': 'bg-[#60A5FA] text-white',
  'In Progress': 'bg-[#FACC15] text-black',
  'Under Review': 'bg-[#FB923C] text-white',
  Completed: 'bg-[#22C55E] text-white',
};

const renderStatusCell = (status: string) => {
  const colorClass = statusColors[status];
  return (
    <div className="text-center">
      <span className={`rounded-full px-2 py-1 ${colorClass}`}>{status}</span>
    </div>
  );
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    size: 100,
  },

  {
    accessorKey: 'description',
    header: 'Description',
    size: 200,
  },

  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <div
          className="mx-0 flex w-fit items-center px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }: { row: any }) => {
      const status = row.getValue('status') as string;
      return renderStatusCell(status);
    },
    maxSize: 75, // Reduced size
  },

  {
    accessorKey: 'priority',
    header: ({ column }) => {
      return (
        <button
          className="mx-0 flex w-fit items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Priority
          <ArrowUpDown className="ml-1 mr-0 h-4 w-4" />
        </button>
      );
    },
    maxSize: 50, // Reduced size
  },

  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => {
      const tags = row.original.tags;
      return Array.isArray(tags) ? tags.join(', ') : 'No Tags';
    },
    size: 100,
  },

  {
    accessorKey: 'startDate',
    header: ({ column }) => {
      return (
        <button
          className="mx-0 flex w-fit items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Start Date
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </button>
      );
    },
    maxSize: 75, // Reduced size
  },

  {
    accessorKey: 'dueDate',
    header: ({ column }) => {
      return (
        <button
          className="mx-0 flex w-fit items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Due Date
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </button>
      );
    },
  },

  {
    accessorKey: 'author.name',
    header: 'Author',
    size: 150,
    cell: ({ row }) => row.original.author?.name || 'Unknown',
  },

  {
    accessorKey: 'assignee.name',
    header: 'Assignee',
    size: 150,
    cell: ({ row }) => row.original.assignee?.name || 'Unassigned',
  },
];
