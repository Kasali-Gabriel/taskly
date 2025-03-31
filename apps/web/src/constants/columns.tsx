import { Task } from '@/types/task';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  CheckCircle2,
  Clock,
  Hourglass,
  SearchCheck,
} from 'lucide-react';
const statusColor = {
  'To do': '#60A5FA',
  'In Progress': '#FACC15',
  'Under Review': '#FB923C',
  Completed: '#22C55E',
};

const statusIcons: Record<string, JSX.Element> = {
  'To do': <Clock className="mr-1 h-4 w-4" />,
  'In Progress': <Hourglass className="h-4 w-4" />,
  'Under Review': <SearchCheck className="h-4 w-4" />,
  Completed: <CheckCircle2 className="h-4 w-4" />,
};

const renderStatusCell = (status: keyof typeof statusColor) => {
  if (!status) return '';

  const icon = statusIcons[status];
  return (
    <div
      className="flex w-fit items-center justify-start space-x-1 rounded-xl px-2 py-0.5 text-black"
      style={{ backgroundColor: statusColor[status] }}
    >
      {icon}
      <span>{status}</span>
    </div>
  );
};

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const daySuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };
  return `${day}${daySuffix(day)} ${month}, ${year}`;
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    size: 100,
    cell: ({ row }) => (
      <div
        className="min-w-[8rem] overflow-hidden text-ellipsis break-words"
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 4,
          overflow: 'hidden',
        }}
      >
        {row.getValue('title')}
      </div>
    ),
  },

  {
    accessorKey: 'description',
    header: 'Description',
    size: 200,
    cell: ({ row }) => (
      <div
        className="min-w-[8rem] overflow-hidden text-ellipsis break-words"
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 4,
          overflow: 'hidden',
        }}
      >
        {row.getValue('description')}
      </div>
    ),
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
      return (
        <div className="min-w-[8rem]">
          {renderStatusCell(status as keyof typeof statusColor)}
        </div>
      );
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
    cell: ({ row }) => (
      <div className="min-w-[8rem]">{row.getValue('priority')}</div>
    ),
    maxSize: 50, // Reduced size
  },

  {
    accessorKey: 'tags',
    header: 'Tags',
    enableGlobalFilter: true,
    accessorFn: (row) => row.tags || [],
    cell: ({ row }) => {
      const tags = row.original.tags;
      return Array.isArray(tags) ? (
        <div className="flex min-w-[8rem] flex-wrap gap-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-2xl bg-gray-300 px-3 py-0.5 text-black dark:bg-gray-700 dark:text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : (
        'No Tags'
      );
    },
  },

  {
    accessorKey: 'startDate',
    enableGlobalFilter: false,
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
    cell: ({ row }) => {
      const startDate = row.getValue('startDate') as string;
      return <div className="min-w-[8rem]">{formatDate(startDate)}</div>;
    },
    maxSize: 75, // Reduced size
  },

  {
    accessorKey: 'dueDate',
    enableGlobalFilter: false,
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
    cell: ({ row }) => {
      const dueDate = row.getValue('dueDate') as string;
      return <div className="min-w-[8rem]">{formatDate(dueDate)}</div>;
    },
  },

  {
    accessorKey: 'author.name',
    header: 'Author',
    size: 150,
    cell: ({ row }) => (
      <div className="min-w-[8rem]">
        {row.original.author?.name || 'Unknown'}
      </div>
    ),
  },

  {
    accessorKey: 'assignee.name',
    header: 'Assignee',
    size: 150,
    cell: ({ row }) => (
      <div className="min-w-[8rem]">
        {row.original.assignee?.name || 'Unassigned'}
      </div>
    ),
  },
];
