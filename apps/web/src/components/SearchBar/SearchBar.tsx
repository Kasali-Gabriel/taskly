'use client';

import { SearchBarProps } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { searchSchema } from '@/schema/schemas';

const useIsNotXL = () => {
  const [isNotXL, setIsNotXL] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsNotXL(window.innerWidth <= 1279);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isNotXL;
};

const SearchBar = ({ placeholder }: SearchBarProps) => {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchInput: '',
    },
  });

  const isNotXL = useIsNotXL();

  const onSubmit = (value: z.infer<typeof searchSchema>) => {
    // console.log(values);
  };

  return (
    <div className="flex h-min">
      {isNotXL && placeholder === 'Search' ? (
        <Sheet>
          <SheetTrigger>
            <Search className="h-6 w-6 hover:scale-[1.15]" />
          </SheetTrigger>
          <SheetContent
            side="top"
            className="flex items-center justify-center rounded-b-2xl py-5"
          >
            <VisuallyHidden>
              <SheetTitle>Search</SheetTitle>
              <SheetDescription>Enter your search query</SheetDescription>
            </VisuallyHidden>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
                <FormField
                  control={form.control}
                  name="searchInput"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Search className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 transform text-stone-400" />
                          <Input
                            placeholder={placeholder}
                            {...field}
                            className="text-dark2 dark:text-light h-14 w-[95vw] rounded-2xl border-gray-400 bg-inherit pl-12 text-xl placeholder:text-stone-400 sm:w-[90vw] dark:border-gray-500"
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
            <FormField
              control={form.control}
              name="searchInput"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-stone-400" />
                      <Input
                        placeholder={placeholder}
                        {...field}
                        className="text-dark2 dark:text-light border-gray-400 bg-inherit pl-8 placeholder:text-stone-400 dark:border-gray-500"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </div>
  );
};

export default SearchBar;
