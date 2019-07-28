const threeSquared: number = 3 ** 2
console.log(threeSquared)

enum OrderStatus {
  Paid = 1,
  Shipped,
  Completed,
  Cancelled
}

let statis = OrderStatus.Shipped //?

const customer = {
  name: "Lamps Ltd",
  turnover: 200134,
  active: true
}

customer.turnover = 5000

const numbers = [1, 3, 5]

numbers.forEach(nbr => console.log(nbr))
