import '../styles/Navigation.css';

function Navigation() {
    return (
       `
        <nav>
        <div class="nav-container">
            <div class="logo-container">
                <img src="../public/img/logo.png" alt="Logo">
            </div>
            <ul class="nav-list">
                <li><a href="index.html">Inicio</a></li>
                <li><a href="#emprendimientos">Emprendimientos</a></li>
                <li><a href="#contacto">Contacto</a></li>
            </ul>
            <div class="nav-user">
                <a href="/iniciar_sesion" class="btn_ini">Iniciar Sesión</a>
                <a href="/crear_cuenta" class="btn_ini">Crear Cuenta</a>
            </div>
        </div>
        </nav>
       `
    );
}

export default Navigation;