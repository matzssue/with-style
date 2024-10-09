import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

export const CustomAccordionItem = ({
  title,
  value,
  content,
}: {
  title: string
  value: string
  content: string
}) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>{content}</AccordionContent>
    </AccordionItem>
  )
}
