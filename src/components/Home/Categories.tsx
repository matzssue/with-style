'use client';

import CategorySectionImage from '../../../public/category-section-image.jpg';

import {
  accessoriesNavLinks,
  clothingNavLinks,
  shoesNavLinks,
} from '../../constants/navlist';

import { Fade } from 'react-awesome-reveal';
import Image from 'next/image';
import Link from 'next/link';
import { CategoryCard } from './CatergoryCard';
export const Categories = () => {
  return (
    <Fade className='w-full'>
      <section className='m-0 flex  w-full flex-col items-center justify-center overflow-hidden p-0 '>
        <h2 className='my-5 w-full bg-secondary py-5 text-center text-4xl'>
          Select category
        </h2>

        <div className='flex justify-center gap-x-10 gap-y-5'>
          <div className="max-w-[450px] bg-[url('/woman-category-image.jpg')] bg-cover bg-center 2xl:min-h-[800px]">
            <CategoryCard categoryTitle='For woman' links={clothingNavLinks} />
          </div>
          <div className="max-w-[450px] bg-[url('/clothing.jpg')] bg-cover bg-center 2xl:min-h-[800px] ">
            <CategoryCard categoryTitle='For man' links={clothingNavLinks} />
          </div>
          <div className='flex flex-col gap-y-5'>
            <div className="max-w-[450px] bg-[url('/shoes.jpg')] bg-cover bg-center  2xl:min-h-[400px] ">
              <CategoryCard categoryTitle='Shoes' links={shoesNavLinks} />
            </div>
            <div className="max-w-[450px] bg-[url('/accessories.jpg')] bg-cover bg-center 2xl:min-h-[400px]">
              <CategoryCard
                categoryTitle='Accessories'
                links={accessoriesNavLinks}
              />
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
};
