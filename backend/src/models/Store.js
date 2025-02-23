// Modelo para la tabla Store
class Store {
    constructor(
        idStore,
        name,
        description,
        state,
        time_state,
        registration_date,
        opening_time,
        closing_time,
        fk_idUser,
        fk_idDirection,
        fk_idCategory
    ) {
        this.idStore = idStore;
        this.name = name;
        this.description = description;
        this.state = state; // 'Active' o 'Pending'
        this.time_state = time_state; // 'Open' o 'Closed'
        this.registration_date = registration_date;
        this.opening_time = opening_time;
        this.closing_time = closing_time;
        this.fk_idUser = fk_idUser; // Relación con User
        this.fk_idDirection = fk_idDirection; // Relación con Direction
        this.fk_idCategory = fk_idCategory; // Relación con Category
    }
}

export default Store;