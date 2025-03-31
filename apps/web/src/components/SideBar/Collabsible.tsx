'use client';

import { CollapsibleSectionProps, SideBarLinkProps } from '@/types';
import { Check, ChevronDown, ChevronUp, FolderPlus, Plus } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSideBarStore } from '@/lib/state';
import clsx from 'clsx';
import { useState } from 'react';
import {
  NewProject,
  NewProjectButton,
  NewProjectForm,
} from '../Project/NewProject';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { SideBarLink } from './SideBarLink';

export const CollapsibleSection = ({
  title,
  isOpen,
  toggleOpen,
  links,
}: CollapsibleSectionProps) => {
  const [open, setOpen] = useState(false);

  const { sortType, setSortType } = useSideBarStore();

  const sortOptions = [
    { key: 'lastModified', label: 'Last Modified' },
    { key: 'alphabetical', label: 'Alphabetical' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'creationTime', label: 'Creation Time' },
  ];

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={toggleOpen}
      className="flex w-full flex-col"
    >
      <div className="flex items-center justify-between pb-1 pl-5 pr-3 pt-3">
        {title === 'Projects' ? (
          <DropdownMenu>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <div className="group flex cursor-pointer items-center space-x-1 rounded-md p-1 font-semibold text-gray-500 hover:bg-gray-200 sm:text-lg 2xl:text-xl dark:text-gray-300 dark:hover:bg-gray-700">
                      {title}
                      <ChevronDown className="mt-1 h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                  <span className="p-2 text-sm">Sort Projects</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenuContent className="mx-2 w-auto px-2">
              <DropdownMenuLabel>Sort Projects</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {sortOptions.map(({ key, label }) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => setSortType && setSortType(key)}
                    className="flex items-center"
                  >
                    <div className="flex w-full items-center">
                      <div
                        className={clsx('w-5 flex-shrink-0', {
                          'opacity-0': sortType !== key,
                        })}
                      >
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="ml-2">{label}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <span className="font-semibold text-gray-500 sm:text-lg 2xl:text-xl dark:text-gray-300">
            {title}
          </span>
        )}

        <div className="flex">
          {title === 'Projects' && (
            <>
              <NewProject open={open} setOpen={setOpen}>
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex cursor-pointer items-center justify-center rounded-md p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
                        <NewProjectButton>
                          <Plus className="h-6 w-6" />
                        </NewProjectButton>
                      </div>
                    </TooltipTrigger>

                    <TooltipContent side="top" align="center">
                      <div className="flex items-center justify-center space-x-2 px-2 py-1 text-sm">
                        <FolderPlus />{' '}
                        <span className="mt-0.5">New Project</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <NewProjectForm setOpen={setOpen} />
              </NewProject>
            </>
          )}

          <CollapsibleTrigger className="flex cursor-pointer items-center justify-center rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700">
            {isOpen ? (
              <ChevronUp className="mt-0.5 h-6 w-6" />
            ) : (
              <ChevronDown className="mt-0.5 h-6 w-6" />
            )}
          </CollapsibleTrigger>
        </div>
      </div>

      <CollapsibleContent>
        {links.map((link: SideBarLinkProps) => (
          <SideBarLink
            key={link.route}
            route={link.route}
            icon={link.icon}
            label={link.label}
            className="py-1 font-light"
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
