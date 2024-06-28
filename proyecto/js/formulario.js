
function validar() {
    console.log("Formulario cargado");

    //obtengo los valores de los input
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let email = document.getElementById('email').value;
    let direccion = document.getElementById('direccion').value;
    let telefono = document.getElementById('telefono').value;
    let dni = document.getElementById('dni').value;
    let deporte = document.getElementById('deporte').value;
    let dia = document.getElementById('dia').value;
    let mes = document.getElementById('mes').value;
    let anio = document.getElementById('anio').value;
    let altura = document.getElementById('altura').value;

    //llamo  las funciones creadas  para validar los campos 


    let datos = datosObligatorios();
    let apellidoVal = validarApellido(apellido);
    let nombreVal = validarNombre(nombre);
    let emailVal = validarEmail(email);
    let dniVal = validarDni(dni);
    let telVal = validarTelefono(telefono);
    let direccionVal = validarDireccion(direccion);
    validarFecha(dia, mes, anio);
    validarAltura(altura)

    //si los datos son validos y los campos estan completos guardo los datos en el localstorage
    if (datos && apellidoVal && nombreVal && emailVal && dniVal && telVal && direccionVal) {
        guardarDatos({ nombre, apellido, email, direccion, telefono, dni, deporte });
        alert("Formulario enviado correctamente");
        limpiarFormulario();
    }

}


//valido nombre 
function validarNombre(nombre) {
    // el es valido es para otra funcion creada 
    let esValido = true;
    let input = document.getElementById("nombre");
    //si nombre no esta vacio y no es un numero
    if (nombre != "" && isNaN(nombre)) {
        input.style.backgroundColor = "#74ef7a40";
        input.style.border = "none";
    } else if (!isNaN(nombre)) {
        esValido = false;
        input.style.backgroundColor = "#ff002030"

    }
    return esValido;
}
//valido apellido

function validarApellido(apellido) {
    let esValido = true;
    //guardo input de apellido para desp poder pintalo de colores 
    let input = document.getElementById("apellido");
    //comparo que no este mal escrito 

    if (isNaN(apellido)) {
        input.style.backgroundColor = "#74ef7a40";
        input.style.border = "none";
        esValido = true;
    } else if (!isNaN(apellido)) {
        input.style.backgroundColor = "#ff002030"
        esValido = false;
    }
    return esValido;
}

// Validar la estructura de un mail - considerar el dominio, los caracteres a ingresar, los símbolos que debe tener.
function validarEmail(email) {
    let esValido = true;
    //guardo el input email para desp poder pintarlo de colores
    let inputEmail = document.getElementById("email");
    //expresion regular para validar email
    const validar = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (validar.test(email)) {
        inputEmail.style.backgroundColor = "#74ef7a40";
        inputEmail.style.border = "none";

    } else {
        inputEmail.style.backgroundColor = "#ff002030";
        esValido = false;

    }
    return esValido;
}


function validarFecha(dia, mes, anio) {
    let esValido = true;
    let diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (anio % 4 == 0 && anio % 100 != 0) {
        diasPorMes[1] = 29;
        //anio bisiestos
    }
    const inputDia = document.getElementById("anio");
    const inputMes = document.getElementById("mes");
    const inputAnio = document.getElementById("dia");
    // let mesArreglo = parseInt(mes) - 1;
    const numAnio = parseInt(anio);
    let numMes = parseInt(mes);
    let numDia = parseInt(dia);


    // diasPorMes.forEach(day => {

    //creo constantes para validar
    const mesValido = numMes >= 1 && numMes <= 12;
    // const anioValido = numAnio > 1924;//ese es el anio minimo la persona tiene 100 anios
    const diaValido = numDia >= 1 && numDia <= diasPorMes[numMes - 1];
    const AnioValido = numAnio >= 1924 && numAnio <= 2024;
    //si es un anio valido y un mes valido y un dia valido pinto los input de verde
    if (AnioValido && mesValido && diaValido) {
        inputAnio.style.backgroundColor = "#74ef7a40";
        inputMes.style.backgroundColor = "#74ef7a40";
        inputDia.style.backgroundColor = "#74ef7a40";
        inputAnio.style.border = "none";
        inputDia.style.border = "none";
        inputMes.style.border = "none";
    } else {
        //si no es valido pinto los input de rojo
        inputAnio.style.backgroundColor = "#ff002030";
        inputMes.style.backgroundColor = "#ff002030";
        inputDia.style.backgroundColor = "#ff002030";
        esValido = false;

    }



    //fecha actual 
    const FechaActual = new Date();
    const mesActual = FechaActual.getMonth() + 1;
    const anioActual = FechaActual.getFullYear() >= numAnio

    //comparo si el mes actual es menor al mes ingresado
    const mayorAMes = mesActual < numMes
    //comparo si el mes actual es igual al mes ingresado
    const mesIgual = mesActual === numMes
    //comparo si el dia actual es menor al dia ingresado
    const fechaMayor = FechaActual.getDate() < numDia
    //si el dia es mayor al actual 
    const mayorADia = fechaMayor || mayorAMes || mesIgual && FechaActual.getDate() < numDia;
    if (anioActual && (mayorAMes || mesIgual) && mayorADia) {
        //si la fecha es mayor a la actual pinto de rojo
        inputAnio.style.backgroundColor = "#ff002030";
        inputMes.style.backgroundColor = "#ff002030";
        inputDia.style.backgroundColor = "#ff002030";
        esValido = false;
    }

    return esValido;
}



