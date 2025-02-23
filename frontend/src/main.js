// import './style.css'
import Navigation from './componentes/Navigation';
import Layout from './componentes/Layout';
import Footer from './componentes/Footer';
import Inicio from './pages/presentacion/Inicio';
import Rol from './pages/presentacion/Rol';
import IniciarSesion from './pages/presentacion/IniciarSesion';
import IndexPropietario from './pages/propietarios/IndexPropietario';
import AddCliente from './pages/clientes/Cliente';
import AddGerente from './pages/gerentes/Gerente';

// import ListTesistas from './pages/tesistas/ListTesistas';

function renderMainContent() {
  return
  `

  `
}

function initApp() {
  const app = document.getElementById('app');
  
  const handleRoute = async () => {
    const path = window.location.pathname;
    let mainContent;

    try{

      
      // Se manejaran todas las rutas
      switch(path){
        case '/':
          mainContent = Inicio();
          break;
        case '/crear_cuenta':
          mainContent = Rol();
          break;
        case '/iniciar_sesion':
          mainContent = IniciarSesion();
          break;
        case '/propietario/index':
          mainContent = IndexPropietario();
          break;
        case '/addcliente':
          mainContent = AddCliente();
          break;
        case '/addgerente':
          mainContent = AddGerente();
          break;
        //case 'login':
        //case 'dashboard':
        default:
          mainContent = Inicio();
          break;
      }

      // Se arma la estructura básica del proyecto
      const content = `
        ${Navigation()}
        <main id="main-content">
          ${mainContent}
        </main>
        ${Footer()}
      `
      app.innerHTML =  Layout(content);
      // Agregar la posibilida de manejar directamente el HTML
      if (mainContent instanceof HTMLElement){
        const mainElement = document.querySelector('#main-content');
        mainElement.appendChild(mainContent);
      }

      app.classList.add('app-container');
    


    }catch(error){
      console.log('Error al buscar la ruta ingresada', error);
      app.innerHTML = Layout(`
          <div>
            <h1>Error al cargar la página</h1>
            <p>${error.message}<p>
          </div>
        `);
      }


    }

    // Manejar navegación por Clicks
    document.addEventListener('click', async(e) => {
      if (e.target.matches('a[href]')) {
        e.preventDefault();
    const href = e.target.getAttribute('href');
    window.history.pushState({}, '', href);
    await handleRoute();
    
    }});

    window.addEventListener('popstate', handleRoute);
    handleRoute();

}
  

document.addEventListener('DOMContentLoaded', initApp);




