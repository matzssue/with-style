import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input, InputProps } from '@/components/ui/input'
import { HTMLInputTypeAttribute, HTMLProps } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

type TFormFieldInput<T extends FieldValues> = {
  control: Control<T>
  placeholder?: string
  label: string
  name: Path<T>
  className?: HTMLProps<HTMLElement>['className']
  type?: HTMLInputTypeAttribute
  props?: InputProps
}

export const FormFieldInput = <T extends FieldValues>({
  control,
  placeholder,
  label,
  name,
  className,
  type = 'text',
  props,
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
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
