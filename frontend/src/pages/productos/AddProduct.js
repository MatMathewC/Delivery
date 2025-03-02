import './AddProduct.css';

function AddProduct() {
    const backendURL = "http://localhost:8081";

    // Función de envío del formulario
    setTimeout(() => {
        const formCrearProducto = document.getElementById("crear-producto-form");

        if (formCrearProducto) {
            formCrearProducto.addEventListener("submit", async function (e) {
                e.preventDefault();

                const productData = {
                    product_code: document.getElementById('codigo-producto').value.trim(),
                    name: document.getElementById('nombre').value.trim(),
                    description: document.getElementById('descripcion').value.trim(),
                    price: parseFloat(document.getElementById('precio').value.trim()),
                    atributos: document.getElementById('atributos').value.trim(),
                    disponibilidad: document.getElementById('disponibilidad').value.trim(),
                    fechaRegistro: document.getElementById('fecha-registro').value.trim(),
                    stock: parseInt(document.getElementById('stock').value.trim()),
                    isVariant: document.getElementById('is-variant').value.trim(),
                    category: document.getElementById('category').value.trim(),
                    store: document.getElementById('store').value.trim(),
                };

                // Verificar que todos los campos necesarios estén presentes
                if (
                    !productData.product_code ||
                    !productData.name ||
                    !productData.description ||
                    !productData.price ||
                    !productData.atributos ||
                    !productData.disponibilidad ||
                    !productData.fechaRegistro ||
                    !productData.stock ||
                    !productData.isVariant ||
                    !productData.category ||
                    !productData.store
                ) {
                    alert("Por favor, complete todos los campos.");
                    return;
                }
                

                try {
                    // Enviar la solicitud con los datos del producto en formato JSON
                    const response = await fetch(`${backendURL}/api/addProduct`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(productData),
                    });

                    const result = await response.json();

                    if (result.status === 'success') {
                        alert('Producto registrado exitosamente');
                        formCrearProducto.reset();
                    } else {
                        alert('Error al registrar el producto: ' + result.message);
                    }
                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    alert('Hubo un error al registrar el producto');
                }
            });
        }
    }, 0);

    // Función para cargar las opciones de categorías y tiendas
    const loadSelectOptions = async () => {
        try {
            // Cargar las categorías
            const categoriesResponse = await fetch(`${backendURL}/api/categories`);
            const categoriesResponseData = await categoriesResponse.json();
    
            if (categoriesResponseData.status === 'success' && Array.isArray(categoriesResponseData.categories)) {
                const categories = categoriesResponseData.categories;
                const categorySelect = document.getElementById('category');
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
    
            // Cargar las tiendas
            const storesResponse = await fetch(`${backendURL}/api/stores`);
            const storesResponseData = await storesResponse.json();
    
            if (storesResponseData.status === 'success' && Array.isArray(storesResponseData.stores)) {
                const stores = storesResponseData.stores;
                const storeSelect = document.getElementById('store');
                stores.forEach(store => {
                    const option = document.createElement('option');
                    if (store.idStore) {
                        option.value = store.idStore;
                        option.textContent = store.name;
                        storeSelect.appendChild(option);
                    }
                });
            } else {
                console.error('La respuesta de tiendas no es válida:', storesResponseData);
                alert('Error al cargar tiendas: la respuesta no es válida.');
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
            <div class="auth-container">
                <h2>Crear Producto</h2>
                <form id="crear-producto-form" class="auth-form">
                    <div class="form-group">
                        <label for="codigo-producto">Código del Producto</label>
                        <input id="codigo-producto" type="text" placeholder="Código del Producto" required>
                    </div>

                    <div class="form-group">
                        <label for="nombre">Nombre del Producto</label>
                        <input id="nombre" type="text" placeholder="Nombre del Producto" required>
                    </div>

                    <div class="form-group">
                        <label for="descripcion">Descripción</label>
                        <textarea id="descripcion" placeholder="Descripción" required></textarea>
                    </div>

                    <div class="form-group">
                        <label for="precio">Precio</label>
                        <input id="precio" type="number" placeholder="Precio" step="0.01" required>
                    </div>

                    <div class="form-group">
                        <label for="atributos">Atributos</label>
                        <select id="atributos" required>
                            <option value="" disabled selected>Seleccione Atributos</option>
                            <option value="New">Nuevo</option>
                            <option value="Recommended">Recomendado</option>
                            <option value="Popular">Popular</option>
                            <option value="None">Ninguno</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="disponibilidad">Disponibilidad</label>
                        <select id="disponibilidad" required>
                            <option value="" disabled selected>Disponibilidad</option>
                            <option value="1">Disponible</option>
                            <option value="0">No Disponible</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="fecha-registro">Fecha de Registro</label>
                        <input id="fecha-registro" type="datetime-local" required>
                    </div>

                    <div class="form-group">
                        <label for="stock">Cantidad en Stock</label>
                        <input id="stock" type="number" placeholder="Cantidad en Stock" required>
                    </div>

                    <div class="form-group">
                        <label for="is-variant">¿Es un Variante?</label>
                        <select id="is-variant" required>
                            <option value="" disabled selected>Seleccione una opción</option>
                            <option value="1">Sí</option>
                            <option value="0">No</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="category">Categoría</label>
                        <select id="category" required>
                            <option value="" disabled selected>Seleccionar Categoría</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="store">Tienda</label>
                        <select id="store" required>
                            <option value="" disabled selected>Seleccionar Tienda</option>
                        </select>
                    </div>
                    <button id="btn-crear-producto" class="btn btn-primary" type="submit">Registrar Producto</button>
                </form>
            </div>
        </main>
    `;
}

export default AddProduct;
