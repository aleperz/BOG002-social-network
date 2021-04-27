import { home } from './home.js';
import { login } from './login.js';
import { register } from './register.js';
import { resetPass } from './reset_pass.js';
import { timeline } from "./timeline.js";

export const routes = [
  {
    path: '#error',
    template: 'Pagina no encontrada',
  },
  {
    path: '#register',
    template: register,
  },
  {
    path: '#login',
    template: login,
  },
  {
    path: '#reset-pass',
    template: resetPass,
  },
  {
    path: '#home',
    template: timeline,
  },
  {
    path: '#',
    template: home,
  },
];
