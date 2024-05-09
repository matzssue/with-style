import Image from 'next/image';
import shoes from '../../../public/shoes1.jpg';
export default function ProductCard() {
  return (
    <div>
      <div className='relative'>
        <Image src={shoes} alt='shoes' className='relative' />
        <span className='absolute bottom-1 left-1 bg-slate-200 px-2 py-1 font-semibold'>
          NEW
        </span>
      </div>

      <p className='font-semibold'>Addidas</p>
      <p>
        Price: <span className='font-semibold'> 136$</span>
      </p>
    </div>
  );
}
