const threeSquared = 3 ** 2;
console.log(threeSquared);
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Paid"] = 1] = "Paid";
    OrderStatus[OrderStatus["Shipped"] = 2] = "Shipped";
    OrderStatus[OrderStatus["Completed"] = 3] = "Completed";
    OrderStatus[OrderStatus["Cancelled"] = 4] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
let statis = OrderStatus.Shipped; //?
const customer = {
    name: "Lamps Ltd",
    turnover: 200134,
    active: true
};
customer.turnover = 5000;
const numbers = [1, 3, 5];
numbers.forEach(nbr => console.log(nbr));
//# sourceMappingURL=future.js.map