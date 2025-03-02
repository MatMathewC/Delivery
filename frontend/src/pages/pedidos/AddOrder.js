import './AddOrder.css';
function AddOrder() {
    return (`
    <main>
        <div class="auth-container">
            <h2>Crear Orden</h2>
            <form id="crear-orden-form" class="auth-form">
                <input id="order-code" type="text" placeholder="Código de Orden" required>
                <input id="total" type="text" placeholder="Total" required>
                <select id="state" required>
                    <option value="" disabled selected>Estado</option>
                    <option value="Pending">Pendiente</option>
                    <option value="Accepted">Aceptada</option>
                    <option value="On_Route">En ruta</option>
                    <option value="Delivered">Enviada</option>
                    <option value="Cancelled">Cancelada</option>
                </select>

                <input id="order_start_date" type="text" placeholder="Fecha de inicio de orden" required>
                <input id="order_accepted_date" type="text" placeholder="Fecha de aceptación de orden" required>
                <input id="order_delivery_date" type="text" placeholder="Fecha de entrega de orden" required>
                <input id="optional_instruction" type="text" placeholder="Instrucciones opcionales">
                <button id="btn-crear-cuenta" class="btn btn-primary" type="submit">Registrarse</button>
            </form>
        </div>
    </main>

                `
    

    );
}

export default AddOrder