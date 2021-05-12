export const login = `
<header-general></header-general>
<section class="register-login-container">
    <img src="./img/img-login.svg"/>
    <div class="container-form">
     <h2>Bienvenido !</h2>
     <button-action class="secondary" id="btn-google"><img src="./img/google-icon.svg" style="width: 20px; margin-right: 5px;" slot="image"/><span slot="title">Continuar con Google</span></button-action> 
     <hr class="divider"/>
     <input-group type="email" placeholder="Ingrese su correo" id="email-login" class="x"><span slot="title">Correo electrónico:</span></input-group>
     <input-password id="pass-login"><span slot="title">Contraseña:</span></input-password>
     <label><input type="checkbox"> Recuerdame </label>
     <button-action class="primary" id="btn-login"><span slot="title">Iniciar sesión</span></button-action>  
     <button-view id="go-register" class="btn-underline"><span slot="title">¿No tienes cuenta?Regístrate</span></button-view>
     <button-view id="go-resetpass" class="btn-underline"><span slot="title">¿Olvide la contraseña?</span></button-view>
     </div>
    <notification-toast class="error" id="error-toast"><img src="./img/errorIcon.svg" slot="image"/><span slot="title">Error</span></notification-toast>
</section>`;
