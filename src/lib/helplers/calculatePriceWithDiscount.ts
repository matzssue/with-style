export const calculatePriceWithDiscount = (
  price: number,
  discount?: number | null
) => {
  if (!discount) return null
  const calculatedPrice = price * (1 - discount / 100)
  return Math.round(calculatedPrice * 100) / 100
}
