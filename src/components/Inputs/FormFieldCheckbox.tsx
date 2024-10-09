import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { HTMLProps } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

import { Checkbox } from '../ui/checkbox'

type TFormFieldCheckbox<T extends FieldValues> = {
  control: Control<T>

  label: string
  name: Path<T>
  className?: HTMLProps<HTMLElement>['className']
}

export const FormFieldCheckbox = <T extends FieldValues>({
  control,

  label,
  name,
  className,
}: TFormFieldCheckbox<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className='space-y-1 leading-none'>
            <FormLabel>{label}</FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
