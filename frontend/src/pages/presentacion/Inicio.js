import '../presentacion/Inicio.css'
function Inicio(){
    return( 
    `
    <header>
        <div class="header-container">
            <figure class="logo-container">
                <img src="../public/img/logo.png" alt="Logo">
            </figure>
            <div class="text-container">
                <h1>Sistema Delivery de Emprendimientos</h1>
                <h2>UIDE - Campus Loja</h2>
            </div>
        </div>
    </header>

    <main>
        <section class="hero">
            <div class="container">
                <h2>Descubre y apoya a los mejores emprendimientos locales</h2>
                <p>Conecta con una comunidad de emprendedores que tienen algo único para ofrecer.</p>
                <a href="#emprendimientos" class="btn btn-primary">Explorar Emprendimientos</a>
            </div>
        </section>

        <section id="emprendimientos" class="emprendimientos">
            <div class="container">
                <h3>Emprendimientos destacados</h3>
                <div class="cards">
                    <div class="card">
                        <img src="img/emprendimiento1.jpg" alt="Emprendimiento 1">
                        <h4>Producto 1</h4>
                        <p>Descripción breve del producto o servicio.</p>
                        <a href="#" class="btn">Ver más</a>
                    </div>
                    <div class="card">
                        <img src="img/emprendimiento2.jpg" alt="Emprendimiento 2">
                        <h4>Producto 2</h4>
                        <p>Descripción breve del producto o servicio.</p>
                        <a href="#" class="btn">Ver más</a>
                    </div>
                    <div class="card">
                        <img src="img/emprendimiento3.jpg" alt="Emprendimiento 3">
                        <h4>Producto 3</h4>
                        <p>Descripción breve del producto o servicio.</p>
                        <a href="#" class="btn">Ver más</a>
                    </div>
                </div>
            </div>
        </section>
    </main>
    `
    )
}

export default Inicio    