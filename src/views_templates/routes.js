import { home } from './home.js';

export const routes = [
  {
    path: '#error',
    template: 'Pagina no encontrada',
  },
  {
    path: '#register',
    template: '<p>registro</p>',
  },
  {
    path: '#login',
    template: '<p>inicio de sesion</p>',
  },
  {
    path: '#',
    template: home,
  },
];
