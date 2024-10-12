import { HTMLProps, ReactNode } from 'react'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

export type CustomAccordion = {
  title: string
  value: string
  content?: string
  children?: ReactNode
  triggerCn?: HTMLProps<HTMLElement>['className']
  contentCn?: HTMLProps<HTMLElement>['className']
  itemCn?: HTMLProps<HTMLElement>['className']
}

export const CustomAccordionItem = ({
  title,
  value,
  content,
  children,
  triggerCn,
  contentCn,
  itemCn,
}: CustomAccordion) => {
  return (
    <AccordionItem className={itemCn} value={value}>
      <AccordionTrigger className={triggerCn}>{title}</AccordionTrigger>
      <AccordionContent className={contentCn}>
        {content}
        {children}
      </AccordionContent>
    </AccordionItem>
  )
}
