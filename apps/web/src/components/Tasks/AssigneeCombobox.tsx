import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ProjectMember } from '@/types/task';
import { Plus, User, X } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface AssigneeComboboxProps {
  members: ProjectMember[];
  form: any;
  field: any;
}

export const AssigneeCombobox = ({
  members,
  form,
  field,
}: AssigneeComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const selectedMember = members.find((member) => member.user.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button>
          {selectedMember ? (
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={selectedMember.user.profilePicture} />
              <AvatarFallback className="bg-blue-400">
                <User />
              </AvatarFallback>
            </Avatar>
          ) : (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-neutral-300 dark:bg-stone-500">
                      <User />
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>Assign this task</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="flex w-auto flex-col p-0 sm:w-[30rem]"
        side={window.innerWidth < 640 ? 'top' : 'right'}
        align="start"
      >
        <Command>
          <CommandInput placeholder="Name or Email" className="h-9" />
          <CommandList>
            <CommandGroup>
              {members.map((member: ProjectMember, index: number) => (
                <CommandItem
                  key={index}
                  value={member.user.id}
                  onSelect={() => {
                    setValue(member.user.id);
                    form.setValue(field.name, member.user.id);
                    setOpen(false);
                  }}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={member.user.profilePicture} />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                  <span>{member.user.name}</span>
                  <span className="text-xs text-gray-300">
                    {member.user.email}
                  </span>

                  {value === member.user.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        form.setValue(field.name, '');
                        setValue('');
                      }}
                      className="ml-auto hover:scale-110 hover:text-red-500"
                    >
                      <X className="opacity-100" />
                    </button>
                  )}
                </CommandItem>
              ))}

              <CommandItem>
                <button className="flex w-full items-center justify-start p-2 text-base text-blue-400">
                  <Plus className="-mt-0.5 mr-3" />
                  <span>Invite teammates via email</span>
                </button>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
