import '../presentacion/IniciarSesion.css';

function IniciarSesion() {
  // Devolver el HTML del formulario como un string
  const formHTML = `
    <main class="log-form">
      <div class="auth-container">
        <h2>Iniciar Sesión</h2>
        <form id="iniciar-sesion-form" class="auth-form">
          <input id="nombre_usuario" type="text" placeholder="Nombre de usuario" required>
          <input id="contrasenia" type="password" placeholder="Contraseña" required>
          <button id="btn-iniciar-sesion" class="btn btn-primary" type="submit">Ingresar</button>
        </form>
      </div>
    </main>
  `;

  // Esperar a que el formulario se agregue al DOM
  setTimeout(() => {
    const loginForm = document.getElementById('iniciar-sesion-form');
    if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombreUsuario = document.getElementById('nombre_usuario').value;
        const contrasenia = document.getElementById('contrasenia').value;

        try {
          const response = await fetch('http://localhost:8081/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: nombreUsuario, password: contrasenia }),
            credentials: 'include',
          });

          const data = await response.json();

          if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirigir al dashboard según el rol
            let newPath = '/';
            switch (data.role) {
              case 'admin':
                newPath = '/dashboard-admin';
                break;
              case 'client':
                newPath = '/dashboard-cliente';
                break;
              case 'Delivery_man':
                newPath = '/dashboard-repartidor';
                break;
              case 'manager':
                newPath = '/owner-dashboard';
                break;
              default:
                alert('Rol no reconocido');
                return;
            }

            // Redirigir el usuario al nuevo path
            window.history.pushState({}, '', newPath);

            // Llamar a initApp() para actualizar la vista después de iniciar sesión
            initApp();
          } else {
            alert(data.message || 'Credenciales incorrectas');
          }
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          alert('Error al iniciar sesión');
        }
      });
    }
  }, 0);

  return formHTML;
}

export default IniciarSesion;
