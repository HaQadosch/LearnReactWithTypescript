
interface DiscountCode {
  code: string
  percentage: number
}

interface ProductWithDiscountCode extends Product {
  discountCodes: DiscountCode[]
}

type getTotal = (discount?: number) => number

interface OrderDetail {
  product: Product
  quantity: number
  dateAdded?: Date
  getTotal: getTotal
}

const table: ProductWithDiscountCode = {
  name: "Table",
  unitPrice: 500,
  discountCodes: [
    { code: "SUMMER10", percentage: 0.1 },
    { code: "BFRI",     percentage: 0.2 }
  ]
}

const tableOrder: OrderDetail = {
  product: table,
  quantity: 1,
  getTotal(discount = 0) {
    const priceWithoutDiscount = this.product.unitPrice * this.quantity
    const discountAmount = priceWithoutDiscount * discount
    return priceWithoutDiscount - discountAmount
  }
}

tableOrder.getTotal() //?

