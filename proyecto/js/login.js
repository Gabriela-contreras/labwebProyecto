function validar() {

    const usuario = document.getElementById("usuario").value;
    const contrasenia = document.getElementById("contrasenia").value;
    const inputUsuario = document.getElementById("usuario");
    const inputContrasenia = document.getElementById("contrasenia");
    //llamo a las funciones 
    let validoU = validarUsuario(usuario);
    let validoC = validarContrasenia(contrasenia);


    if (validoU && validoC) {

        //cambio el href para que redireccione a la pagina de crear productos
        location.href = "../html/crearProductos.html"
    }
}

function validarUsuario(usuario) {
    let result = false;
    const inputUsuario = document.getElementById("usuario");
    if (usuario !== "" && usuario === "aprobada") {
        inputUsuario.style.backgroundColor = "#74ef7a40"
        inputUsuario.style.border = "none";
        result = true;
    } else {
        inputUsuario.style.backgroundColor = "#ff002030"
        inputUsuario.style.border = "2px solid red";
        result = false;
    }
    return result
}

function validarContrasenia(contrasenia) {
    let result = false;
    const inputContrasenia = document.getElementById("contrasenia");
    if (contrasenia !== "" && contrasenia === "100") {
        inputContrasenia.style.backgroundColor = "#74ef7a40"
        inputContrasenia.style.border = "none";

        result = true;
    } else {
        inputContrasenia.style.backgroundColor = "#ff002030"
        inputContrasenia.style.border = "2px solid red";
    }
    return result;
}