import { toHome, toLoginGoogle } from "./render_view/render_home.js";
import { toLogin, toRegister, toResetPass } from "./render_view/render_login_register.js";
import { toInfo } from "./render_view/render_info.js";
import { toSettings, changeViewBarNavegation, updatePass } from "./render_view/render_settings_bar.js";
import { newPost, printPost } from "./render_view/render_timeline.js";
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
import { ComentsMessage } from "./components/coments_message.js";

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
customElements.define("coment-message", ComentsMessage);

// const mansoryGrid = () => {
//   const elem = document.querySelector('.container-posts');
//   console.log(elem);
//   const msnry = new Masonry(elem, {
//   // options
//     itemSelector: '.itemPost',
//     columnWidth: 200,
//   });
// };

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
      // mansoryGrid();
      break;
    case "#profile":
      changeViewBarNavegation();
      break;
    case "#settings":
      changeViewBarNavegation();
      toSettings();
      break;
    case "#update-pass":
      updatePass();
      changeViewBarNavegation();
      break;
    case "#info-ecoideate":
      changeViewBarNavegation();
      toInfo();
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
