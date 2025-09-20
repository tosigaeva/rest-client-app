'use client';

import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';

import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

type FloatingInputProps<T extends FieldValues> = {
  control: Control<T>;
  error?: FieldError;
  label: string;
  name: Path<T>;
  type?: string;
};

export function FloatingInput<T extends FieldValues>({
  control,
  error,
  label,
  name,
  type = 'text',
}: FloatingInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative mb-3 text-base">
          <FormControl>
            <input
              {...field}
              className={cn(
                'peer w-full rounded-sm border bg-white px-3.5 pt-5 pb-2 outline-none focus:border-black',
                {
                  'border-gray-300': !error,
                  'border-red-500 focus:border-red-500': error,
                },
              )}
              placeholder=""
              type={type}
            />
          </FormControl>
          <FormLabel
            className={cn(
              'absolute top-3 left-3.5 bg-white px-1 text-xs text-gray-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-black',
              {
                '-top-2': field.value,
                'peer-focus:text-red-500': error,
                'text-red-500': field.value && error,
              },
            )}
          >
            {label}
          </FormLabel>
          {error && (
            <FormMessage className="absolute top-0 right-0 rounded-tr-sm bg-red-500 px-1 text-[10px] text-white">
              {error.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
