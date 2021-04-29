export const resetPass = `
<header-general></header-general>
<section class="resetpass-container">
     <div class="container-form">
        <h2>Restablecer Contraseña</h2>
        <input-group type="email" placeholder="Ingrese su correo" id="email-user"><span slot="title">Correo electronico:</span></input-group>
        <button-action class="primary" id="btn-resetpass"><span slot="title">Enviar</span></button-action>
        <button-view id="back-login" class="btn-underline"><span slot="title">Volver al inicio</span></button-view>  
        <notification-toast class="error" id="error-toast"><img src="./img/errorIcon.svg" slot="image"/><span slot="title">Error</span></notification-toast>
        <notification-toast class="done" id="done-toast"><img src="./img/doneIcon.svg" slot="image"/><span slot="title">Bien hecho !</span></notification-toast>
    </div>
</section>`;
