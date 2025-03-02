import './ListAddress.css';
import { directionsService } from '../../services/api.js';

let directionListInstance = null;

export default class ListDirections {
    constructor() {
        if (directionListInstance) {
            return directionListInstance;
        }
        this.directions = [];
        this.handleRowClick = this.handleRowClick.bind(this);
        directionListInstance = this;
    }

    async render() {
        const container = document.createElement('section');
        container.className = 'directions-section';
        container.innerHTML = `
            <h2>Direcciones Registradas</h2>
            <div class="actions-container">
                <button class="btn btn-primary btn-add" onclick="window.location.href='/add-address'"> 
                    <i class="fas fa-plus"></i> Agregar Dirección
                </button>
            </div>
            <div class="directions-container">
                <table class="directions-table">
                    <thead>
                        <tr>
                            <th>Dirección Principal</th>
                            <th>Dirección Secundaria</th>
                            <th>Referencia</th>
                            <th>Latitud</th>
                            <th>Longitud</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="directions-table-body">
                        <tr>
                            <td colspan="6">Cargando...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

        await this.loadDirections(container);
        const tbody = container.querySelector('#directions-table-body');
        tbody.addEventListener('click', (event) => this.handleRowClick(event));
        
        container.addEventListener('click', (event) => {
            const deleteButton = event.target.closest('.btn-delete');
            if (deleteButton) {
                this.handleDelete(event);
            }
        });

        console.log('Container generado:', container.innerHTML);
        return container;
    }

    handleRowClick(event) {
        const tr = event.target.closest('tr');
        if (!tr) return;
        
        const directionIndex = tr.dataset.index;
        if (directionIndex !== undefined) {
            const direction = this.directions[directionIndex];
            console.log('Dirección seleccionada:', direction);
        }
    }

    async loadDirections(container) {
        const tbody = container.querySelector('#directions-table-body');
        try {
            console.log('Iniciando carga de direcciones...');
            tbody.innerHTML = `
                <tr>
                    <td colspan="6">Cargando direcciones...</td>
                </tr>
            `;
            
            const response = await directionsService.getAllDirections();
            console.log('Respuesta completa del servidor:', response);
            
            if (!response || !response.data) {
                throw new Error('La respuesta del servidor no tiene el formato esperado');
            }
            
            this.directions = response.data;
            console.log('Direcciones cargadas:', this.directions);
            
            if (this.directions.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="6">No hay direcciones registradas</td>
                    </tr>
                `;
                return;
            }
            
            tbody.innerHTML = this.directions.map((direction, index) => {
                console.log('Procesando dirección:', direction);
                return `
                    <tr data-index="${index}">
                        <td>${direction.main_address || ''}</td>
                        <td>${direction.secondary_address || ''}</td>
                        <td>${direction.reference || ''}</td>
                        <td>${direction.latitude || 'N/A'}</td>
                        <td>${direction.longitude || 'N/A'}</td>
                        <td>
                            <button class="btn-edit" onclick="window.location.href='/add-address?id=${direction.idDirection}'">
                                Editar
                            </button>
                            <button class="btn btn-danger btn-delete" data-direction-id="${direction.idDirection}">
                                <i class="fas fa-trash"></i> Eliminar
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
            
            console.log('Tabla actualizada con éxito');
            
        } catch (error) {
            console.error('Error detallado al cargar direcciones:', error);
            tbody.innerHTML = `
                <tr>
                    <td colspan="6">
                        Error al cargar los datos: ${error.message}
                        <br>
                        <small>Por favor, verifica la conexión con el servidor</small>
                    </td>
                </tr>
            `;
        }
    }

    async handleDelete(event) {
        const deleteButton = event.target.closest('.btn-delete');
        if (!deleteButton) return;

        const directionId = deleteButton.dataset.directionId;
        if (!directionId) return;

        if (confirm('¿Está seguro de eliminar esta dirección?')) {
            try {
                const response = await directionsService.deleteDirection(directionId);
                if (response.status === 'success') {
                    alert('Dirección eliminada exitosamente');
                    await this.loadDirections(event.target.closest('.directions-section'));
                } else {
                    throw new Error(response.message || 'Error al eliminar la dirección');
                }
            } catch (error) {
                console.error('Error al eliminar dirección:', error);
                alert('Error al eliminar la dirección: ' + error.message);
            }
        }
    }
}