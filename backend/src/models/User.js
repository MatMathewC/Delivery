// Modelo para la tabla User
class User {
    constructor(idUser, username, phone, user_role, register_date, fk_idDirection) {
        this.idUser = idUser;
        this.username = username;
        this.phone = phone;
        this.user_role = user_role; // Puede ser 'Admin', 'Client', 'Delivery_man', 'Manager'
        this.register_date = register_date;
        this.fk_idDirection = fk_idDirection; // Relación con Direction
    }
}

export default User;