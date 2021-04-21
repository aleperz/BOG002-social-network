import { Router } from "./views_templates/router.js";
import { routes } from "./views_templates/routes.js";
import { ViewButton } from "./components/Button_component.js";
import { InputGroup } from "./components/Input_component.js";
import { Header } from "./components/header_components.js";
import { ActionButton } from "./components/Button_action_component.js";
// import firebase from "./firebase/index.js";
import { AutenticationFirebase } from "./firebase/authentication.js";

const router = new Router(routes);
const auth = new AutenticationFirebase();
// const nameRegister = document.getElementById("name-register");
// const passRegister = document.getElementById("pass-Register");
customElements.define("button-view", ViewButton);
customElements.define("input-group", InputGroup);
customElements.define("header-general", Header);
customElements.define("button-action", ActionButton);

const toLogin = () => {
  const btnLogin = document.getElementById("btn-login");
  btnLogin.addEventListener("click", () => {
    const emailLogin = document.getElementById("email-login").value;
    const passLogin = document.getElementById("pass-login").value;
    auth.authEmailPass(emailLogin, passLogin);
  });
};

const toRegister = () => {
  const btnRegister = document.getElementById("btn-Register");
  btnRegister.addEventListener("click", () => {
    const emailRegister = document.getElementById("email-register").value;
    const passRegister = document.getElementById("pass-register").value;
    const nameRegister = document.getElementById("name-register").value;
    auth.createAccountEmailPass(emailRegister, passRegister, nameRegister);
  });
};

const changeObserver = new MutationObserver((mutaciones) => {
  const currentRoute = window.location.hash;
  if (mutaciones[0].type === "childList") {
    switch (currentRoute) {
      case "#login":
        toLogin();
        break;
      case "#register":
        toRegister();
        break;
      default:
        break;
    }
  }
});

const root = document.getElementById("root");
changeObserver.observe(root, {
  childList: true,
});
