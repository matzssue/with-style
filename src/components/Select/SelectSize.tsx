import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const SelectSize = () => {
  return (
    <Select>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select size' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sizes</SelectLabel>
          <SelectItem value='apple'>XS</SelectItem>
          <SelectItem value='banana'>S</SelectItem>
          <SelectItem value='blueberry'>M</SelectItem>
          <SelectItem value='grapes'>L</SelectItem>
          <SelectItem value='pineapple'>XL</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
