import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { BasketIcon } from '../../../public/icons/BasketIcon';
import { CartItemsCard } from '../Cards/CartItemsCard';
import { cn } from '@/lib/utils';
export const ShoppingBag = () => {
  return (
    <Popover>
      <PopoverTrigger className='hover:scale-105'>
        <BasketIcon />
      </PopoverTrigger>
      <PopoverContent className={cn('w-full  p-0')}>
        <CartItemsCard />
      </PopoverContent>
    </Popover>
  );
};
