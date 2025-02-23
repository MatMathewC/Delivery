// Modelo para la tabla OrderItem
class OrderItem {
    constructor(idOrderItem, Products_idProducts, quantity, unit_price, fk_idOrder) {
        this.idOrderItem = idOrderItem;
        this.Products_idProducts = Products_idProducts; // Relación con Products
        this.quantity = quantity;
        this.unit_price = unit_price;
        this.fk_idOrder = fk_idOrder; // Relación con Orden
    }
}

export default OrderItem;