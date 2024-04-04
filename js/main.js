// formulario
document.body.innerHTML = `
<div class="loginBox">
<div class="logoLogin">
<img src="./media/logoPizzeria.png" alt="logo de la pizzeria">
</div>
<div class="pantallaDatos">
<div class="tituloLogin">
<h1>Ingrese sus datos:</h1>
</div>
<div class="inputs">
<form id="formulario" method="post">
    <input type="text" name="nombre" placeholder="Nombre">
    <input type="email" name="email" placeholder="Correo electrónico">
    <input type="text" name="direccion" placeholder="Dirección">
    <input type="tel" name="celular" placeholder="Número de celular">
    <input type="tel" name="celularDos" placeholder="Confirme su celular">
    <button type="submit">Ingresar</button>
</form>
</div>
</div>
</div>
`;

document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar que se envíe el formulario

    const nombre = document.getElementsByName('nombre')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const celular = document.getElementsByName('celular')[0].value;
    const celularDos = document.getElementsByName('celularDos')[0].value;
    const direccion = document.getElementsByName('direccion')[0].value;

    if (nombre && email && direccion && celular == celularDos) { // Verificar que todos los campos estén completos
        const userData = {
            nombre: nombre,
            email: email,
            celular: celular,
            celularDos: celularDos,
            direccion: direccion
        };

        localStorage.setItem('userData', JSON.stringify(userData));

        redireccionar();

        // Redirigir a otra página
        setTimeout(function() {
			window.location.href = 'menu.html';
		}, 3000); 
	
    } else {
        completarDatos();
    }
});


//Alertas de ingreso y error
function redireccionar() {
    Swal.fire({
        title: "¡Bienvenido!",
        text: "Te mandaremos al menu para que puedas seleccionar tu pedido",
        icon: "success"
    });
}

function completarDatos() {
    Swal.fire({
        title: "¡Revisa tus datos!",
        text: "Debes llenar todos los campos y tus números de telefono deben coincidir.",
        icon: "warning"
    });
}