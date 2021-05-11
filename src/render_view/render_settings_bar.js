import { messages } from "../views_templates/settings.js";
import { Router } from "../router/router.js";
import { routes } from "../router/routes.js";
import { AutenticationFirebase } from "../firebase/authentication.js";
import { getErrorFirebase, printToatsDone } from "./render_toast.js";

const router = new Router(routes);
const auth = new AutenticationFirebase();

export const changeViewBarNavegation = () => {
  const barNavegation = document.getElementById("bar-navegacion");
  const btnTimeline = barNavegation.shadowRoot.querySelector(".btn-timeline");
  const btnSettings = barNavegation.shadowRoot.querySelector(".btn-settings");
  const btnProfile = barNavegation.shadowRoot.querySelector(".btn-profile");
  btnTimeline.addEventListener("click", () => router.loadRoute("timeline"));
  btnSettings.addEventListener("click", () => router.loadRoute("settings"));
  btnProfile.addEventListener("click", () => router.loadRoute("profile"));
};

export const toSettings = () => {
  const user = firebase.auth().currentUser;
  const providerId = user.providerData[0].providerId;
  const changePass = document.getElementById("change-pass");
  const info = document.getElementById("info");
  const signOut = document.getElementById("singout");
  const img = document.getElementById("img");
  const message = document.getElementById("message");
  const imgPass = document.getElementById("img-pass");
  const q = messages.length;
  const numberRandom = Math.round(Math.random() * (q - 1));
  const messageRandom = messages[numberRandom];
  img.src = messageRandom.img;
  message.textContent = messageRandom.message;
  console.log(user.providerData[0].providerId);
  if (providerId === "password") {
    changePass.classList.remove("none");
    imgPass.classList.remove("none");
  }
  // } else {
  //   info.addEventListener("click", () => router.loadRoute("info-ecoideate"));
  //   signOut.addEventListener("click", () => auth.signOutSesion());

  // }
  changePass.addEventListener("click", () => router.loadRoute("update-pass"));
  info.addEventListener("click", () => router.loadRoute("info-ecoideate"));
  signOut.addEventListener("click", () => auth.signOutSesion());
};

export const updatePass = () => {
  const user = firebase.auth().currentUser;
  console.log(user);
  const password = document.getElementById("newPas-user");
  const inputPassNew = password.shadowRoot.querySelector("input");
  const passwordOld = document.getElementById("oldPas-user");
  const inputPassOld = passwordOld.shadowRoot.querySelector("input");
  const btnUpdatePass = document.getElementById("btn-update-pass");
  btnUpdatePass.addEventListener("click", () => {
    if (!inputPassOld.value) {
      const error = { code: "wrong/passOld" };
      getErrorFirebase(error, inputPassOld);
      return;
    }
    auth
      .updatePass(inputPassNew.value, inputPassOld.value, user)
      .then((result) => printToatsDone(result))
      .catch((error) => getErrorFirebase(error, inputPassNew, inputPassNew));
  });
  inputPassNew.value = "";
  inputPassOld.value = "";
};
