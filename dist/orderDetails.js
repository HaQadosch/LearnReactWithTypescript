export class OrderDetail {
    getTotal(discount) {
        const priceWithoutDiscount = this.product.unitPrice * this.quantity;
        const discountAmount = priceWithoutDiscount * discount;
        return priceWithoutDiscount - discountAmount;
    }
}
//# sourceMappingURL=orderDetails.js.map