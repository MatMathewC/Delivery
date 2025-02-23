// Modelo para la tabla PaymentMethod
class PaymentMethod {
    constructor(idPaymentMethod, name, description, active, image) {
        this.idPaymentMethod = idPaymentMethod;
        this.name = name;
        this.description = description;
        this.active = active; // 0 o 1
        this.image = image;
    }
}

export default PaymentMethod;