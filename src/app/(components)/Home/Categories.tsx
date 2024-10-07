'use client'

import { Fade } from 'react-awesome-reveal'

import { CategoryCard } from './CatergoryCard'
import { categoryCardsList } from '@/constants/categories'
export const Categories = () => {
  return (
    <Fade className='w-full'>
      <section className='m-0 flex w-full  flex-col items-center justify-center overflow-hidden p-0  '>
        <h2 className='my-5 w-full bg-secondary py-5 text-center text-4xl'>
          Select category
        </h2>
        <div className='flex w-5/6 justify-between gap-x-10 gap-y-5 bg-neutral-50 max-lg:flex-col max-lg:items-center max-lg:justify-center'>
          {categoryCardsList
            .slice(0, 2)
            .map(({ bgImage, category, links, title }) => (
              <div
                key={title}
                className={`max-w-[450px] bg-cover bg-center 2xl:min-h-[800px]`}
                style={{ backgroundImage: `url('${bgImage}')` }}
              >
                <CategoryCard
                  categoryTitle={title}
                  category={category}
                  links={links}
                />
              </div>
            ))}
          <div className='flex flex-col gap-y-5'>
            {categoryCardsList
              .slice(2, 4)
              .map(({ bgImage, category, links, title }) => (
                <div
                  key={title}
                  className={`max-w-[450px] bg-cover bg-center 2xl:min-h-[400px]`}
                  style={{ backgroundImage: `url('${bgImage}')` }}
                >
                  <CategoryCard
                    categoryTitle={title}
                    category={category}
                    links={links}
                  />
                </div>
              ))}
          </div>
        </div>
      </section>
    </Fade>
  )
}
