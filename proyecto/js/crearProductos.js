const categorias = [{
    nombre: "Natacion",
    id: "natacion"
}, {
    nombre: "Gimnasio",
    id: "gimnasio"
},{
    nombre: "Padel",
    id: "padel"
}
];

const productosIniciales = [
    // Natacion
    {
        id: "Natacion-01",
        titulo: "Antiparra + gorro",
        imagen: "../img.p/antiparraPn.jpg",
        categoria: {
            nombre: "Natacion",
            id: "natacion"
        },
        precio: 10000
    },
    {
        id: "Natacion-02",
        titulo: "Malla Hombre",
        imagen: "../img.p/mallahombrePn.jpg",
        categoria: {
            nombre: "Natacion",
            id: "natacion"
        },
        precio: 15000
    },
    {
        id: "Natacion-03",
        titulo: "Malla Mujer",
        imagen: "../img.p/MallamujerPN.jpg",
        categoria: {
            nombre: "Natacion",
            id: "natacion"
        },
        precio: 20000
    },
    {
        id: "Natacion-04",
        titulo: "Bolso Natacion",
        imagen: "../img.p/bolsoPn.jpg",
        categoria: {
            nombre: "Natacion",
            id: "natacion"
        },
        precio: 15000
    },


    // GYM
    {
        id: "gym-01",
        titulo: "Campera Hombre",
        imagen: "../img.p/CamperaHombrePg.jpg",
        categoria: {
            nombre: "Gimnasio",
            id: "gimnasio"
        },
        precio: 80000
    },
    {
        id: "gym-02",
        titulo: "Conjunto deportivo mujer",
        imagen: "../img.p/conjunto deportivo mujer.jpg",
        categoria: {
            nombre: "Gimnasio",
            id: "gimnasio"
        },
        precio: 40000
    },
    {
        id: "gym-03",
        titulo: "Remera Hombre",
        imagen: "../img.p/remeraPG.webp",
        categoria: {
            nombre: "Gimnasio",
            id: "gimnasio"
        },
        precio: 6000
    },
    {
        id: "gym-04",
        titulo: "Pantalon Hombre",
        imagen: "../img.p/pantalonHombrePG.webp",
        categoria: {
            nombre: "Gimnasio",
            id: "gimnasio"
        },
        precio: 25000
    },
    {
        id: "gym-05",
        titulo: "Campera mujer",
        imagen: "../img.p/CamperamujerPg.jpg",
        categoria: {
            nombre: "Gimnasio",
            id: "gimnasio"
        },
        precio: 70000
    },

    // Padel
    {
        id: "padel-01",
        titulo: "Paleta",
        imagen: "../img.p/paletaPp.jpg",
        categoria: {
            nombre: "Padel",
            id: "padel"
        },
        precio: 35000
    },
    {
        id: "padel-02",
        titulo: "Paleta",
        imagen: "../img.p/paletaPp.webp",
        categoria: {
            nombre: "Padel",
            id: "padel"
        },
        precio: 40000
    },
    {
        id: "padel-03",
        titulo: "Pelotas padel 3",
        imagen: "../img.p/PelotasPadelPp.jpg",
        categoria: {
            nombre: "Padel",
            id: "padel"
        },
        precio: 20000
    },
    {
        id: "padel-04",
        titulo: "Bolso de  Paleta Padel",
        imagen: "../img.p/bolsoPadel.jpg",
        categoria: {
            nombre: "Padel",
            id: "padel"
        },
        precio: 60000
    }
];


let productosCreados = localStorage.getItem("productos");
//En caso que no haya productos creados, se crean los productos iniciales
if(productosCreados){
    productosCreados = JSON.parse(productosCreados);
}
else {
    productosCreados = productosIniciales
}

