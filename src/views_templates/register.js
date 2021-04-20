export const register = `
<header-general></header-general>
<section class="register-login-container">
    <img src="/img/img-register.svg"/>
    <div class="container-form">
        <h2>Registrate!</h2>
        <button-action class="secondary"><img src="./img/google-icon.svg" style="width: 20px; margin-right: 5px;" slot="image"/><span slot="title">Registrate con Google</span></button-action> 
        <hr class="divider"/>
        <input-group type="text" placeholder="Ingres su nombre"><span slot="title">Nombre:</span></input-group>
        <input-group type="email" placeholder="Ingrese su correo"><span slot="title">Correo electronico:</span></input-group>
        <input-group type="password" placeholder="Ingrese su contraseña"><span slot="title">Contraseña:</span></input-group>
        <button-action class="primary"><span slot="title">Registrate</span></button-action>  
        <a href="/#login">¿Ya tienes cuenta? Inicia sesion</a>
    </div>
</section>`;
