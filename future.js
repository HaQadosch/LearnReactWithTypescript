var threeSquared = Math.pow(3, 2);
console.log(threeSquared);
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Paid"] = 1] = "Paid";
    OrderStatus[OrderStatus["Shipped"] = 2] = "Shipped";
    OrderStatus[OrderStatus["Completed"] = 3] = "Completed";
    OrderStatus[OrderStatus["Cancelled"] = 4] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
var statis = OrderStatus.Shipped; //?
var customer = {
    name: "Lamps Ltd",
    turnover: 200134,
    active: true
};
customer.turnover = 5000;
var numbers = [1, 3, 5];
numbers.forEach(function (nbr) { return console.log(nbr); });
var table = {
    name: "Table",
    unitPrice: 500
};
var tableOrder = {
    product: table,
    quantity: 1,
    getTotal: function (discount) {
        var priceWithoutDiscount = this.product.unitPrice * this.quantity;
        var discountAmount = priceWithoutDiscount * discount;
        return priceWithoutDiscount - discountAmount;
    }
};
