alert("Bienvenido a pizzeria 'Pepito'.");

//funcion para que en el inicio solicite el nombre:

function solicitarNombre() {
    let nombre;
    //3 intentos 
    for (let i = 0; i <= 2; i++) {
        nombre = prompt("Ingresa tu nombre:");
        if (nombre !== "") {
            alert("Hola " + nombre + ", ¿que pizza vas a pedir?");
            return nombre;
        } else {
            alert("Ingrese un nombre.");
        }
    }
    return false // Si el usuario no ingresa un nombre válido después de 3 intentos.
}

function menuPizza() {
    let total = 0;
    let respuesta;
    do {
        respuesta = prompt("Elija su pizza:\n1 - Muzzarela $1000.\n2 - Napolitana $1200.\n3 - Rucula $1400.\n4 - Cantimpalo $1200.\n7 Para salir, presione Y.");

        switch (respuesta) {
            case "1":
                total += 1000;
                alert("Elegiste una Muzzarela y que sale $1000, si desea puede selecionar otra o salir apretando 'Y'");
                break;
            case "2":
                total += 1200;
                alert("Elegiste una Napolitana y que sale $1200, si desea puede selecionar otra o salir apretando 'Y'");
                break;
            case "3":
                total += 1400;
                alert("Elegiste una Rucula y que sale $1400, si desea puede selecionar otra o salir apretando 'Y'");
                break;
            case "4":
                total += 1200;
                alert("Elegiste una Cantimpalo y que sale $1200, si desea puede selecionar otra o salir apretando 'Y'");
                break;
            case "Y":
            case "y":
                alert("Gracias por tu pedido. El total es: $" + total + ". ¡Esta en camino!");
                break;
            default:
                alert("Por favor, seleccione una opción");
        }
    } while (respuesta !== "Y" && respuesta !== "y");
}

let nombreCliente = solicitarNombre();
if (nombreCliente != false) {
    menuPizza();
} else {
    alert("Por favor, intenta más tarde.");
}