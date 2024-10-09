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
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '../Select/Multiselect'

type TFormFieldMultiSelect<T extends FieldValues> = {
  control: Control<T>
  placeholder?: string
  label: string
  name: Path<T>
  className?: HTMLProps<HTMLElement>['className']

  list: string[] | number[]
}

export const FormFieldMultiSelect = <T extends FieldValues>({
  control,
  placeholder,
  label,
  name,
  className,
  list,
}: TFormFieldMultiSelect<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <MultiSelector
              values={field.value ?? []}
              onValuesChange={field.onChange}
              className={className}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder={placeholder} />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {list.map((item) => (
                    <MultiSelectorItem key={item} value={item.toString()}>
                      <span>{item.toString()}</span>
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
