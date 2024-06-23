let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);
// creo variables y constantes para los elementos del carrito las llamo del dom y las guardo en variables
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {
    //si hay productos en el carrito
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        // Oculta los elementos de "CarritoVacio" y "CarritoComprado"
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        // Muestra los elementos de "carritoProductos" y "carritoAcciones"
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            //creo un div y le agrego la clase carrito-producto
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            //le agrego el contenido al div con los datos del producto 
            div.innerHTML = `
                <img class="carrito-img" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
            //agrego el div al contenedor de productos del carrito
            contenedorCarritoProductos.append(div);
        })
        
        actualizarBotonesEliminar();
        actualizarTotal();
        //si no hay productos en el carrito muestro el contenedor vacio y oculto los demas
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}
//llamo a la funcion para cargar los productos en el carrito
cargarProductosCarrito();


//funcion para actualizar los botones de eliminar , que elimina productos del carrito
function actualizarBotonesEliminar() {
    //guardo en una variable todos los botones de eliminar
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    //recorro los botones y les agrego un evento click
    botonesEliminar.forEach(boton => {
        //cuando se hace click en un boton de eliminar llamo a la funcion eliminar del carrito
        boton.addEventListener("click", eliminarDelCarrito);
    });
}
//funcion para eliminar un producto del carrito
function eliminarDelCarrito(e) {
    // el currentTarget es el elemento que disparo el evento y el id es el id del elemento
    //osea que cuando hago click en el boton de eliminar el currentTarget es el boton y el id es el id del boton
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    //
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    //guardo en el local storage los productos en el carrito
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}
botonVaciar.addEventListener("click", vaciarCarrito);
//funcion para vaciar el carrito
function vaciarCarrito() {
    //remuevo todos los productos del carrito
    productosEnCarrito.splice(0, productosEnCarrito.length);
    //seteo el local storage con los productos en el carrito
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

//funcion para actualizar el total del carrito
function actualizarTotal() {
    let totalAcumulado = 0 
    productosEnCarrito.forEach(producto => {
        totalAcumulado += producto.precio * producto.cantidad;
    });
    //ESCRIBO EN EL TOTAL EL PRECIO CALCULADO
    total.innerText = `$${totalAcumulado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    //remuevo los productos del carrito
    productosEnCarrito.length = 0;
    //guardo en el local storage los productos en el carrito
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    //actualizo los productos en el carrito
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");


}