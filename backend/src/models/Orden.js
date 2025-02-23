// Modelo para la tabla Orden
class Orden {
    constructor(
        idOrder,
        order_code,
        total,
        state,
        order_start_date,
        order_accepted_date,
        order_delivery_date,
        optional_instruction,
        fk_idDeliveryBoy,
        fk_idPaymentMethod,
        fk_idCart
    ) {
        this.idOrder = idOrder;
        this.order_code = order_code;
        this.total = total;
        this.state = state; // 'Pending', 'Accepted', 'On_Route', 'Delivered', 'Cancelled'
        this.order_start_date = order_start_date;
        this.order_accepted_date = order_accepted_date;
        this.order_delivery_date = order_delivery_date;
        this.optional_instruction = optional_instruction;
        this.fk_idDeliveryBoy = fk_idDeliveryBoy; // Relación con User
        this.fk_idPaymentMethod = fk_idPaymentMethod; // Relación con PaymentMethod
        this.fk_idCart = fk_idCart; // Relación con Cart
    }
}

export default Orden;