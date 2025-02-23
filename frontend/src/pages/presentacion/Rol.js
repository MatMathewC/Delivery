import '../presentacion/Rol.css'
function Rol(){
    return( 
    `
        <div id="role-selection" class="container">
        <h1>Selecciona tu Rol</h1>
        <p>Elige cómo deseas registrarte en nuestra plataforma:</p>
        <div class="roles">
            <div class="role-card" id="cliente">
                <h2>Cliente</h2>
                <p>Compra productos de emprendimientos cercanos y apoya a nuestra comunidad.</p>
                <a class="btn" onclick="selectRole('cliente')" href="/addcliente">Seleccionar</a>
            </div>
            <div class="role-card" id="gerente">
                <h2>Gerente</h2>
                <p>Administra tu tienda, sube productos y gestiona pedidos.</p>
                <a class="btn" onclick="selectRole('gerente')" href="/addgerente">Seleccionar</a>
            </div>
            <div class="role-card" id="repartidor">
                <h2>Repartidor</h2>
                <p>Realiza entregas y forma parte de nuestra red de repartidores.</p>
                <button class="btn" onclick="selectRole('repartidor')">Seleccionar</button>
            </div>
        </div>
    </div>
    `
    )
}

export default Rol;   