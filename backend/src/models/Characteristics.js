// Modelo para la tabla Characteristics
class Characteristics {
    constructor(idCharacteristics, name, description, Products_idProducts) {
        this.idCharacteristics = idCharacteristics;
        this.name = name;
        this.description = description;
        this.Products_idProducts = Products_idProducts; // Relación con Products
    }
}

export default Characteristics;