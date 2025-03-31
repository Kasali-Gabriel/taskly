'use client';

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
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { UserContext } from '@/context/UserContext';
import { CREATE_PROJECT } from '@/graphql/mutations';
import { GET_TEAMS_FOR_USER } from '@/graphql/queries';
import { projectSchema } from '@/schema/schemas';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DateRangePickerField } from '../FormFields/DateFields';
import { InputField } from '../FormFields/InputFields';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const NewProject = ({
  children,
  open,
  setOpen,
}: {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      {children}
    </Dialog>
  );
};

export const NewProjectButton = ({ children }: { children: ReactNode }) => {
  return <DialogTrigger asChild>{children}</DialogTrigger>;
};

export const NewProjectForm = ({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) => {
  const { user } = useContext(UserContext);
  const userId = user?.id;

  const router = useRouter();
  const client = useApolloClient();

  const [createProject, { loading }] = useMutation(CREATE_PROJECT, {
    onCompleted: (data) => {
      setOpen(false);
      form.reset();
      router.push(`/projects/${data.createProject.id}`);
    },
  });

  const { data: teamData } = useQuery(GET_TEAMS_FOR_USER, {
    variables: { userId },
  });

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: '',
      dateRange: { from: undefined, to: undefined },
      projectDescription: '',
      teamId: '',
      projectOwnerId: userId,
    },
  });

  useEffect(() => {
    if (teamData?.getTeamsForUser.length === 1) {
      form.setValue('teamId', teamData.getTeamsForUser[0].id);
    }
  }, [teamData, form.formState.isSubmitted]);

  const handleSubmit = async (values: z.infer<typeof projectSchema>) => {
    await createProject({
      variables: {
        createProjectInput: {
          name: values.projectName,
          startDate: values.dateRange.from,
          endDate: values.dateRange.to,
          description: values.projectDescription,
          projectOwnerId: userId,
          teamId: values.teamId,
        },
      },
    });

    await client.refetchQueries({
      include: 'active',
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
    <DialogContent
      onPointerDownOutside={(e) => e.preventDefault()}
      onEscapeKeyDown={(e) => e.preventDefault()}
      onInteractOutside={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>

          <VisuallyHidden>
            <DialogDescription>
              Enter the details for the new project.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>

        <DialogClose tabIndex={-1}>
          <X
            strokeWidth={2}
            size={32}
            className="rounded-md bg-red-600 p-1 text-white hover:bg-red-500"
          />
        </DialogClose>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="relative mt-2 space-y-4"
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
            placeholder="What's this project about?"
          />

          <DateRangePickerField
            form={form}
            name="dateRange"
            label="Project Duration"
            sideOffset={sideOffset}
          />

          <FormField
            control={form.control}
            name="teamId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamData?.getTeamsForUser.map((team: any) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button type="submit" disabled={loading} className="mt-5">
              {loading ? 'Creating...' : 'Create Project'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
