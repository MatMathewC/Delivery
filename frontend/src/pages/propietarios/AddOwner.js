import './AddOwner.css';
function AddOwner() {
    return (`

<main>
  <div class="auth-container">
    <h2>Crear Cuenta</h2>
    <form id="crear-cuenta-form" class="auth-form">
      <div class="form-sections">
        <!-- Bloque de datos de usuario -->
        <div class="user-section">
          <h3>Datos del Usuario</h3>
          <input id="nombre" type="text" placeholder="Nombre" required>
          <input id="apellido" type="text" placeholder="Apellido" required>
          <input id="usuario" type="text" placeholder="Nombre de usuario" required>
          <input id="contrasena" type="password" placeholder="Contraseña" required>
          <input id="correo" type="email" placeholder="Correo" required>
          <input id="telefono" type="text" placeholder="Teléfono" required>
          <input id="direccion" type="text" placeholder="Dirección">
          <input id="referencia" type="text" placeholder="Referencia">
        </div>

        <!-- Separador -->
        <div class="form-divider"></div>

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
      <button id="btn-crear-cuenta" class="btn btn-primary" type="submit">Registrarse</button>
    </form>
  </div>
</main>
        `
    

    );
}

export default AddOwner