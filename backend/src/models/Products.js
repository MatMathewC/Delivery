// Modelo para la tabla Products
class Products {
    constructor(
        idProducts,
        product_code,
        name,
        description,
        price,
        attributes,
        availability,
        registration_date,
        is_variant,
        main_product,
        fk_idCategory,
        fk_idStore
    ) {
        this.idProducts = idProducts;
        this.product_code = product_code;
        this.name = name;
        this.description = description;
        this.price = price;
        this.attributes = attributes; // 'New', 'Recommended', 'Popular', 'None'
        this.availability = availability; // 0 o 1
        this.registration_date = registration_date;
        this.is_variant = is_variant; // 0 o 1
        this.main_product = main_product; // ID del producto principal si es una variante
        this.fk_idCategory = fk_idCategory; // Relación con Category
        this.fk_idStore = fk_idStore; // Relación con Store
    }
}

export default Products;