import { Router } from "./views_templates/router.js";
import { routes } from "./views_templates/routes.js";
import { ViewButton } from "./components/Button_component.js";
import { InputGroup } from "./components/Input_component.js";
import { InputPassword } from "./components/Input_password.js";
import { Header } from "./components/header_components.js";
import { ActionButton } from "./components/Button_action_component.js";
import { NotificacionToast } from "./components/notification_toast.js";
// import firebase from "./firebase/index.js";
import { AutenticationFirebase } from "./firebase/authentication.js";

const router = new Router(routes);
const auth = new AutenticationFirebase();
customElements.define("button-view", ViewButton);
customElements.define("input-group", InputGroup);
customElements.define("input-password", InputPassword);
customElements.define("header-general", Header);
customElements.define("button-action", ActionButton);
customElements.define("notification-toast", NotificacionToast);

const toLoginGoogle = () => {
  const btnGoogle = document.getElementById("btn-google");
  btnGoogle.addEventListener("click", () => {
    auth.authCuentaGoogle();
  });
};

const signOut = () => {
  const btnClose = document.getElementById("close");
  btnClose.addEventListener("click", () => {
    auth.signOutSesion();
  });
};

const printToatsError = (messageError) => {
  const toastError = document.getElementById("error-toast");
  const toastErrorSpan = toastError.shadowRoot.querySelector("span");
  toastErrorSpan.textContent = messageError;
  toastError.shadowRoot.querySelector("div").classList.add("show");
};

const printToatsDone = (messageDone) => {
  const toastError = document.getElementById("done-toast");
  const toastErrorSpan = toastError.shadowRoot.querySelector("span");
  toastErrorSpan.textContent = messageDone;
  toastError.shadowRoot.querySelector("div").classList.add("show");
};

const getErrorFirebase = (error, ...input) => {
  let messageError;
  switch (error.code) {
    case "auth/argument-error":
      if (input.length > 1) {
        messageError = "Debe ingresar correo y contraseña";
        input[0].classList.add("error");
        input[1].classList.add("error");
      } else input[0].classList.add("error");
      messageError = "Debe ingresar correo";
      break;
    case "auth/invalid-email":
      messageError = "Correo invalido";
      input[0].classList.add("error");
      break;
    case "auth/wrong-password":
      messageError = "Contraseña invalida si no la recuerda haga clik en restablecer";
      input[1].classList.add("error");
      break;
    case "verificacion":
      messageError = "por favor realizar verificacion del correo";
      input[0].classList.add("error");
      break;
    case "auth/email-already-in-use":
      messageError = "Correo ya esta registrado";
      input[0].classList.add("error");
      break;
    case "auth/weak-password":
      messageError = "La contraseña debe tener minino 6 caracteres ";
      input[1].classList.add("error");
      break;
    case "wrong/name":
      messageError = "Debes ingresar tu nombre";
      input[0].classList.add("error");
      break;
    case "auth/user-not-found":
      messageError = "El correo no esta registrado";
      input[0].classList.add("error");
      break;
    default:
      messageError = "Ha ocurrido un error inesperado";
      break;
  }
  printToatsError(messageError);
};
const toLogin = () => {
  const btnLogin = document.getElementById("btn-login");
  toLoginGoogle();
  signOut();
  btnLogin.addEventListener("click", () => {
    const emailLogin = document.getElementById("email-login");
    const passLogin = document.getElementById("pass-login");
    const inputEmail = emailLogin.shadowRoot.querySelector("input");
    const inputPass = passLogin.shadowRoot.querySelector("input");
    inputEmail.classList.remove("error");
    inputPass.classList.remove("error");
    auth
      .authEmailPass(emailLogin.value, passLogin.value)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        getErrorFirebase(error, inputEmail, inputPass);
      });
  });
};

const toRegister = () => {
  toLoginGoogle();
  const btnRegister = document.getElementById("btn-Register");
  const emailRegister = document.getElementById("email-register");
  const passRegister = document.getElementById("pass-register");
  const nameRegister = document.getElementById("name-register");
  const inputEmail = emailRegister.shadowRoot.querySelector("input");
  const inputPass = passRegister.shadowRoot.querySelector("input");
  const inputName = nameRegister.shadowRoot.querySelector("input");
  btnRegister.addEventListener("click", () => {
    inputEmail.classList.remove("error");
    inputPass.classList.remove("error");
    inputName.classList.remove("error");
    if (!nameRegister.value) {
      const error = { code: "wrong/name" };
      getErrorFirebase(error, inputName);
      return;
    }
    auth
      .createAccountEmailPass(
        emailRegister.value,
        passRegister.value,
        nameRegister.value,
      )
      .then((result) => {
        const messageDone = `${result}, estas a un paso de ser parte de EcoIdeate, verifica tu correo`;
        printToatsDone(messageDone);
      })
      .catch((error) => getErrorFirebase(error, inputEmail, inputPass));
  });
};

const toResetPass = () => {
  const btnResetPass = document.getElementById("btn-resetpass");
  btnResetPass.addEventListener("click", () => {
    const emailUser = document.getElementById("email-user");
    const inputEmail = emailUser.shadowRoot.querySelector("input");
    inputEmail.classList.remove("error");
    auth
      .ressetPass(emailUser.value)
      .then((result) => printToatsDone(result))
      .catch((error) => getErrorFirebase(error, inputEmail));
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
      case "":
        toLoginGoogle();
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
toLoginGoogle();
