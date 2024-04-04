let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const moneda = '$';
const productos = document.querySelector('#productos');
const compra = document.querySelector('#carrito');
const total = document.querySelector('#total');
const btnVaciar = document.querySelector('#boton-vaciar');

//hace la estructura html para mostrar los productos disponibles en la pagina que estan guardados en el archivo JSON
function mostrarProductos() {
    let productosHTML = '';
    pizzas.forEach(pizza => {
        productosHTML += `
            <div class="col-sm-3 productos">
                <div class="card">
                    <img class="card-img-top" src="${pizza.imagen}">
                    <figcaption class="card-title text-center">${pizza.nombre}</figcaption>
                    <p class="card-text text-center">${moneda}${pizza.precio}</p>
                    <button class="btn btn-primary" marcador="${pizza.id}" onclick="agregarCarrito(event)">Agrega al carrito</button>
                </div>
            </div>
        `;
    });
    productos.innerHTML = productosHTML;
}

// Utilizo fetch para obtener el array de pizzas desde un archivo JSON
let pizzas = [];
fetch('./db/db.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener las pizzas');
        }
        return response.json();
    })
    .then(data => {
        pizzas = data;
        mostrarProductos();
    })
    .catch(error => {
        console.error('Error:', error);
    });
    

//funcion para agregar el producto deseado al carrito
function agregarCarrito(e) {
    carrito.push(e.target.getAttribute('marcador'))
    actualizarCarrito();
    guadarLS();
}

//actualiza la visualizacion del carrito con los productos seleccionados.
function actualizarCarrito() {
    compra.textContent = '';
    // Obtener elementos únicos del carrito para evitar duplicados
    const elementoUnico = [...new Set(carrito)];
    // Filtrar la pizza correspondiente al item del carrito
    elementoUnico.forEach((item) => {
        const pizza = pizzas.filter((elementoPizza) => {
            return elementoPizza.id === parseInt(item);
        });
        // Contador de los productos para mostrar la cantidad en el carrito
        const contador = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creo la lista que contiene las pizzas seleccionadas
        const lista = document.createElement('li');
        lista.classList.add('list-group-item', 'text-right', 'mx-2');
        lista.textContent = `${contador} x ${pizza.nombre} - ${moneda} ${pizza.precio}`;
        // // Crear botón de borrar para eliminar el item del carrito
        const boton = document.createElement('button');
        boton.classList.add('btn', 'btn-danger', 'mx-5');
        boton.textContent = '❌';
        boton.style.marginLeft = '2rem';
        boton.dataset.item = item;
        boton.addEventListener('click', borrarItemCarrito);
        // Agregar el botón de borrar a la lista de items
        lista.appendChild(boton);
        // Agregar la lista al contenedor de compras
        compra.appendChild(lista);
    });

    total.textContent = totalCompra();
}

//elimina un producto cuando hace click en el boton de eliminar
function borrarItemCarrito(e) {
    const id = e.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    actualizarCarrito();
    guadarLS()
}

// Calcula el total de la compra sumando los precios de los productos en el carrito
function totalCompra() {
    return carrito.reduce((total, item) => {
        const miItem = pizzas.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        //suma al total
        return total + miItem.precio;
    }, 0).toFixed(2);
}

//elimina el carrito dando a enteder que finalizo la compra
function vaciarCarrito() {
    carrito != "" ? pedidoCompleto() : pedidoIncompleto();
    carrito = [];
    actualizarCarrito();
    guadarLS()
}

// Escucha el clic en el botón para vaciar el carrito
btnVaciar.addEventListener('click', vaciarCarrito);

// Guarda el estado actual del carrito en el almacenamiento local del navegador
const guadarLS = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


actualizarCarrito()


//Barra buscadora de productos.
document.addEventListener("keyup", (e) => {
    if (e.target.matches(".filtro")) {
        document.querySelectorAll(".productos").forEach((carta) => {
            carta.textContent.toLocaleLowerCase().includes(e.target.value) ? carta.classList.remove("filter") : carta.classList.add("filter");
        })
    }
    if (e.key === "escape") {
        e.target.value = "";
    }
}
)

//funciones de alert con sweet alert.
function pedidoIncompleto() {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tu carrito esta vacio!",
    });
}

function pedidoCompleto() {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Tu pedido se esta dirigiendo a:",
        showConfirmButton: false,
        timer: 1500
    });
}


