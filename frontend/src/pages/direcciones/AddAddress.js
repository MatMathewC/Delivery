import './AddAddress.css';
function AddAddress() {
    return (`

<div class="container">
    <h2>Formulario de Dirección</h2>
    <form action="/guardar_direccion" method="POST">

        <!-- main_address -->
        <label for="main_address">Dirección Principal</label>
        <input type="text" id="main_address" name="main_address" placeholder="Ingresa la dirección principal" required>

        <!-- secondary_address -->
        <label for="secondary_address">Dirección Secundaria</label>
        <input type="text" id="secondary_address" name="secondary_address" placeholder="Ingresa la dirección secundaria" required>

        <!-- reference -->
        <label for="reference">Referencia</label>
        <input type="text" id="reference" name="reference" placeholder="Ingresa una referencia" required>

        <!-- latitude -->
        <label for="latitude">Latitud</label>
        <input type="number" id="latitude" name="latitude" placeholder="Ingresa la latitud" step="any" required>

        <!-- longitude -->
        <label for="longitude">Longitud</label>
        <input type="number" id="longitude" name="longitude" placeholder="Ingresa la longitud" step="any" required>

        <button type="submit">Guardar Dirección</button>
    </form>
</div>
            `
    

    );
}

export default AddAddress