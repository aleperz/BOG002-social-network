import { Router } from "./views_templates/router.js";
import { routes } from "./views_templates/routes.js";
import { ViewButton } from "./components/Button_component.js";
import { InputGroup } from "./components/Input_component.js";
import { Header } from "./components/header_components.js";
import { ActionButton } from "./components/Button_action_component.js";
import { NotificacionToast } from "./components/notification_toast.js";
// import firebase from "./firebase/index.js";
import { AutenticationFirebase } from "./firebase/authentication.js";

const router = new Router(routes);
const auth = new AutenticationFirebase();
customElements.define("button-view", ViewButton);
customElements.define("input-group", InputGroup);
customElements.define("header-general", Header);
customElements.define("button-action", ActionButton);
customElements.define("notification-toast", NotificacionToast);

// const toNotificationToast = () =>{
//   const notification = document.getElementById("")
// }

const toLoginGoogle = () => {
  const btnGoogle = document.getElementById("btn-google");
  btnGoogle.addEventListener("click", () => {
    console.log("clic en  google");
    auth.authCuentaGoogle();
  });
};

const signOut = () => {
  const btnClose = document.getElementById("close");
  btnClose.addEventListener("click", () => {
    auth.signOutSesion();
  });
};

const toLogin = () => {
  const btnLogin = document.getElementById("btn-login");
  toLoginGoogle();
  signOut();
  btnLogin.addEventListener("click", () => {
    const emailLogin = document.getElementById("email-login").value;
    const passLogin = document.getElementById("pass-login").value;
    auth
      .authEmailPass(emailLogin, passLogin)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

const toRegister = () => {
  const btnRegister = document.getElementById("btn-Register");
  btnRegister.addEventListener("click", () => {
    console.log("registro");
    const emailRegister = document.getElementById("email-register").value;
    const passRegister = document.getElementById("pass-register").value;
    const nameRegister = document.getElementById("name-register").value;
    auth.createAccountEmailPass(emailRegister, passRegister, nameRegister);
  });
};

const toResetPass = () => {
  const btnResetPass = document.getElementById("btn-resetpass");
  btnResetPass.addEventListener("click", () => {
    const emailUser = document.getElementById("email-user").value;
    auth.ressetPass(emailUser);
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
      case "#reset-pass":
        toResetPass();
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
