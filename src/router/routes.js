import { home } from '../views_templates/home.js';
import { login } from '../views_templates/login.js';
import { register } from '../views_templates/register.js';
import { resetPass } from '../views_templates/reset_pass.js';
import { timeline } from "../views_templates/timeline.js";
import { profile } from "../views_templates/profile.js";
import { settings } from "../views_templates/settings.js";
import { updatePass } from "../views_templates/update_pass.js";
import { info } from "../views_templates/info.js";
import { error404 } from "../views_templates/error_404.js";

export const routes = [
  {
    path: '#error',
    template: error404,
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
  {
    path: '#update-pass',
    template: updatePass,
    requireAuth: true,
  },
  {
    path: '#info-ecoideate',
    template: info,
    requireAuth: true,
  },
];
