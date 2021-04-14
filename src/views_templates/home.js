function myFunction() {
  window.history.pushState({}, 'done', '/#login');
}
export const home = `
<button-main class="primary" idx="${myFunction()}"><span slot="title">Iniciar sesion</span></button-main>
<button-main class="secondary" id="btn-secondary"><span slot="title">Registrarse</span></button-main>`;
