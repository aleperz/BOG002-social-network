export const updatePass = `
<header-general></header-general>
<section class="resetpass-container">
     <div class="container-form">
        <h2>Actualizar Contraseña</h2>
        <input-password id="oldPas-user"><span slot="title">Ingrese contraseña actual:</span></input-password>
        <input-password id="newPas-user"><span slot="title">Ingrese nueva contraseña:</span></input-password>
        <button-action class="primary" id="btn-update-pass"><span slot="title">Enviar</span></button-action>
        <notification-toast class="error" id="error-toast"><img src="./img/errorIcon.svg" slot="image"/><span slot="title">Error</span></notification-toast>
        <notification-toast class="done" id="done-toast"><img src="./img/doneIcon.svg" slot="image"/><span slot="title">Bien hecho !</span></notification-toast>
    </div>
</section>
<bar-navegation id="bar-navegacion"></bar-navegation>`;
