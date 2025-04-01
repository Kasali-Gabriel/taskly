'use client';

import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { X } from 'lucide-react';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormField, FormItem } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserContext } from '@/context/UserContext';
import { CREATE_TASK } from '@/graphql/mutations';
import { GET_PROJECTS_FOR_USER } from '@/graphql/queries';
import { toast } from '@/hooks/use-toast';
import { taskSchema } from '@/schema/schemas';
import { Priority, Project, Status } from '@/types/task';

import { DatePickerField } from '../FormFields/DateFields';
import { FloatingLabelInputField } from '../FormFields/InputFields';
import { AssigneeCombobox } from './AssigneeCombobox';
import { TagsField } from './TagsField';

export const NewTask = ({
  children,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => (
  <Dialog open={open} onOpenChange={setOpen} modal={false}>
    {children}
  </Dialog>
);

export const NewTaskButton = ({ children }: { children: React.ReactNode }) => (
  <DialogTrigger asChild>{children}</DialogTrigger>
);

export const NewTaskForm = ({
  project,
  setOpen,
  status,
}: {
  project?: Project;
  setOpen: (open: boolean) => void;
  status?: string;
}) => {
  const { user } = useContext(UserContext);
  const userId = user?.id;

  const [selectedProjectId, setSelectedProjectId] = useState(project?.id || '');
  const [tags, setTags] = useState<string[]>([]);

  const { data: projectsData } = useQuery(GET_PROJECTS_FOR_USER, {
    variables: { userId },
  });

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      startDate: undefined,
      dueDate: undefined,
      status: status || '',
      priority: '',
      tags: [],
      authorId: userId,
      assigneeId: project ? undefined : userId,
      projectId: project ? project.id : undefined,
    },
  });

  // FIXME : assigneeId always userId instead of undefined when no assignee is selected

  const [createTask, { loading }] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      setOpen(false);
      form.reset();
      setTags([]);
      toast({ description: 'Task created successfully' });
    },
  });

  const client = useApolloClient();

  const handleSubmit = async (values: z.infer<typeof taskSchema>) => {
    await createTask({
      variables: {
        createTaskInput: {
          ...values,
          authorId: userId,
          status: values.status || status || Status.ToDo,
          assigneeId: values.assigneeId ?? (project ? undefined : userId),
          projectId: project?.id ?? values.projectId,
        },
      },
    });
    await client.refetchQueries({ include: 'active' });
  };

  const statusOptions = Object.values(Status).map((status) => ({
    key: status,
    label: status.replace(/([A-Z])/g, ' $1').trim(),
  }));

  const priorityOptions = Object.values(Priority).map((priority) => ({
    key: priority,
    label: priority,
  }));

  const selectedProject = projectsData?.getProjectsForUser?.find(
    (proj: Project) => proj.id === selectedProjectId,
  );

  return (
    <DialogContent
      onEscapeKeyDown={(e) => e.preventDefault()}
      onInteractOutside={(e) => e.preventDefault()}
      onPointerDownOutside={(e) => e.preventDefault()}
      className="max-h-[90vh] overflow-y-auto"
    >
      <div className="flex items-center justify-between">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <VisuallyHidden>
            <DialogDescription>
              Enter the details for the new task.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <DialogClose tabIndex={-1}>
          <X
            className="rounded-md bg-red-600 p-1 text-white hover:bg-red-500"
            size={32}
            strokeWidth={2}
          />
        </DialogClose>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-2 space-y-4"
        >
          <FloatingLabelInputField
            form={form}
            name="title"
            label="Title"
            placeholder="Title"
          />
          <FloatingLabelInputField
            form={form}
            name="description"
            label="Description"
            fieldType="textarea"
          />

          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <DatePickerField
              form={form}
              name="startDate"
              placeholder="Start date"
            />
            <DatePickerField
              form={form}
              name="dueDate"
              placeholder="Due date"
            />
          </div>

          <Controller
            name="tags"
            control={form.control}
            render={({ field }) => (
              <TagsField
                tags={tags}
                setTags={(newTags) => {
                  setTags(newTags);
                  field.onChange(newTags);
                }}
              />
            )}
          />

          <div
            className={`flex w-full ${!project ? 'flex-col space-y-4' : 'flex-row items-center space-x-2 sm:space-x-4'}`}
          >
            <div className="flex w-full space-x-2 sm:space-x-4">
              {!status && (
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option.key} value={option.key}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityOptions.map((option) => (
                          <SelectItem key={option.key} value={option.key}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex min-w-[25%] space-x-2 sm:space-x-4">
              {!project && (
                <FormField
                  control={form.control}
                  name="projectId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedProjectId(value);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Add to project" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectsData?.getProjectsForUser?.map(
                            (proj: Project) => (
                              <SelectItem key={proj.id} value={proj.id}>
                                {proj.name}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              )}

              {(project || selectedProject) && (
                <FormField
                  control={form.control}
                  name="assigneeId"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <AssigneeCombobox
                        members={
                          (selectedProject || project)?.projectMembers || []
                        }
                        form={form}
                        field={field}
                      />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading} className="mt-5">
              {loading ? 'Creating...' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
