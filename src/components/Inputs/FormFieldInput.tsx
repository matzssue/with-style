import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { HTMLInputTypeAttribute, HTMLProps } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

type TFormFieldInput<T extends FieldValues> = {
  control: Control<T>
  placeholder?: string
  label: string
  name: Path<T>
  className?: HTMLProps<HTMLElement>['className']
  type?: HTMLInputTypeAttribute
}

export const FormFieldInput = <T extends FieldValues>({
  control,
  placeholder,
  label,
  name,
  className,
  type = 'text',
}: TFormFieldInput<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              onChange={(e) =>
                field.onChange(
                  type === 'number' ? Number(e.target.value) : e.target.value
                )
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
