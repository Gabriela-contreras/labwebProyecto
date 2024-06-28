
const footer = `<div class="footer">
        <h2>Nuestras redes sociales </h2>
        <div class="divRedes">
            <a href="https://www.instagram.com/complejo.centerr/"  target="_blank"><img src="../img.p/instagram (1).png" alt=""  class="redSocial"></i></a>
            <a href="https://www.facebook.com/centercomplejo/" target="_blank"><img src="../img.p/facebook.png" alt="" class="redSocial"></a>
            <a href="https://www.facebook.com/messages/t/853716121363489" target="_blank"><img src="../img.p/mensajero.png" alt="" class="redSocial"></a>

        </div>
    </div>`


const header = `<div id="menu">
        <img src="../img.p/logoCenter.jpg" alt="" class="imglogo">

        <ul>
            <li><a href="../html/index.html">Inicio</a></li>
            <li><a href="../html/login.html">Ingresar</a></li>

            <li>
                <a href="../html/Compra.html">Shop</a>
            </li>
            <li><a
                    href="../html/inscripcion.html">Inscripcion</a>
            </li>
        </ul>

    </div>`

    //creo un evento que se ejecuta cuando el dom esta cargado
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('footer').innerHTML = footer;
    document.getElementById('header').innerHTML = header;
    //agrego los estilos al head
    document.querySelector("head").innerHTML += `
    <link rel="stylesheet" href="../css/menu.css"> 
    <link rel="stylesheet" href="../css/footer.css">
    `;
});