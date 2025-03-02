import './AddCategory.css';

function AddCategory() {
    // URL del backend
    const backendURL = "http://localhost:8081"; // Cambiar a la URL de tu API

    // Función para cargar las opciones de categorías y usuarios
    const loadSelectOptions = async () => {
        try {
            // Cargar las categorías (solo categorías padres, es decir, aquellas que no tienen fk_idCategory)
            const categoriesResponse = await fetch(`${backendURL}/api/categories`);
            const categoriesResponseData = await categoriesResponse.json();

            if (categoriesResponseData.status === 'success' && Array.isArray(categoriesResponseData.categories)) {
                const categories = categoriesResponseData.categories;
                const categoryParentSelect = document.getElementById('categoryParent');
                categories.forEach(category => {
                    // Solo se cargan las categorías que no tienen un padre
                    if (category.fk_idCategory === null) {
                        const option = document.createElement('option');
                        option.value = category.idCategory;
                        option.textContent = category.name;
                        categoryParentSelect.appendChild(option);
                    }
                });
            } else {
                console.error('La respuesta de categorías no es válida:', categoriesResponseData);
                alert('Error al cargar categorías: la respuesta no es válida.');
            }

            // Cargar los usuarios
            const usersResponse = await fetch(`${backendURL}/api/users`);
          const usersResponseData = await usersResponse.json();
  
          if (usersResponseData.status === 'success' && Array.isArray(usersResponseData.users)) {
              const users = usersResponseData.users;
              const userSelect = document.getElementById('user');
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

    // Llamar a la función cuando el DOM se cargue
    document.addEventListener("DOMContentLoaded", loadSelectOptions);

    window.onload = loadSelectOptions;
    // Retornar el HTML
    return `
        <div class="container">
            <h2>Agregar Nueva Categoría</h2>
            <form id="addCategoryForm">
                <div class="form-group">
                    <label for="categoryName">Nombre de la Categoría:</label>
                    <input type="text" id="categoryName" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="categoryGlobal">Global:</label>
                    <select id="categoryGlobal" class="form-control" required>
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="categoryParent">Categoría Padre:</label>
                    <select id="categoryParent" class="form-control">
                        <option value="" disabled selected>Seleccionar Categoría</option>
                        <!-- Aquí se cargarán las categorías padres -->
                    </select>
                </div>
                <div class="form-group">
                    <label for="idUser">ID del Usuario:</label>
                    <select id="user" class="form-control">
                        <option value="" disabled selected>Selecciona el usuario que crea la categoria</option>
                        <!-- Aquí se cargarán los usuarios -->
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Agregar Categoría</button>
            </form>
        </div>
    `;
}

export default AddCategory;
