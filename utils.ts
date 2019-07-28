interface IProduct {
  name: string
  unitPrice: number
}

function calculateTotalPrice (product: IProduct, quantity: number, discount: number): number {
  var priceWithDiscount = product.unitPrice * quantity
  var discountAmount = priceWithDiscount * discount
  return priceWithDiscount - discountAmount
}
