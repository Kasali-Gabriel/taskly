'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CREATE_TASK } from '@/graphql/mutations';
import { toast } from '@/hooks/use-toast';
import { taskSchema } from '@/schema/schemas';
import { Priority, Status } from '@/types/task';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { PlusSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DatePickerField } from '../FormFields/DateFields';
import { FloatingLabelInputField } from '../FormFields/InputFields';

const NewTaskButton = ({
  setShowOptions,
}: {
  setShowOptions: (value: boolean) => void;
}) => {
  const [createTask, { loading }] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      toast({
        title: 'Task Created',
        description: 'Your task was successfully created!',
      });
      setShowOptions(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Error creating task: ${error.message}`,
      });
    },
  });

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      startDate: undefined,
      dueDate: undefined,
      status: '',
      priority: '',
      tags: '',
      points: undefined,
      authorId: '',
      assigneeId: '',
      projectId: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof taskSchema>) => {
    await createTask({ variables: { createTaskInput: values } });
  };

  return (
    <div className="relative flex w-60 items-center justify-end space-x-3 px-2">
      <span className="text-2xl text-white">New Task</span>
      <Dialog onOpenChange={(isOpen) => !isOpen && setShowOptions(false)}>
        <DialogTrigger asChild>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-md hover:bg-gray-300">
            <motion.div
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: -90 }}
              transition={{ duration: 0.15 }}
            >
              <PlusSquare />
            </motion.div>
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>

            <VisuallyHidden>
              <DialogDescription>
                Enter the details for the new task.
              </DialogDescription>
            </VisuallyHidden>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
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

              <div className="grid grid-cols-2 gap-4">
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

              <div className="grid grid-cols-3 gap-1.5 sm:gap-4">
                <Select {...form.register('status')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Status.ToDo}>To do</SelectItem>
                    <SelectItem value={Status.InProgress}>
                      In Progress
                    </SelectItem>
                    <SelectItem value={Status.UnderReview}>
                      Under Review
                    </SelectItem>
                    <SelectItem value={Status.Completed}>Completed</SelectItem>
                  </SelectContent>
                </Select>

                <Select {...form.register('priority')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Priority.Low}>Low</SelectItem>
                    <SelectItem value={Priority.Medium}>Medium</SelectItem>
                    <SelectItem value={Priority.High}>High</SelectItem>
                    <SelectItem value={Priority.Urgent}>Urgent</SelectItem>
                  </SelectContent>
                </Select>

                <FloatingLabelInputField
                  form={form}
                  name="points"
                  type="number"
                  label="Points"
                />
              </div>

              <FloatingLabelInputField form={form} name="tags" label="Tags" />

              <div className="grid grid-cols-2 gap-4">
                <FloatingLabelInputField
                  form={form}
                  name="authorId"
                  label="Author ID"
                />

                <FloatingLabelInputField
                  form={form}
                  name="assigneeId"
                  label="Assignee ID"
                />
              </div>

              <FloatingLabelInputField
                form={form}
                name="projectId"
                label="Project ID"
              />

              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Task'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewTaskButton;
