import './AddClient.css';
function AddClient() {
    return (`

<main>
        <div class="auth-container">
            <h2>Crear Cuenta</h2>
            <form id="crear-cuenta-form" class="auth-form">
                <input id="nombre" type="text" placeholder="Nombre" required>
                <input id="apellido" type="text" placeholder="Apellido" required>
                <input id="usuario" type="text" placeholder="Nombre de usuario" required>
                <input id="contrasena" type="text" placeholder="Contraseña" required>
                <input id="correo" type="text" placeholder="Correo" required>
                <input id="telefono" type="text" placeholder="Teléfono" required>
                <input id="direccion" type="text" placeholder="Dirección">
                <input id="referencia" type="text" placeholder="Referencia">
                <button id="btn-crear-cuenta" class="btn btn-primary" type="submit">Registrarse</button>
            </form>
        </div>
    </main>
        `
    

    );
}

export default AddClient