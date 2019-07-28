const table = {
    name: "Table",
    unitPrice: 500,
    discountCodes: [
        { code: "SUMMER10", percentage: 0.1 },
        { code: "BFRI", percentage: 0.2 }
    ]
};
const tableOrder = {
    product: table,
    quantity: 1,
    getTotal(discount = 0) {
        const priceWithoutDiscount = this.product.unitPrice * this.quantity;
        const discountAmount = priceWithoutDiscount * discount;
        return priceWithoutDiscount - discountAmount;
    }
};
tableOrder.getTotal(); //?
//# sourceMappingURL=interface.js.map