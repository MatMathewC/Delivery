// Modelo para la tabla Cart
class Cart {
    constructor(idCart, creation_date, active, fk_idUser) {
        this.idCart = idCart;
        this.creation_date = creation_date;
        this.active = active; // 0 o 1
        this.fk_idUser = fk_idUser; // Relación con User
    }
}

export default Cart;