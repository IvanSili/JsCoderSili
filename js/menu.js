const pizzas = [
    {
        img: "./media/muzzarella.png",
        nombre: "muzzarella",
        precio: 5000,
        id: 1,
    },
    {
        img: "./media/napolitana.png",
        nombre: "napolitana",
        precio: 5200,
        id: 2,
    },
    {
        img: "./media/cebolla.png",
        nombre: "cebolla",
        precio: 5100,
        id: 3,
    },
    {
        img: "./media/jamon.png",
        nombre: "Jamon",
        precio: 5500,
        id: 4,
    },
    {
        img: "./media/especial.png",
        nombre: "Especial",
        precio: 5900,
        id: 5,
    },
    {
        img: "./media/rucula.png",
        nombre: "Rucula",
        precio: 6200,
        id: 6,
    },
    {
        img: "./media/cantimpalo.png",
        nombre: "Cantimpalo",
        precio: 5800,
        id: 7,
    },
    {
        img: "./media/palmitos.png",
        nombre: "Palmitos",
        precio: 6500,
        id: 8,
    },
]


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const moneda = '$';
const productos = document.querySelector('#productos');
const compra = document.querySelector('#carrito');
const total = document.querySelector('#total');
const btnVaciar = document.querySelector('#boton-vaciar');

//hace la estructura html para mostrar los productos disponibles en la pagina que estan guardados en el archivo JSON
const mostrarProductos = (arr) => {
    productos.innerHTML = "";
    let html = '';
    for (const item of arr) {
        const { id, nombre, img, precio } = item;
        html += `
            <div class="col-sm-3 productos">
                <div class="card">
                    <img class="card-img-top" src="${img}">
                    <figcaption class="card-title text-center">${nombre}</figcaption>
                    <p class="card-text text-center">${moneda}${precio}</p>
                    <button class="btn btn-primary" marcador="${id}" onclick="agregarCarrito(event)">Agrega al carrito</button>
                </div>
            </div>
        `;
    };
    productos.innerHTML = html;

    //fetch
    fetch('https://fakestoreapi.com/products?limit=7')
        .then(res => res.json())
        .then(data => {
            data.forEach(products => {
                const { image, title, price, id } = products; // Accede a los datos del producto
                const div = document.createElement("div");
                div.className = "col-sm-3 productos";
                const divdos = document.createElement("div");
                divdos.className = "card";
                divdos.innerHTML = `
                    <img class="card-img-top" src="${image}">
                    <figcaption class="card-title text-center">${title}</figcaption>
                    <p class="card-text text-center">${price}</p>
                    <button class="btn btn-primary" marcador="${id}" onclick="agregarCarrito(event)">Agrega al carrito</button>
                `;
                div.appendChild(divdos); // Agrega el divdos al div principal
                document.getElementById("productos").appendChild(div); // Agrega el div al contenedor en el DOM
            });
        });
}


const pedirServicios = (arr) => {
    //Instanciar promesa
    return new Promise((resolve, reject) => {
        productos.innerHTML = `
        <div class="carga">
        <div class="spinner-grow text-light" style="width: 17rem; height: 17rem;" role="status">
        <span class="sr-only"></span>
        </div>
        </div>
        `
        setTimeout(() => {
            if (arr) {
                resolve(arr);
            } else {
                reject("error de datos");
            }
        }, 2500);
    });
};

pedirServicios(pizzas)
    .then((respuesta) => {
        product = respuesta;;
        mostrarProductos(product);
        
    })
    .catch((error) => {
        console.error('Error:', error);
    });
let product = [];


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
        return total + miItem[0].precio;
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
        title: "¡Tu pedido esta en camino!",
        showConfirmButton: false,
        timer: 1500
    });
}