// productos
// creo un array de objetos con los productos del carrito
const productos = [
    // Natacion
    {
        id: "Natacion-01",
        titulo: "Antiparra + gorro",
        imagen: "../img.p/antiparraPn.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 10000
    },
    {
        id: "Natacion-02",
        titulo: "Malla Hombre",
        imagen: "../img.p/mallahombrePn.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 15000
    },
    {
        id: "Natacion-03",
        titulo: "Malla Mujer",
        imagen: "../img.p/MallamujerPN.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 20000
    },
    {
        id: "Natacion-04",
        titulo: "Bolso Natacion",
        imagen: "../img.p/bolsoPn.jpg",
        categoria: {
            nombre: "Abrigos",
            id: "abrigos"
        },
        precio: 15000
    },


    // GYM
    {
        id: "gym-01",
        titulo: "Campera Hombre",
        imagen: "../img.p/CamperaHombrePg.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 80000
    },
    {
        id: "gym-02",
        titulo: "Conjunto deportivo mujer",
        imagen: "../img.p/conjunto deportivo mujer.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 40000
    },
    {
        id: "gym-03",
        titulo: "Remera Hombre",
        imagen: "../img.p/remeraPG.webp",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 6000
    },
    {
        id: "gym-04",
        titulo: "Pantalon Hombre",
        imagen: "../img.p/pantalonHombrePG.webp",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 25000
    },
    {
        id: "gym-05",
        titulo: "Campera mujer",
        imagen: "../img.p/CamperamujerPg.jpg",
        categoria: {
            nombre: "Camisetas",
            id: "camisetas"
        },
        precio: 70000
    },

    // Padel
    {
        id: "padel-01",
        titulo: "Paleta",
        imagen: "../img.p/paletaPp.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 35000
    },
    {
        id: "padel-02",
        titulo: "Paleta",
        imagen: "../img.p/paletaPp.webp",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 40000
    },
    {
        id: "padel-03",
        titulo: "Pelotas padel 3",
        imagen: "../img.p/PelotasPadelPp.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 20000
    },
    {
        id: "padel-04",
        titulo: "Bolso de  Paleta Padel",
        imagen: "../img.p/bolsoPadel.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 60000
    }

];
// llamamos los id o clases del DOM html
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-Agregar");
const numerito = document.querySelector("#numerito");
// traigo los productos del local storage
let productosEnCarrito = localStorage.getItem("productos-en-carrito");

if (productosEnCarrito) {
    productosEnCarrito = JSON.parse(productosEnCarrito)
}
// si no hay productos en el carrito se crea un array vacio
if (!productosEnCarrito?.length) {
    productosEnCarrito = [];

}
//cuando se cargue la pagina se ejecuta la funcion buttonActive
document.addEventListener("DOMContentLoaded", buttonActive);


function buttonActive() {
    // Actualiza la cantidad de productos en el carrito
    actualizarNumerito();



    function cargarProductos(productos) {
        //primero va avaciar el carrito y luego va a hacer el foreach de los productos
        contenedorProductos.innerHTML = "";
        // recorro los productos y los muestro en el html
        productos.forEach(producto => {
            // creo un div y le agrego la clase contenedor-productos
            const div = document.createElement("div");
            //le agrego el contenido al div con los datos del producto
            div.classList.add("contenedor-productos");
            div.innerHTML = `
        <img class="producto-img" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-Precio">${producto.precio}</p>
            <button class="producto-Agregar" id="${producto.id}">Agregar</button>
        </div>
        `

            contenedorProductos.append(div);
        });
        // llamamos a la funcion para actualizar los botones de agregar
        actualizarProductosAgregar();

    }

    //recorro los botones de categorias y les agrego un evento click
    botonesCategorias.forEach(boton => {
        boton.addEventListener("click", (e) => {
            botonesCategorias.forEach(boton => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");
            // si el id del boton es distinto a todos va a filtrar los productos por categoria
            if (e.currentTarget.id != "todos") {
                const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
                tituloPrincipal.innerText = productoCategoria.categoria.nombre;
                // el filter va a filtrar los productos por categoria
                const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
                cargarProductos(productosBoton);
                //sino va a mostrar todos los productos
            } else {
                tituloPrincipal.innerText = "Todos los productos ";
                cargarProductos(productos);
            }

        })
    });
    cargarProductos(productos);
}
// funcion para actualizar los botones de agregar
function actualizarProductosAgregar() {
    //guardo en una variable todos los botones de agregar
    botonesAgregar = document.querySelectorAll(".producto-Agregar");
    // recorro los botones y les agrego un evento click
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    });
}


// funcion agregar al carrito que recibe por parametro un evento 
function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    //busco el producto que tiene el id del boton y lo guardo en una variable constante
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    // si el producto ya esta en el carrito le sumo uno a la cantidad
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        // findIndex me devuelve el indice del producto que ya esta en el carrito
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
        //sino le agrego el producto al carrito
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);

    }
    //actualizo el numerito del carrito
    actualizarNumerito();
    //guardo en el local storage los productos en el carrito
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

function actualizarNumerito() {
    let nuevoNum = 0
    productosEnCarrito.forEach(producto => {
        nuevoNum += producto.cantidad;
    });
    //le agrego a numerito el nuevo numeros
    numerito.innerText = nuevoNum;
}