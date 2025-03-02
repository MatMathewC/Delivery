import './AddSubCategory.css';
function AddSubCategory() {
    return (`

    <main>
        <div class="auth-container">
            <h2>Crear Subcategoria</h2>
            <form id="crear-categoria-form" class="auth-form">
                <input id="nombre" type="text" placeholder="Nombre" required>
                <select id="global" required>
                    <option value="" disabled selected>Global</option>
                    <option value="1">Si</option>
                    <option value="0">No</option>
                </select>
                <button id="btn-crear-cuenta" class="btn btn-primary" type="submit">Registrarse</button>
            </form>
        </div>
    </main>
                `
    

    );
}

export default AddSubCategory