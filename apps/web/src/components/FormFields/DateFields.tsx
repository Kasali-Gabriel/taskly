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

export const DatePickerField = ({
  form,
  name,
  label,
  placeholder = 'Select a date',
}: DatePickerFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className="flex w-full flex-col overflow-x-hidden">
        <FormLabel>{label}</FormLabel>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !field.value && 'text-muted-foreground',
              )}
            >
              <CalendarIcon />

              {field.value ? (
                format(field.value, 'PPP')
              ) : (
                <span>{placeholder}</span>
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="flex w-auto flex-col space-y-2 p-2" sideOffset={-10}>
            <Select
              onValueChange={(value) =>
                field.onChange(addDays(new Date(), parseInt(value)))
              }
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
                onSelect={(date) => field.onChange(date || undefined)}
              />
            </div>
          </PopoverContent>
        </Popover>

        <FormMessage />
      </FormItem>
    )}
  />
);

export const DateRangePickerField = ({
  form,
  name,
  label,
  sideOffset,
}: DateRangePickerFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field, fieldState }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Popover>
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
                  <span>Pick a date range</span>
                )}
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0"
            align="start"
            side="top"
            sideOffset={sideOffset}
          >
            <Calendar
              mode="range"
              selected={field.value as { from: Date; to?: Date }}
              onSelect={field.onChange}
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
