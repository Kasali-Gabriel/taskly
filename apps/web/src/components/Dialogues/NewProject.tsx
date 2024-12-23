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
import { CREATE_PROJECT } from '@/graphql/mutations';
import { toast } from '@/hooks/use-toast';
import { projectSchema } from '@/schema/schemas';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { FolderDot } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DateRangePickerField } from '../FormFields/DateFields';
import { InputField } from '../FormFields/InputFields';

const NewProjectButton = ({
  setShowOptions,
}: {
  setShowOptions: (value: boolean) => void;
}) => {
  const [createProject, { loading }] = useMutation(CREATE_PROJECT, {
    onCompleted: () => {
      toast({
        title: 'Project Created',
        description: 'Your project was successfully created!',
      });
      setShowOptions(false);
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Error creating project: ${error.message}`,
      });
    },
  });

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: '',
      dateRange: { from: undefined, to: undefined },
      projectDescription: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof projectSchema>) => {
    await createProject({
      variables: {
        createProjectInput: {
          name: values.projectName,
          startDate: values.dateRange.from,
          endDate: values.dateRange.to,
          description: values.projectDescription,
        },
      },
    });
  };

  const [sideOffset, setSideOffset] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setSideOffset(window.innerWidth < 640 ? -200 : 0);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative flex w-60 items-center justify-end space-x-3 px-2">
      <span className="text-2xl text-white">New Project</span>
      <Dialog onOpenChange={(isOpen) => !isOpen && setShowOptions(false)}>
        <DialogTrigger asChild>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-md hover:bg-gray-300">
            <motion.div
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: -90 }}
              transition={{ duration: 0.15 }}
            >
              <FolderDot />
            </motion.div>
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>

            <VisuallyHidden>
              <DialogDescription>
                Enter the details for the new project.
              </DialogDescription>
            </VisuallyHidden>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="relative space-y-8"
            >
              <InputField
                form={form}
                name="projectName"
                label="Project Name"
                placeholder="Enter project name"
              />

              <InputField
                form={form}
                name="projectDescription"
                label="Project Description"
                type="textarea"
                placeholder="Enter project description"
              />

              <DateRangePickerField
                form={form}
                name="dateRange"
                label="Project Duration"
                sideOffset={sideOffset}
              />

              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Project'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewProjectButton;
