function calculateTotalPrice(product, quantity, discount) {
    const priceWithDiscount = product.unitPrice * quantity;
    const discountAmount = priceWithDiscount * discount;
    return priceWithDiscount - discountAmount;
}
//# sourceMappingURL=utils.js.map