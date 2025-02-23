// Modelo para la tabla Direction
class Direction {
    constructor(idDirection, direction, reference, latitude, longitude) {
        this.idDirection = idDirection;
        this.direction = direction;
        this.reference = reference;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export default Direction;