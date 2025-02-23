import './IndexPropietario.css'
function IndexPropietario(){
    return `
        <div class="dashboard">
            <div class="stats">
                <div class="stat-item">
                    <h3>Tiendas</h3>
                    <p>2</p>
                </div>
                <div class="stat-item">
                    <h3>Pedidos procesados</h3>
                    <p>89</p>
                </div>
                <div class="stat-item">
                    <h3>Pedidos en preparación</h3>
                    <p>2</p>
                </div>
                <div class="stat-item">
                    <h3>Pedidos entregados</h3>
                    <p>4</p>
                </div>
                <div class="stat-item">
                    <h3>Ganancias</h3>
                    <p>$ 498,00</p>
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
                        <td>OD-24-10-2GEU-ZWKEBFUL7</td>
                        <td>$ 6,00</td>
                        <td>3 meses, 1 semana ago</td>
                        <td>1 semana, 6 días ago</td>
                        <td><button class="view-btn">Ver</button></td>
                    </tr>
                    <tr>
                        <td>OD-24-10-FEZH-49M7UHTI4</td>
                        <td>$ 6,00</td>
                        <td>3 meses, 1 semana ago</td>
                        <td>3 semanas, 2 días ago</td>
                        <td><button class="view-btn">Ver</button></td>
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

export default IndexPropietario;