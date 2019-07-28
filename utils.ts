interface IProduct {
  name: string
  unitPrice: number
}

function calculateTotalPrice(product: IProduct, quantity: number, discount: number): number {
  const priceWithDiscount = product.unitPrice * quantity
  const discountAmount = priceWithDiscount * discount
  return priceWithDiscount - discountAmount
}
