// Este es el punto de entrada de tu aplicacion

import { Router } from './views_templates/router.js';
import { routes } from './views_templates/routes.js';
import { MainButton } from './components/Button_component.js';

const router = new Router(routes);
const home = document.getElementById('home');
const register = document.getElementById('register');
const login = document.getElementById('login');
const btnPrimary = document.getElementById('btn-primaty');
// console.log(btnPrimary);
home.addEventListener('click', () => router.loadRoute(''));
register.addEventListener('click', () => router.loadRoute('register'));
login.addEventListener('click', () => router.loadRoute('login'));
// btnPrimary.addEventListener('click', () => window.history.pushState({}, 'done', '/#login'));

customElements.define('button-main', MainButton);
