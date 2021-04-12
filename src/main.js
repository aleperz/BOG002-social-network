// Este es el punto de entrada de tu aplicacion

import { Router } from './views_templates/router.js';
import { routes } from './views_templates/routes.js';

const router = new Router(routes);
const home = document.getElementById('home');
const register = document.getElementById('register');
const login = document.getElementById('login');

home.addEventListener('click', () => router.loadRoute(''));
register.addEventListener('click', () => router.loadRoute('register'));
login.addEventListener('click', () => router.loadRoute('login'));
