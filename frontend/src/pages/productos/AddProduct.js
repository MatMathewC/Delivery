import './AddProduct.css';
function AddProduct() {
    return (`

<main>
        <div class="auth-container">
            <h2>Crear Producto</h2>
            <form id="crear-producto-form" class="auth-form">
                <input id="codigo-producto" type="text" placeholder="Código del Producto" required>
                <input id="nombre" type="text" placeholder="Nombre del Producto" required>
                <textarea id="descripcion" placeholder="Descripción" required></textarea>
                <input id="precio" type="number" placeholder="Precio" step="0.01" required>
                <select id="atributos" required>
                    <option value="" disabled selected>Seleccione Atributos</option>
                    <option value="New">Nuevo</option>
                    <option value="Recommended">Recomendado</option>
                    <option value="Popular">Popular</option>
                    <option value="None">Ninguno</option>
                </select>
                <select id="disponibilidad" required>
                    <option value="" disabled selected>Disponibilidad</option>
                    <option value="1">Disponible</option>
                    <option value="0">No Disponible</option>
                </select>
                <input id="fecha-registro" type="datetime-local" placeholder="Fecha de Registro" required>
                <button id="btn-crear-producto" class="btn btn-primary" type="submit">Registrar Producto</button>
            </form>
        </div>
    </main>
            `
    

    );
}

export default AddProduct