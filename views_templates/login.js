export const login = `
<header-general></header-general>
<section class="register-login-container">
    <img src="/img/img-login.svg"/>
    <div class="container-form">
     <h2>Bienvenido !</h2>
     <button-action class="secondary" id="btn-google"><img src="./img/google-icon.svg" style="width: 20px; margin-right: 5px;" slot="image"/><span slot="title">Continuar con Google</span></button-action> 
     <hr class="divider"/>
     <input-group type="email" placeholder="Ingrese su correo" id="email-login" class="x"><span slot="title">Correo electronico:</span></input-group>
     <input-password id="pass-login"></input-password>
     <label><input type="checkbox"> Recuerdame </label>
     <button-action class="primary" id="btn-login"><span slot="title">Iniciar sesion</span></button-action>  
      <a href="/#register">¿No tienes cuenta? Registrate</a>
     <a href="#reset-pass">¿Olvide la contraseña?</a>
     <button id="close">cerrar secion</button>
    </div>
    <notification-toast class="error" id="error-toast"><img src="./img/errorIcon.svg" slot="image"/><span slot="title">Error</span></notification-toast>
</section>`;
