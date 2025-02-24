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
      </div>
      <button id="btn-crear-cuenta" class="btn btn-primary" type="submit">Registrarse</button>
    </form>
  </div>
</main>
        `
    

    );
}

export default AddOwner