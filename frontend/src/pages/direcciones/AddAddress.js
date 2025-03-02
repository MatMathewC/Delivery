import { directionsService } from '../../services/api.js';
import './AddAddress.css';

function AddAddress() {
    const loadDirectionData = async (id) => {
        try {
            const direction = await directionsService.getDirection(id);
            const form = document.getElementById('addDirectionForm');
            form.main_address.value = direction.main_address;
            form.secondary_address.value = direction.secondary_address;
            form.reference.value = direction.reference;
            form.latitude.value = direction.latitude;
            form.longitude.value = direction.longitude;
        } catch (error) {
            console.error('Error al cargar datos de la dirección:', error);
            alert('Error al cargar los datos de la dirección.');
        }
    };

    const setupFormHandlers = () => {
        const form = document.getElementById('addDirectionForm');
        const submitButton = form.querySelector('.btn-submit');
        const cancelButton = form.querySelector('.btn-cancel');
        const urlParams = new URLSearchParams(window.location.search);
        const directionId = urlParams.get('id');
        const titulo = document.querySelector('h1');

        if (directionId) {
            titulo.textContent = 'Editar Dirección';
            submitButton.textContent = 'Actualizar Dirección';
            loadDirectionData(directionId);
        }

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const formData = {
                main_address: form.main_address.value.trim(),
                secondary_address: form.secondary_address.value.trim(),
                reference: form.reference.value.trim(),
                latitude: parseFloat(form.latitude.value),
                longitude: parseFloat(form.longitude.value)
            };

            for (const [key, value] of Object.entries(formData)) {
                if (!value && value !== 0) {
                    alert('Todos los campos son obligatorios');
                    return;
                }
            }

            try {
                if (directionId) {
                    const responseData = await directionsService.updateDirection(directionId, formData);
                    
                    if (responseData.status === 'success') {
                        alert(responseData.message);
                        window.location.href = '/directions';
                    } else {
                        throw new Error(responseData.message || 'Error al actualizar la dirección');
                    }
                } else {
                    const response = await directionsService.createDirection(formData);
                    const responseData = await response.json();
                    
                    if (responseData.status === 'success') {
                        alert(responseData.message);
                        window.location.href = '/directions';
                    } else {
                        throw new Error(responseData.message || 'Error al guardar la dirección');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                alert(error.message || 'Error al procesar la solicitud. Por favor intente nuevamente.');
            }
        });

        cancelButton.addEventListener('click', () => {
            window.location.href = '/directions';
        });
        submitButton.addEventListener('click', () => {
            window.location.href = '/directions';
        });
    };

    setTimeout(setupFormHandlers, 0);

    return `
    <h1>Agregar Dirección</h1>
    <div class="form-container">
        <form id="addDirectionForm" class="direction-form">
            <div class="form-group">
                <label for="main_address">Dirección Principal:</label>
                <input type="text" id="main_address" name="main_address" required>
            </div>

            <div class="form-group">
                <label for="secondary_address">Dirección Secundaria:</label>
                <input type="text" id="secondary_address" name="secondary_address" required>
            </div>

            <div class="form-group">
                <label for="reference">Referencia:</label>
                <input type="text" id="reference" name="reference" required>
            </div>

            <div class="form-group">
                <label for="latitude">Latitud:</label>
                <input type="number" step="any" id="latitude" name="latitude" required>
            </div>

            <div class="form-group">
                <label for="longitude">Longitud:</label>
                <input type="number" step="any" id="longitude" name="longitude" required>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn-submit">Guardar Dirección</button>
                <button type="button" class="btn-cancel">Cancelar</button>
            </div>
        </form>
    </div>
    `;
}

export default AddAddress;
