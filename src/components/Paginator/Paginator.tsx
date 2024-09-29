import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type PaginationProps = {
  page?: string | number
  totalPages: number
}

export const Paginator = ({ page, totalPages }: PaginationProps) => {
  const currPage = Number(page)

  const nextPage = currPage === totalPages ? currPage : currPage + 1
  const prevPage = currPage === 1 ? currPage : currPage - 1

  const getPagesToShow = () => {
    let startPage = currPage - 2
    let endPage = currPage + 2

    if (totalPages <= 5) {
      startPage = 1
      endPage = totalPages
    } else if (currPage <= 3) {
      startPage = 1
      endPage = 5
    } else if (currPage >= totalPages - 2) {
      startPage = totalPages - 4
      endPage = totalPages
    } else {
      startPage = currPage - 2
      endPage = currPage + 2
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    )
  }

  const pages = getPagesToShow()

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`?page=${prevPage}`} />
        </PaginationItem>
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink isActive={p === currPage} href={`?page=${p}`}>
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={`?page=${totalPages}`}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={`?page=${nextPage}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
