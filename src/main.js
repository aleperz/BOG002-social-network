// Este es el punto de entrada de tu aplicacion

import { Router } from "./views_templates/router.js";
import { routes } from "./views_templates/routes.js";
import { ViewButton } from "./components/Button_component.js";

const router = new Router(routes);
customElements.define("button-view", ViewButton);
