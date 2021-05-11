import { Router } from "../router/router.js";
import { routes } from "../router/routes.js";
import { AutenticationFirebase } from "../firebase/authentication.js";

const router = new Router(routes);
const auth = new AutenticationFirebase();

export const toHome = () => {
  const btnLogin = document.getElementById("btn-login");
  const btnRegister = document.getElementById("btn-register");
  btnLogin.addEventListener("click", () => router.loadRoute("login"));
  btnRegister.addEventListener("click", () => router.loadRoute("register"));
};

export const toLoginGoogle = () => {
  const btnGoogle = document.getElementById("btn-google");
  const provider = new firebase.auth.GoogleAuthProvider();
  btnGoogle.addEventListener("click", () => {
    auth.authCuentaGoogle(provider);
  });
};
