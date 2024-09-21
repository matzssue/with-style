export const calculatePriceWithDiscount = (price: number, discount: number) => {
  const calculatedPrice = price * (1 - discount / 100)
  return Math.round(calculatedPrice * 100) / 100
}