function validarDni(dni) {
    let esValido = true;
    let inputDni = document.getElementById("dni");
    let dniNum = parseInt(dni);
    if (dni.length == 8 && Number.isInteger(dniNum)) {
        inputDni.style.backgroundColor = "#74ef7a40";
        inputDni.style.border = "none";
    } else {
        inputDni.style.backgroundColor = "#ff002030";
        esValido = false;
    }
    return esValido;
}





function validarDireccion(direccion) {
    let esValido = true;
    let inputDireccion = document.getElementById("direccion");
    if (direccion != "") {
        inputDireccion.style.backgroundColor = "#74ef7a40";
        inputDireccion.style.border = "none";
    } else {
        inputDireccion.style.backgroundColor = "#ff002030";
        esValido = false;
    }
    return esValido;
}

function validarAltura(altura) {
    let inputAltura = document.getElementById("altura");
    if (!isNaN(altura) && altura !== "") {
        inputAltura.style.backgroundColor = "#74ef7a40";
        inputAltura.style.border = "none";
    } else if (altura == "") {
        inputAltura.style.backgroundColor = "#ff002030";
        esValido = false;
    }



}

function validarTelefono(telefono) {
    let esValido = true;
    let inputTelefono = document.getElementById("telefono");
    let numTel = parseInt(telefono);
    if (telefono.length > 9 && telefono.length < 12 && Number.isInteger(numTel)) {
        inputTelefono.style.backgroundColor = "#74ef7a40";
        inputTelefono.style.border = "none";
    } else {
        inputTelefono.style.backgroundColor = "#ff002030";
        esValido = false;
    }
    return esValido;
}






// Todos son datos obligatorios menos las observaciones.
function datosObligatorios() {
    //hago un arreglo de objetos con el id del html , algo parecido a array asociativo
    let valido = true;
    let arrInputs = [{
        id: 'dni'
    }, {
        id: "direccion"

    }, {
        id: 'telefono'

    }, {
        id: 'nombre'

    }, {
        id: 'apellido'

    }, {
        id: 'email'

    }, {
        id: 'deporte'

    }
    ];
    //recorro el arreglo 
    arrInputs.forEach(input => {
        const element = document.getElementById(input.id);
        // si el elemento esta vacio cambia de color el input 
        if (!element.value) {
            element.style.backgroundColor = "#ff002030";
            element.style.border = "2px solid red";
            valido = false
        } else {
            element.style.backgroundColor = "#74ef7a40";
            element.style.border = "none";
            console.log("verde ");
        }
    });

    return valido;
}




function guardarDatos(data) {
    localStorage.setItem("formulario", JSON.stringify(data));
}


function limpiarFormulario() {
    let nombre = document.getElementById('nombre');
    let nombreValor = document.getElementById('nombre').value;

    let apellidoValor = document.getElementById('apellido').value;
    let apellido = document.getElementById('apellido');

    let emailValor = document.getElementById('email').value;
    let email = document.getElementById('email');

    let direccionValor = document.getElementById('direccion').value;
    let direccion = document.getElementById('direccion');

    let telefonoValor = document.getElementById('telefono').value;
    let telefono = document.getElementById('telefono');

    let dniValor = document.getElementById('dni').value;
    let dni = document.getElementById('dni');

    let deporteValor = document.getElementById('deporte').value;
    let deporte = document.getElementById('deporte');

    let diaValor = document.getElementById('dia').value;
    let dia = document.getElementById('dia');

    let mesValor = document.getElementById('mes').value;
    let mes = document.getElementById('mes');

    let anioValor = document.getElementById('anio').value;
    let anio = document.getElementById('anio');

    let alturaValor = document.getElementById('altura').value;
    let altura = document.getElementById('altura');

    nombreValor = ""
    nombre.style.border = "1px solid #ddd"
    nombre.style.backgroundColor = "#fff";

    apellidoValor = ""
    apellido.style.border = "1px solid #ddd"
    apellido.style.backgroundColor = "#fff";

    emailValor = ""
    email.style.border = "1px solid #ddd"
    email.style.backgroundColor = "#fff";


    direccionValor = ""
    direccion.style.border = "1px solid #ddd"
    direccion.style.backgroundColor = "#fff";

    telefonoValor = ""
    telefono.style.border = "1px solid #ddd"
    telefono.style.backgroundColor = "#fff";

    dniValor = ""
    dni.style.border = "1px solid #ddd"
    dni.style.backgroundColor = "#fff";

    deporteValor = ""
    deporte.style.border = "1px solid #ddd"
    deporte.style.backgroundColor = "#fff";

    diaValor = ""
    dia.style.border = "1px solid #ddd"
    dia.style.backgroundColor = "#fff";

    mesValor = ""
    mes.style.border = "1px solid #ddd"
    mes.style.backgroundColor = "#fff";

    anioValor = ""
    anio.style.border = "1px solid #ddd"
    anio.style.backgroundColor = "#fff";

    alturaValor = ""
    altura.style.border = "1px solid #ddd"
    altura.style.backgroundColor = "#fff";
}