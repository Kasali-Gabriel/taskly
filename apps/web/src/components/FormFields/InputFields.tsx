import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { InputFieldProps } from '@/types';
import * as React from 'react';
import { Textarea } from '../ui/textarea';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fieldType?: string;
}
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
type CombinedProps = InputProps | TextareaProps;

const FloatingInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  CombinedProps & { type?: string; fieldType?: string; field?: any }
>(
  (
    { className, fieldType = 'text', type = 'text', field, ...props },
    inputRef,
  ) => {
    const commonProps = {
      placeholder: ' ',
      className: cn('peer', className),
      ref: inputRef,
      ...field,
      ...props,
    };

    return fieldType === 'textarea' ? (
      <Textarea
        {...(commonProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    ) : (
      <Input
        {...(commonProps as React.InputHTMLAttributes<HTMLInputElement>)}
        type={type}
        value={props.value ?? ''}
      />
    );
  },
);
FloatingInput.displayName = 'FloatingInput';

const FloatingLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & { fieldType?: string }
>(({ className, fieldType, ...props }, labelRef) => (
  <Label
    className={cn(
      'peer-focus:secondary peer-focus:dark:secondary bg-background dark:bg-background absolute start-2 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform cursor-text px-2 text-base text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2 sm:text-xl sm:peer-focus:top-1.5 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4',
      fieldType === 'textarea' ? 'peer-placeholder-shown:top-5' : '',
      className,
    )}
    ref={labelRef}
    {...props}
  />
));
FloatingLabel.displayName = 'FloatingLabel';

export const FloatingLabelInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps & { label?: string; type?: string; fieldType?: string }
>(
  (
    { id, label, className, type = 'text', fieldType = 'text', ...props },
    ref,
  ) => (
    <div className="relative">
      <FloatingInput
        ref={ref}
        id={id}
        type={type}
        fieldType={fieldType}
        {...props}
      />
      <FloatingLabel htmlFor={id} fieldType={fieldType}>
        {label}
      </FloatingLabel>
    </div>
  ),
);
FloatingLabelInput.displayName = 'FloatingLabelInput';

export const InputField = ({
  form,
  name,
  label,
  placeholder,
  type = 'text',
}: InputFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          {type === 'textarea' ? (
            <Textarea
              {...field}
              placeholder={placeholder}
              className="resize-none"
            />
          ) : (
            <Input
              {...field}
              placeholder={placeholder}
              type={type}
              value={field.value ?? ''}
            />
          )}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const FloatingLabelInputField = ({
  form,
  name,
  label,
  type = 'text',
  fieldType = 'text',
}: InputFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <FloatingLabelInput
            {...field}
            fieldType={fieldType}
            type={type}
            label={label}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
