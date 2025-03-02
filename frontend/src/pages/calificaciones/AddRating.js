import './AddRating.css';
function AddRating() {
    return (`
    <main>
        <div class="auth-container">
            <h2>Califica tu pedido</h2>
            <form id="crear-calificacion-form" class="auth-form">
                <select id="value" required>
                    <option value="" disabled selected>Estrellas</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <input id="description" type="text" placeholder="Descripción">
                <button id="btn-crear-cuenta" class="btn btn-primary" type="submit">Calificar</button>
            </form>
        </div>
    </main>
    `);
}

export default AddRating