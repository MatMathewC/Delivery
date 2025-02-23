import '../presentacion/IniciarSesion.css'
function IniciarSesion(){
    return `
        <main class="log-form">
            <div class="auth-container">
                <h2>Iniciar Sesión</h2>
                <form id="iniciar-sesion-form" class="auth-form">
                    <input id="nobre_usuario" type="text" placeholder="Nombre de usuario" required>
                    <input id="contrasena" type="password" placeholder="Contraseña" required>
                    <button id="btn-iniciar-sesion" class="btn btn-primary" type="submit">Ingresar</button>
                </form>
            </div>
        </main>
    `
}

export default IniciarSesion;