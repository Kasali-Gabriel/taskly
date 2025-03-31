'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { DatePickerFieldProps, DateRangePickerFieldProps } from '@/types';
import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

export const DatePickerField = ({
  form,
  name,
  label,
  placeholder = 'Select a date',
}: DatePickerFieldProps) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex w-full flex-col overflow-x-hidden">
          <FormLabel>{label}</FormLabel>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full items-center justify-start text-left font-normal',
                  !field.value && 'text-muted-foreground',
                )}
              >
                <CalendarIcon />
                {field.value ? (
                  format(field.value, 'PPP')
                ) : (
                  <span className="mt-1">{placeholder}</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              side={window.innerWidth < 640 ? 'top' : 'right'}
              align="start"
              className="flex w-auto flex-col space-y-2 p-2"
              sideOffset={window.innerWidth < 640 ? -100 : 0}
            >
              <Select
                onValueChange={(value) => {
                  field.onChange(addDays(new Date(), parseInt(value)));
                  setOpen(false);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>

                <SelectContent position="popper">
                  <SelectItem value="0">Today</SelectItem>
                  <SelectItem value="1">Tomorrow</SelectItem>
                  <SelectItem value="3">In 3 days</SelectItem>
                  <SelectItem value="7">In a week</SelectItem>
                </SelectContent>
              </Select>

              <div className="rounded-md border">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date || undefined);
                    if (date) {
                      setOpen(false);
                    }
                  }}
                />
              </div>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const DateRangePickerField = ({
  form,
  name,
  label,
  sideOffset,
}: DateRangePickerFieldProps) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !field.value && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value?.from ? (
                    field.value.to ? (
                      <>
                        {format(field.value.from, 'LLL dd, y')} -{' '}
                        {format(field.value.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(field.value.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Select project duration</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="z-50 w-auto p-0"
              align="start"
              side="top"
              sideOffset={sideOffset}
            >
              <Calendar
                mode="range"
                selected={field.value as { from: Date; to?: Date }}
                onSelect={(range) => {
                  field.onChange(range);
                  if (range?.from && range?.to) {
                    setOpen(false);
                  }
                }}
                defaultMonth={field.value?.from}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};
