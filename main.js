import { Router } from "./router/router.js";
import { routes } from "./router/routes.js";
import { ViewButton } from "./components/Button_view_component.js";
import { InputGroup } from "./components/Input_component.js";
import { InputPassword } from "./components/Input_password.js";
import { Header } from "./components/header_components.js";
import { ActionButton } from "./components/Button_action_component.js";
import { NotificacionToast } from "./components/notification_toast.js";
import { BarNavegation } from "./components/bar_navegation.js";
import { ModalPost } from "./components/modal_post.js";
import { BtnOpenModal } from "./components/btn_open_modal.js";
import { DataPost } from "./components/data_post.js";
import { BtnLike } from "./components/like.js";
import { EditDeletePost } from "./components/edit_delete_post.js";
import { ComentsPost } from "./components/coments_post.js";
import { AutenticationFirebase } from "./firebase/authentication.js";
import { AdminPost } from "./firebase/post_User.js";
import { LikeUser } from "./firebase/like_User.js";
import { messages } from "./views_templates/settings.js";

const router = new Router(routes);
const auth = new AutenticationFirebase();
const post = new AdminPost();
const like = new LikeUser();

customElements.define("button-view", ViewButton);
customElements.define("input-group", InputGroup);
customElements.define("input-password", InputPassword);
customElements.define("header-general", Header);
customElements.define("button-action", ActionButton);
customElements.define("notification-toast", NotificacionToast);
customElements.define("bar-navegation", BarNavegation);
customElements.define("modal-post", ModalPost);
customElements.define("open-modal", BtnOpenModal);
customElements.define("data-post", DataPost);
customElements.define("edit-delete-post", EditDeletePost);
customElements.define("btn-like", BtnLike);
customElements.define("coment-post", ComentsPost);
let editStatusPost = false;
let idPost = "";

const toHome = () => {
  const btnLogin = document.getElementById("btn-login");
  const btnRegister = document.getElementById("btn-register");
  btnLogin.addEventListener("click", () => router.loadRoute("login"));
  btnRegister.addEventListener("click", () => router.loadRoute("register"));
};

const toLoginGoogle = () => {
  const btnGoogle = document.getElementById("btn-google");
  const provider = new firebase.auth.GoogleAuthProvider();
  btnGoogle.addEventListener("click", () => {
    auth.authCuentaGoogle(provider);
  });
};

