//Delivery de pizza


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

    //Incluyo un array que contenga las pizzas (Como el de los tikets 3d que dio el ejemplo en clase 8):
    const saboresPizza = [
        {id:"1", nombre: "Muzzarela", precio:"5000"},
        {id:"2", nombre: "Napolitana", precio:"5300"},
        {id:"3", nombre: "Rucula", precio:"5500"},
        {id:"4", nombre: "Especial", precio:"5500"},
        {id:"5", nombre: "Cantimpalo", precio:"5700"},
        {id:"6", nombre: "Fugazzeta", precio:"5200"},
        {id:"7", nombre: "Palmitos", precio:"6000"},
        {id:"8", nombre: "Anana", precio:"6500"},
        {id:"9", nombre: "Jamon", precio:"5400"},
        {id:"10", nombre: "Cuatro Quesos", precio:"5900"},
    ];

    //Crear un do while para un menu donde el usuario conteste y luego verifique la respuesta del usuario.
do {
        let seleccionPizza = "Elija su pizza:\n";

        saboresPizza.forEach(sabor => {
            seleccionPizza += sabor.id + "-" + sabor.nombre + " $" + sabor.precio +"\n";
        });
        seleccionPizza += "Para finalizar, presione Y.";

        let respuesta = prompt(seleccionPizza);
        //solucion que encontre para que cuando apreten enter en un prompt vacio o en un numero mayor a 10 no me cierre el bucle.
        if (respuesta == false || respuesta > 10) {
            alert("Por favor, seleccione una opción válida.");
            continue;
        }

        if (respuesta >= 1 && respuesta <= saboresPizza.length) {
            let i = parseInt(respuesta) - 1; //como los arrays arranca en 0 le resto 1 para que sea la opcion seleccionada por el usuario

            total += parseInt(saboresPizza[i].precio);
            alert( "Elegiste una pizza de " + saboresPizza[i].nombre + " que sale $" + saboresPizza[i].precio + " si deseas puedes seleccionar otra luego de apretar aceptar.");
        } else if (respuesta !== "y" || respuesta !== "Y") {
            alert("Gracias por tu pedido. El total es: " + total + ". ¡Está en camino!");
            breack;
        } else {
            alert("Por favor, seleccione una opción válida.");
        }
    } while (respuesta !== "y" || respuesta !== "Y");
}

//llamar a las funciones
let nombreCliente = solicitarNombre();
if (nombreCliente != false) {
    menuPizza();
} else {
    alert("Por favor, intenta más tarde.");
}