'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useTableStore } from '@/lib/state';
import { Project } from '@/types/task';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { NewTask, NewTaskButton, NewTaskForm } from '../Tasks/NewTask';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Input } from './input';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  project: Project;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  project,
}: DataTableProps<TData, TValue>) {
  const sorting = useTableStore((state) => state.sorting);
  const setSorting = useTableStore((state) => state.setSorting);
  const columnVisibility = useTableStore((state) => state.columnVisibility);
  const setColumnVisibility = useTableStore(
    (state) => state.setColumnVisibility,
  );

  const [globalFilter, setGlobalFilter] = useState<any>([]);

  const [open, setOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getColumnCanGlobalFilter: () => true,
    globalFilterFn: 'includesString',
    state: {
      sorting,
      columnVisibility,
      globalFilter,
    },
  });

  return (
    <div>
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <h1 className="w-full text-xl font-medium sm:w-auto">Table</h1>

        <div className="my-2 flex w-full items-center justify-between space-x-2 px-1 sm:w-auto sm:justify-normal">
          <NewTask open={open} setOpen={setOpen}>
            <NewTaskButton>
              <div className="hidden h-10 w-auto cursor-pointer items-center space-x-2 rounded-lg border border-stone-300 p-2 hover:bg-black/20 sm:flex dark:border-stone-600">
                <Plus className="h-6 w-6" />

                <span className="hidden sm:block">Add Task</span>
              </div>
            </NewTaskButton>

            <NewTaskForm setOpen={setOpen} project={project} />
          </NewTask>

          <div className="relative order-first flex items-center sm:order-none">
            <Search className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-stone-400" />

            <Input
              placeholder="search tasks..."
              value={globalFilter ?? ''}
              onChange={(e) => table.setGlobalFilter(String(e.target.value))}
              className="w-[12rem] rounded-lg border-stone-300 bg-inherit pl-8 sm:h-10 dark:border-stone-600"
            />
          </div>

          <div className="flex flex-row items-center space-x-2">
            <NewTask open={open} setOpen={setOpen}>
              <NewTaskButton>
                <div className="flex h-10 w-auto cursor-pointer items-center space-x-2 rounded-lg border border-stone-300 p-2 hover:bg-black/20 sm:hidden dark:border-stone-600">
                  <Plus className="h-6 w-6" />

                  <span className="hidden sm:block">Add Task</span>
                </div>
              </NewTaskButton>

              <NewTaskForm setOpen={setOpen} project={project} />
            </NewTask>

            <DropdownMenu>
              <DropdownMenuTrigger asChild className="dark:bg-dark2">
                <Button variant="outline" className="ml-auto">
                  Columns
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id
                          .replace('_name', '')
                          .replace('startDate', 'Start Date')
                          .replace('dueDate', 'Due Date')}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="w-fit border-black">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