function validar() {
    //llamo  las funciones creadas  para validar los campos 
    const id = document.getElementById("id").value
    const titulo = document.getElementById("titulo").value
    const imagen = document.getElementById("imagen").value
    const pricing = document.getElementById("pricing").value
    const categoriaInput = document.getElementById("categoria").value

    const camposObligatorios = datosObligatorios();
    const camposValidos = validarCampos();

    // console.log({camposObligatorios, camposValidos});

    if (camposObligatorios && camposValidos) {
        const categoria = categorias.find(categoria => categoria.id === categoriaInput);
        const producto = {
            id: id,
            titulo: titulo,
            imagen: imagen,
            precio: pricing,
            categoria: {
                id: categoria.id,
                nombre: categoria.nombre,
            }
        }
        productosCreados.push(producto);
        localStorage.setItem("productos", JSON.stringify(productosCreados));
        alert("Producto creado con exito");
        limpiarFormulario()
    }

}

// Todos son datos obligatorios menos las observaciones.
function datosObligatorios() {
    //hago un arreglo de objetos con el id del html , algo parecido a array asociativo
    let valido = true;
    const arrInputs = [
        "id",
        "titulo",
        "imagen",
        "pricing",
        "categoria",
    ];
    //recorro el arreglo 
    arrInputs.forEach(inputId => {
        const element = document.getElementById(inputId);
        // si el elemento esta vacio cambia de color el input 
        if (!element.value) {
            element.style.backgroundColor = "#ff002030";
            element.style.border = "2px solid red";
            valido = false
        } else {
            element.style.backgroundColor = "#74ef7a40";
            element.style.border = "none";
        }
    });

    return valido;
}

function validarCampos() {
    const id = validarId();
    const titulo = validarTitulo();
    const categoria = validarCategoria();

    if(id && titulo && categoria){
        return true
    }else {
        return false
    }
}

function validarId(){
    let validar = true
    const id = document.getElementById("id")
    const idValue = document.getElementById("id").value
    //Busca en los productos existentes si el id ya existe
    const productoYaExiste = productosCreados.find(producto => producto.id === idValue);
    if(!idValue || productoYaExiste){
        id.style.backgroundColor = "#ff002030"
        validar = false
    }else{
        id.style.backgroundColor = "#74ef7a40";
        id.style.border = "none";
    }
    return validar
}

function validarTitulo(){
    let validar = true
    const titulo = document.getElementById("titulo")
    const tituloValue = document.getElementById("titulo").value
    //Busca en los productos existentes si el titulo ya existe
    const productoYaExiste = productosCreados.find(producto => producto.titulo === tituloValue);
    
    if(!tituloValue || productoYaExiste){
        titulo.style.backgroundColor = "#ff002030"
        validar = false
    }else{
        titulo.style.backgroundColor = "#74ef7a40";
        titulo.style.border = "none";
    }
    return validar
}

function validarCategoria(){
    let validar = true
    const categoriaInput = document.getElementById("categoria")
    const categoriaInputValue = document.getElementById("categoria").value
    //Busca en los productos existentes si el id ya existe
    const categoriaExiste = categorias.find(categoria => categoria.id === categoriaInputValue);
    if(!categoriaInputValue || !categoriaExiste){
        categoriaInput.style.backgroundColor = "#ff002030"
        validar = false
    }else{
        categoriaInput.style.backgroundColor = "#74ef7a40";
        categoriaInput.style.border = "none";
    }
    return validar
}

function limpiarFormulario(){
    const id = document.getElementById("id")
    const titulo = document.getElementById("titulo")
    const imagen = document.getElementById("imagen")
    const pricing = document.getElementById("pricing")
    const categoria = document.getElementById("categoria")
    //limpio los campos del formulario
    id.value = ""
    id.style.border = "1px solid #ddd"
    id.style.backgroundColor = "#fff";
    titulo.value = ""
    titulo.style.border = "1px solid #ddd"
    titulo.style.backgroundColor = "#fff";
    imagen.value = ""
    imagen.style.border = "1px solid #ddd"
    imagen.style.backgroundColor = "#fff";
    pricing.value = ""
    pricing.style.border = "1px solid #ddd"
    pricing.style.backgroundColor = "#fff";
    categoria.value = ""
    categoria.style.border = "1px solid #ddd"
    categoria.style.backgroundColor = "#fff";
}