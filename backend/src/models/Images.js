// Modelo para la tabla Images
class Images {
    constructor(idImages, name, description, Products_idProducts, Store_idStore) {
        this.idImages = idImages;
        this.name = name;
        this.description = description;
        this.Products_idProducts = Products_idProducts; // Relación con Products
        this.Store_idStore = Store_idStore; // Relación con Store
    }
}

export default Images;