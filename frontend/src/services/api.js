// API de Dirección

// Configuración de la API para la gestión de direcciones

// 1. Definir la URL base de la API
const API_URL = 'http://localhost:8081/api';

// 2. Crear los métodos para interactuar con la API
export const directionsService = {
    async getAllDirections() {
        console.log('Intentando acceder a: ', `${API_URL}/directions`);
        const response = await fetch(`${API_URL}/directions`);

        console.log('Estado de la respuesta', response.status);
        console.log('Headers: ', Object.fromEntries(response.headers));

        if (!response.ok) {
            throw new Error('Error en la petición');
        }
        const data = await response.json();
        console.log('Respuesta obtenida de getAllDirections', data);

        if (!data || !Array.isArray(data.data)) {
            console.error('Estructura de datos incorrecta', data);
            throw new Error('Estructura de datos incorrecta');
        }
        return data;
    },

    async createDirection(data) {
        try {
            console.log('Enviando datos de la dirección:', data);
            const response = await fetch(`${API_URL}/direction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    main_address: data.main_address,
                    secondary_address: data.secondary_address,
                    reference: data.reference,
                    latitude: data.latitude,
                    longitude: data.longitude
                })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear dirección');
            }
    
            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            return responseData;
    
        } catch (error) {
            console.error('Error al crear dirección:', error);
            throw new Error(`Error al crear dirección: ${error.message}`);
        }
    },

    async getDirection(id) {
        try {
            console.log('Obteniendo datos de la dirección:', id);
            const response = await fetch(`${API_URL}/direction/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener dirección');
            }
    
            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            return responseData.data;
    
        } catch (error) {
            console.error('Error al obtener dirección:', error);
            throw new Error(`Error al obtener dirección: ${error.message}`);
        }
    },

    async updateDirection(id, data) {
        try {
            console.log('Actualizando datos de la dirección:', data);
            const response = await fetch(`${API_URL}/direction/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    main_address: data.main_address,
                    secondary_address: data.secondary_address,
                    reference: data.reference,
                    latitude: data.latitude,
                    longitude: data.longitude
                })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar dirección');
            }
    
            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            return responseData;
    
        } catch (error) {
            console.error('Error al actualizar dirección:', error);
            throw new Error(`Error al actualizar dirección: ${error.message}`);
        }
    },

    async deleteDirection(id) {
        try {
            console.log('Eliminando dirección:', id);
            const response = await fetch(`${API_URL}/direction/${id}`, {
                method: 'DELETE',
                headers: {  
                    'Accept': 'application/json'
                }
            });
    
            if (!response.ok) {
                const errorData = await response.json();    
                throw new Error(errorData.message || 'Error al eliminar dirección');  
            }
    
            const responseData = await response.json();
            console.log('Respuesta del servidor:', responseData);
            return responseData;
        } catch (error) {   
            console.error('Error al eliminar dirección:', error);
            throw new Error(`Error al eliminar dirección: ${error.message}`);
        }
    },
};

// FIN API DIRECCION