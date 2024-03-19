const pizzas = [
    {
        imagen: "../media/muzzarella.png",
        nombre: "muzzarella",
        precio: 5000,
        id: 1,
    },
    {
        imagen: "../media/napolitana.png",
        nombre: "napolitana",
        precio: 5200,
        id: 2,
    },
    {
        imagen: "../media/cebolla.png",
        nombre: "cebolla",
        precio: 5100,
        id: 3
    },
    {
        imagen: "../media/jamon.png",
        nombre: "Jamon",
        precio: 5500,
        id: 4
    },
    {
        imagen: "../media/especial.png",
        nombre: "Especial",
        precio: 5900,
        id: 5
    },
    {
        imagen: "../media/rucula.png",
        nombre: "Rucula",
        precio: 6200,
        id: 6,
    },
    {
        imagen: "../media/cantimpalo.png",
        nombre: "Cantimpalo",
        precio: 5800,
        id: 7,
    },
    {
        imagen: "../media/palmitos.png",
        nombre: "Palmitos",
        precio: 6500,
        id: 8
    },
]

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const moneda = '$';
const productos = document.querySelector('#productos');
const compra = document.querySelector('#carrito');
const total = document.querySelector('#total');
const btnVaciar = document.querySelector('#boton-vaciar');

//Crea la estructura html para mostrar los productos disponibles en la pagina
function mostrarProductos() {
    let productosHTML = '';
    pizzas.forEach(pizza => {
        productosHTML += `
            <div class="col-sm-3 productos">
                <div class="card">
                    <img class="card-img-top" src="${pizza.imagen}">
                    <h5 class="card-title text-center">${pizza.nombre}</h5>
                    <p class="card-text text-center">${pizza.precio}${moneda}</p>
                    <button class="btn btn-primary" marcador="${pizza.id}" onclick="agregarCarrito(event)">Agrega al carrito</button>
                </div>
            </div>
        `;
    });
    productos.innerHTML = productosHTML;
}

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
        lista.textContent = `${contador} x ${pizza[0].nombre} - ${moneda} ${pizza[0].precio}`;
        // // Crear botón de borrar para eliminar el item del carrito
        const boton = document.createElement('button');
        boton.classList.add('btn', 'btn-danger', 'mx-5');
        boton.textContent = 'X';
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
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

//eliminar productos que estaban guardados
function vaciarCarrito() {
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


mostrarProductos();
actualizarCarrito()