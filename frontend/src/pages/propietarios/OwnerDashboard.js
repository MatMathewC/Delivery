import './OwnerDashboard.css'
function OwnerDashboard(){
    return `
        <div class="dashboard">
            <div class="stats">
                <div class="stat-item">
                    <h3>Tiendas</h3>
                    <p>0</p>
                </div>
                <div class="stat-item">
                    <h3>Pedidos procesados</h3>
                    <p>0</p>
                </div>
                <div class="stat-item">
                    <h3>Pedidos en preparación</h3>
                    <p>0</p>
                </div>
                <div class="stat-item">
                    <h3>Pedidos entregados</h3>
                    <p>0</p>
                </div>
                <div class="stat-item">
                    <h3>Ganancias</h3>
                    <p>$0</p>
                </div>
                </div>

                <div class="orders">
                <h2>Pedidos en preparación</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Pedido ID</th>
                        <th>Precio</th>
                        <th>Hora de realización del pedido</th>
                        <th>Hora aceptada del pedido</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colspan="5">No hay pedidos entregados</td>
                    </tr>
                    </tbody>
                </table>

                <h2>Pedidos entregados</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Pedido ID</th>
                        <th>Precio</th>
                        <th>Hora de realización del pedido</th>
                        <th>Hora entregada del pedido</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colspan="5">No hay pedidos entregados</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `
}

export default OwnerDashboard;