export const sizes = ['S', 'M', 'L', 'XL', '2XL']
export const shoesSize = [
  32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
]
export const shoeSizeToString = shoesSize.map((size) => size.toString())

export const sizeType = {
  MAN: ['S', 'M', 'L', 'XL', '2XL'],
  WOMAN: ['S', 'M', 'L', 'XL', '2XL'],
  ACCESSIORES: [],
  SHOES: shoeSizeToString,
}
