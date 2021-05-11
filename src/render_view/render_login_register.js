import { Router } from "../router/router.js";
import { routes } from "../router/routes.js";
import { AutenticationFirebase } from "../firebase/authentication.js";
import { getErrorFirebase, printToatsDone } from "./render_toast.js";

const router = new Router(routes);
const auth = new AutenticationFirebase();

export const toLogin = () => {
  const btnLogin = document.getElementById("btn-login");
  const linkGoregister = document.getElementById("go-register");
  const linkGoResetPass = document.getElementById("go-resetpass");
  btnLogin.addEventListener("click", () => {
    const emailLogin = document.getElementById("email-login");
    const passLogin = document.getElementById("pass-login");
    const inputEmail = emailLogin.shadowRoot.querySelector("input");
    const inputPass = passLogin.shadowRoot.querySelector("input");
    auth
      .authEmailPass(emailLogin.value, passLogin.value)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        getErrorFirebase(error, inputEmail, inputPass);
      });
  });
  linkGoregister.addEventListener("click", () => router.loadRoute("register"));
  linkGoResetPass.addEventListener("click", () => router.loadRoute("reset-pass"));
};

export const toRegister = () => {
  const linkGoLogin = document.getElementById("go-login");
  const btnRegister = document.getElementById("btn-Register");
  const emailRegister = document.getElementById("email-register");
  const passRegister = document.getElementById("pass-register");
  const nameRegister = document.getElementById("name-register");
  const inputEmail = emailRegister.shadowRoot.querySelector("input");
  const inputPass = passRegister.shadowRoot.querySelector("input");
  const inputName = nameRegister.shadowRoot.querySelector("input");
  btnRegister.addEventListener("click", () => {
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
  linkGoLogin.addEventListener("click", () => router.loadRoute("login"));
};

export const toResetPass = () => {
  const btnResetPass = document.getElementById("btn-resetpass");
  const linkBackLogin = document.getElementById("back-login");
  btnResetPass.addEventListener("click", () => {
    const emailUser = document.getElementById("email-user");
    const inputEmail = emailUser.shadowRoot.querySelector("input");
    inputEmail.classList.remove("error");
    auth
      .ressetPass(emailUser.value)
      .then((result) => printToatsDone(result))
      .catch((error) => getErrorFirebase(error, inputEmail));
  });
  linkBackLogin.addEventListener("click", () => router.loadRoute("login"));
};
