// Modelo para la tabla Category
class Category {
    constructor(idCategory, name, global, fk_idCategory, fk_idUser) {
        this.idCategory = idCategory;
        this.name = name;
        this.global = global; // 0 o 1
        this.fk_idCategory = fk_idCategory; // Relación jerárquica con Category
        this.fk_idUser = fk_idUser; // Relación con User
    }
}

export default Category;