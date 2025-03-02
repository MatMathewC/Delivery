import '../styles/Navigation.css';

function NavigationDash() {
  let user = null;
  const userData = localStorage.getItem('user');
  const isAuthenticated = userData && userData !== "undefined";

  if (isAuthenticated) {
    try {
      user = JSON.parse(userData);
    } catch (error) {
      console.error("Error al parsear el usuario desde localStorage", error);
      user = null;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Eliminar el token si se está usando
    window.location.href = '/iniciar-sesion'; // Redirigir al login
  };

  return `
    <nav class="nav-container">
      <div class="nav-user">
        ${isAuthenticated && user ? `<span>${user.username}</span>` : ''}
        ${isAuthenticated ? `<button id="logout-btn" class="btn_ini">Cerrar Sesión</button>` : ''}
      </div>
    </nav>
  `;
}

// Agregar funcionalidad al botón después de renderizar
setTimeout(() => {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
}, 0);

export default NavigationDash;
