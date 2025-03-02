import './AddStore.css';

function AddStore() {
    const backendURL = "http://localhost:8081";

    // Función de envío del formulario
    setTimeout(() => {  
      const formAgregarTienda = document.getElementById("form-agregar-tienda");

      if (formAgregarTienda) {
          formAgregarTienda.addEventListener("submit", async function (e) {
              e.preventDefault(); 

              const storeData = {
                name: document.getElementById('store-name').value.trim(),
                description: document.getElementById('store-description').value.trim(),
                verificationState: document.getElementById('verification-state').value.trim(),
                timeState: document.getElementById('time-state').value.trim(),
                openingTime: document.getElementById('opening-time').value.trim(),
                closingTime: document.getElementById('closing-time').value.trim(),
                ruc: document.getElementById('ruc').value.trim(),
                verificationProof: document.getElementById('verification-proof').value.trim(),
                storeCategory: document.getElementById('store-category').value ? parseInt(document.getElementById('store-category').value) : null,
                storeAddress: document.getElementById('store-address').value ? parseInt(document.getElementById('store-address').value) : null,
                storeUser: document.getElementById('store-user').value ? parseInt(document.getElementById('store-user').value) : null,
            };            

              if (
                  !storeData.name ||
                  !storeData.description ||
                  !storeData.verificationState ||
                  !storeData.timeState ||
                  !storeData.ruc ||
                  !storeData.verificationProof ||
                  storeData.storeCategory === null ||
                  storeData.storeAddress === null ||
                  storeData.storeUser === null

              ) {
                  alert("Por favor, complete todos los campos.");
                  return;
              }
              console.log("Datos a enviar:", storeData);
              try {
                  const response = await fetch(`${backendURL}/api/addStore`, {
                      method: 'POST',
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(storeData)
                  });

                  const result = await response.json();

                  if (result.status === 'success') {
                      alert('Tienda registrada exitosamente');
                      formAgregarTienda.reset();
                  } else {
                      alert('Error al registrar la tienda: ' + result.message);
                  }
              } catch (error) {
                  console.error('Error en la solicitud:', error);
                  alert('Hubo un error al registrar la tienda');
              }
          });
      }
  }, 0);

    // Función para cargar las opciones de categorías, direcciones y usuarios
    const loadSelectOptions = async () => {
      try {
          // Cargar las categorías
          const categoriesResponse = await fetch(`${backendURL}/api/categories`);
          const categoriesResponseData = await categoriesResponse.json();
  
          if (categoriesResponseData.status === 'success' && Array.isArray(categoriesResponseData.categories)) {
              const categories = categoriesResponseData.categories;
              const categorySelect = document.getElementById('store-category');
              categories.forEach(category => {
                  const option = document.createElement('option');
                  if (category.idCategory) {
                      option.value = category.idCategory;
                      option.textContent = category.name;
                      categorySelect.appendChild(option);
                  }
              });
          } else {
              console.error('La respuesta de categorías no es válida:', categoriesResponseData);
              alert('Error al cargar categorías: la respuesta no es válida.');
          }
  
          // Cargar las direcciones
          const addressesResponse = await fetch(`${backendURL}/api/addresses`);
          const addressesResponseData = await addressesResponse.json();
  
          if (addressesResponseData.status === 'success' && Array.isArray(addressesResponseData.addresses)) {
              const addresses = addressesResponseData.addresses;
              const addressSelect = document.getElementById('store-address');
              addresses.forEach(address => {
                  const option = document.createElement('option');
                  if (address.idDirection) { // Asegurarse de que el id esté bien
                      option.value = address.idDirection;
                      option.textContent = `${address.main_address}, ${address.reference}`;
                      addressSelect.appendChild(option);
                  }
              });
          } else {
              console.error('La respuesta de direcciones no es válida:', addressesResponseData);
              alert('Error al cargar direcciones: la respuesta no es válida.');
          }
  
          // Cargar los usuarios
          const usersResponse = await fetch(`${backendURL}/api/users`);
          const usersResponseData = await usersResponse.json();
  
          if (usersResponseData.status === 'success' && Array.isArray(usersResponseData.users)) {
              const users = usersResponseData.users;
              const userSelect = document.getElementById('store-user');
              users.forEach(user => {
                  const option = document.createElement('option');
                  if (user.idUser) {
                      option.value = user.idUser;
                      option.textContent = user.name;
                      userSelect.appendChild(option);
                  }
              });
          } else {
              console.error('La respuesta de usuarios no es válida:', usersResponseData);
              alert('Error al cargar usuarios: la respuesta no es válida.');
          }
      } catch (error) {
          console.error('Error al cargar las opciones:', error);
          alert('Hubo un error al cargar las opciones');
      }
  };
  
  // Cargar las opciones cuando el DOM esté completamente cargado
  document.addEventListener("DOMContentLoaded", loadSelectOptions);  

    // Asegurarse de que las opciones se carguen cuando el componente esté montado
    window.onload = loadSelectOptions;

    // Retornar el HTML
    return `
        <main>
            <form id="form-agregar-tienda">
                <div class="store-section">
                    <h3>Datos de la Tienda</h3>

                    <label for="store-name">Nombre de la tienda</label>
                    <input id="store-name" type="text" placeholder="Nombre de la tienda" required />

                    <label for="store-description">Descripción</label>
                    <input id="store-description" type="text" placeholder="Descripción" required />

                    <label for="verification-state">Estado de verificación</label>
                    <select id="verification-state" required>
                        <option value="">Seleccione...</option>
                        <option value="Active">Activo</option>
                        <option value="Pending">Pendiente</option>
                    </select>

                    <label for="time-state">Estado de horario</label>
                    <select id="time-state" required>
                        <option value="">Seleccione...</option>
                        <option value="Open">Abierto</option>
                        <option value="Closed">Cerrado</option>
                    </select>

                    <label for="opening-time">Hora de apertura</label>
                    <input id="opening-time" type="datetime-local" placeholder="Hora de apertura" />

                    <label for="closing-time">Hora de cierre</label>
                    <input id="closing-time" type="datetime-local" placeholder="Hora de cierre" />

                    <label for="ruc">RUC</label>
                    <input id="ruc" type="text" placeholder="RUC" required />

                    <label for="verification-proof">Prueba de verificación</label>
                    <input id="verification-proof" type="text" placeholder="Prueba de verificación" required />

                    <label for="store-category">Categoría de la tienda</label>
                    <select id="store-category" required>
                        <option value="">Seleccione...</option>
                    </select>

                    <label for="store-address">Dirección de la tienda</label>
                    <select id="store-address" required>
                        <option value="">Seleccione...</option>
                    </select>

                    <label for="store-user">Usuario responsable</label>
                    <select id="store-user" required>
                        <option value="">Seleccione...</option>
                    </select>
                </div>
                <button id="btn-crear-cuenta" class="btn btn-primary" type="submit">Registrar Tienda</button>
            </form>
        </main>
    `;
}

export default AddStore;