const printToatsError = (messageError) => {
  const toastError = document.getElementById("error-toast");
  const toastErrorSpan = toastError.shadowRoot.querySelector("span");
  toastErrorSpan.innerHTML = messageError;
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
      messageError = "Contraseña invalida si no la recuerda haga clik en olvide la contraseña";
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

const toRegister = () => {
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

const toResetPass = () => {
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

const changeViewBarNavegation = () => {
  const barNavegation = document.getElementById("bar-navegacion");
  const btnTimeline = barNavegation.shadowRoot.querySelector(".btn-timeline");
  const btnSettings = barNavegation.shadowRoot.querySelector(".btn-settings");
  const btnProfile = barNavegation.shadowRoot.querySelector(".btn-profile");
  btnTimeline.addEventListener("click", () => router.loadRoute("timeline"));
  btnSettings.addEventListener("click", () => router.loadRoute("settings"));
  btnProfile.addEventListener("click", () => router.loadRoute("profile"));
};

const toSettings = () => {
  const changePass = document.getElementById("change-pass");
  const info = document.getElementById("info");
  const signOut = document.getElementById("singout");
  const img = document.getElementById("img");
  const message = document.getElementById("message");
  const q = messages.length;
  const numberRandom = Math.round(Math.random() * (q - 1));
  const messageRandom = messages[numberRandom];
  img.src = messageRandom.img;
  message.textContent = messageRandom.message;
  changePass.addEventListener("click", () => router.loadRoute("Change-password"));
  info.addEventListener("click", () => router.loadRoute("info"));
  signOut.addEventListener("click", () => auth.signOutSesion());
};

const newPost = () => {
  const user = firebase.auth().currentUser;
  const modalPost = document.getElementById("modal-post");
  const divModal = modalPost.shadowRoot.getElementById("modal");
  const btnPosting = modalPost.shadowRoot.querySelector(".primary");
  btnPosting.addEventListener("click", async () => {
    if (!editStatusPost) {
      await post.savePost(modalPost.value, user);
    } else {
      await post.updatePost({ description: modalPost.value }, idPost);
      editStatusPost = false;
    }
    divModal.classList.replace("modal", "hidden");
  });
};
const getDatePost = (timeStamp) => {
  const d = new Date(timeStamp);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  return [day, month, year].join("/");
};

const editPost = async (e) => {
  editStatusPost = true;
  idPost = e.target.dataset.id;
  const result = await post.getPostToEdit(idPost);
  const editContent = new CustomEvent("editContent", {
    detail: { message: result.description },
    bubbles: true,
    composed: true,
  });
  e.target.dispatchEvent(editContent);
};

const deletePosts = async (e) => {
  idPost = e.target.dataset.id;
  await post.deletePost(idPost);
};

const giveLike = async (e) => {
  const btnClass = e.target.classList.contains("active");
  const idp = e.target.dataset.id;
  const user = firebase.auth().currentUser;
  const idUser = user.uid;
  if (btnClass) await like.saveLike(idp, idUser);
  else await like.deleteLike(idp, idUser);
};

const paintLike = async (id, countLike, likeBtn) => {
  await like.getLike(id, (querySnapshot) => {
    const likeByPost = [];
    const user = firebase.auth().currentUser;
    querySnapshot.forEach((doc) => {
      likeByPost.push({ ...doc.data() });
    });
    const btnl = likeBtn;
    const lc = countLike;
    lc.textContent = likeByPost.length;
    const likeFound = likeByPost.find((element) => element.idUser === user.uid);
    if (likeFound) btnl.classList.add("active");
  });
};

const printPost = () => {
  const containerPost = document.getElementById("container-post");
  const user = firebase.auth().currentUser;
  post.getPost((querySnapshot) => {
    containerPost.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      const elementPost = document.createElement("data-post");
      containerPost.appendChild(elementPost);
      const likeBtn = elementPost.shadowRoot.querySelector("btn-like").shadowRoot.querySelector(".like");
      const likeCount = elementPost.shadowRoot.querySelector("btn-like").shadowRoot.querySelector("span");
      likeBtn.dataset.id = doc.id;
      likeBtn.addEventListener("click", giveLike);
      const author = elementPost.shadowRoot.querySelector("h3");
      const description = elementPost.shadowRoot.querySelector(".description");
      const date = elementPost.shadowRoot.querySelector(".date");
      const photo = elementPost.shadowRoot.querySelector("img");
      author.textContent = docData.name;
      description.textContent = docData.description;
      date.textContent = getDatePost(docData.date);
      photo.src = "./img/user.svg";
      if (docData.uid === user.uid) {
        const managePost = document.createElement("edit-delete-post");
        const containerPostShadow = elementPost.shadowRoot.querySelector(
          ".container-post",
        );
        containerPostShadow.appendChild(managePost);
        const updatePost = managePost.shadowRoot.querySelector("#edit");
        const deletePost = managePost.shadowRoot.querySelector("#delete");
        updatePost.dataset.id = doc.id;
        deletePost.dataset.id = doc.id;
        updatePost.addEventListener("click", editPost);
        deletePost.addEventListener("click", deletePosts);
      }
      paintLike(doc.id, likeCount, likeBtn);
    });
  });
};

const toVerificateRoute = (currentRoute) => {
  switch (currentRoute) {
    case "#login":
      toLogin();
      toLoginGoogle();
      break;
    case "#register":
      toRegister();
      toLoginGoogle();
      break;
    case "#reset-pass":
      toResetPass();
      break;
    case "":
      toLoginGoogle();
      toHome();
      break;
    case "#timeline":
      changeViewBarNavegation();
      newPost();
      printPost();
      break;
    case "#profile":
      changeViewBarNavegation();
      break;
    case "#settings":
      changeViewBarNavegation();
      toSettings();
      break;
    default:
      break;
  }
};

const changeObserver = new MutationObserver((mutaciones) => {
  const currentRoute = window.location.hash;
  if (mutaciones[0].type === "childList") {
    toVerificateRoute(currentRoute);
  }
});

const root = document.getElementById("root");
changeObserver.observe(root, {
  childList: true,
});
