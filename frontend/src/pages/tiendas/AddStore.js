import './AddStore.css';
function AddStore() {
    return (`

<main>

        <!-- Bloque de datos de la tienda -->
        <div class="store-section">
          <h3>Datos de la Tienda</h3>
          <input id="store-name" type="text" placeholder="Nombre de la tienda" required>
          <input id="store-description" type="text" placeholder="Descripción" required>
          <select id="verification-state" required>
            <option value="">Estado de verificación</option>
            <option value="Active">Activo</option>
            <option value="Pending">Pendiente</option>
          </select>
          <select id="time-state" required>
            <option value="">Estado de horario</option>
            <option value="Open">Abierto</option>
            <option value="Closed">Cerrado</option>
          </select>
          <input id="opening-time" type="datetime-local" placeholder="Hora de apertura">
          <input id="closing-time" type="datetime-local" placeholder="Hora de cierre">
          <input id="ruc" type="text" placeholder="RUC" required>
          <input id="verification-proof" type="text" placeholder="Prueba de verificación" required>
        </div>
      </div>
      <button id="btn-crear-cuenta" class="btn btn-primary" type="submit">Registrar Tienda</button>
    </form>
  </div>
</main>
        `
    

    );
}

export default AddStore