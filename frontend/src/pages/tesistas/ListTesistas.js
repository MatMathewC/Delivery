import './ListTesistas.css';
function ListTesistas() {
    return (`
        <section class="header">
        <h1>Lista de Tesistas</h1>
        <a href="#" class="btn">Crear Tesista</a>
    </section>

    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Tipo de Documento</th>
                <th>Número</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>John</td>
                <td>Doe</td>    
                <td>1080V@example.com</td>
                <td>DNI</td>
                <td>12345678</td>
                <td>
                    <a href="#" class="edit">Editar</a>
                    <a href="#" class="delete">Eliminar</a>
                </td>
            </tr>
        </tbody>
    </table>
    `
    

    );
}

export default ListTesistas