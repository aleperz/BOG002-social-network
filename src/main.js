import { Router } from "./views_templates/router.js";
import { routes } from "./views_templates/routes.js";
import { ViewButton } from "./components/Button_component.js";
import { InputGroup } from "./components/Input_component.js";
import { Header } from "./components/header_components.js";
import { ActionButton } from "./components/Button_action_component.js";

const router = new Router(routes);
customElements.define("button-view", ViewButton);
customElements.define("input-group", InputGroup);
customElements.define("header-general", Header);
customElements.define("button-action", ActionButton);

const toLogin = () => {
  const btnLogin = document.getElementById("btn-login");
  btnLogin.addEventListener("click", () => console.log("click  en login"));
};

const changeObserver = new MutationObserver((mutaciones) => {
  const currentRoute = window.location.hash;
  if (mutaciones[0].type === "childList") {
    if (currentRoute === "#login") toLogin();
  }
});

const root = document.getElementById("root");
changeObserver.observe(root, {
  childList: true,
});
