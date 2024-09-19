import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getStatistics } from '@/data/admin/statistics'

import { cn } from '@/lib/utils'

export const Statistics = async () => {
  const statistics = await getStatistics()

  return (
    <Card
      className={cn(
        'flex w-full max-w-[700px] flex-col items-center gap-2 border-none bg-secondary p-5 text-primary'
      )}
    >
      <CardHeader>
        <p className='text-5xl font-bold '>Admin Page</p>
      </CardHeader>

      <CardContent className='rounded-md bg-neutral-100 bg-opacity-45 shadow-md'>
        <div className='flex w-full flex-col gap-2 rounded-sm px-6 py-4 '>
          <p className='p-4 text-4xl font-semibold '>Statistics</p>
          <ul>
            {statistics.map(({ quantity, title }) => (
              <li key={title} className='text-xl'>
                {title}: <b>{quantity}</b>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
