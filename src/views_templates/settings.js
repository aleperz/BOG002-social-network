export const messages = [
  {
    message: "Reciclar no es una obligación, es TU responsabilidad",
    img: "./img/message1.svg",
  },
  {
    message: "Pienso, luego reciclo",
    img: "./img/message2.svg",
  },
  {
    message: "!Por un mundo en equilibrio, amo conservo y reciclo!",
    img: "./img/message3.svg",
  },
  {
    message: "Yo reciclo, tú reciclas, él recicla, nosotros reciclamos, vosotros recicláis,…….. ellos reciclarán",
    img: "./img/message4.svg",
  },
  {
    message: "Procuremos siempre que  nuestros actos dejen una huella verde en nuestro camino",
    img: "./img/message5.svg",
  },
  {
    message: "Peinsa en verde, piensa en reciclar",
    img: "./img/message6.svg",
  },
  {
    message: "Mil arboles que crecen hacen menos ruido que un arbol que se derrumba",
    img: "./img/message7.svg",
  },
  {
    message: "Si  supiera que el mundo se acaba mañana, yo  hoy todavia plantaria un arbol",
    img: "./img/message8.svg",
  },
  {
    message: "Nadie puede  hacerlo todo pero todos podemos hacer algo",
    img: "./img/message9.svg",
  },
  {
    message: "Dar una mano a la naturaleza vale mucho y cuesta  poco",
    img: "./img/message10.svg",
  },

];

export const settings = `
<header-general></header-general>
<section class="section-setting">
   <div class="menu-settings"> 
    <h1>Menu</h1>
    <div class="container-options">  
        <img src="./img/change_pass.svg" id="img-pass" class="none">
        <button-view id="change-pass" class="btn none"><span slot="title">Cambiar contraseña</span></button-view>
        <img src="./img/info.svg">
        <button-view id="info" class="btn"><span slot="title">Informacion</span></button-view>
        <img src="./img/signout.svg">
        <button-view id="singout" class="btn"><span slot="title">Cerrar sesion</span></button-view>
    </div>
    </div>
    <div class="container-message">
      <img id="img">
      <div id="message"></div>
    </div>
    <bar-navegation id="bar-navegacion"></bar-navegation>
</section>
`;
