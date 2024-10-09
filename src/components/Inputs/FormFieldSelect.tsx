import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { HTMLProps } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type TFormFieldSelect<T extends FieldValues> = {
  control: Control<T>
  placeholder?: string
  label: string
  name: Path<T>
  className?: HTMLProps<HTMLElement>['className']
  selectItems: string[]
}

export const FormFieldSelect = <T extends FieldValues>({
  control,
  placeholder,
  label,
  name,
  className,
  selectItems,
}: TFormFieldSelect<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {selectItems.map((item: string) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
