import { home } from '../views_templates/home.js';
import { login } from '../views_templates/login.js';
import { register } from '../views_templates/register.js';
import { resetPass } from '../views_templates/reset_pass.js';
import { timeline } from "../views_templates/timeline.js";
import { profile } from "../views_templates/profile.js";
import { settings } from "../views_templates/settings.js";

export const routes = [
  {
    path: '#error',
    template: 'Pagina no encontrada',
  },
  {
    path: '#',
    template: home,
    requireAuth: false,
  },
  {
    path: '#register',
    template: register,
    requireAuth: false,
  },
  {
    path: '#login',
    template: login,
    requireAuth: false,
  },
  {
    path: '#reset-pass',
    template: resetPass,
    requireAuth: false,
  },
  {
    path: '#timeline',
    template: timeline,
    requireAuth: true,
  },
  {
    path: '#profile',
    template: profile,
    requireAuth: true,
  },
  {
    path: '#settings',
    template: settings,
    requireAuth: true,
  },
];
