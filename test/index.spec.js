// importamos la funcion que vamos a testear
import firebaseMock from "../_mocks_/firebase_mock.js";
import { AutenticationFirebase } from '../src/firebase/authentication.js';

const auth = new AutenticationFirebase();
global.firebase = firebaseMock();

describe('authEmailPass', () => {
  it('debería ser una función', () => {
    expect(typeof auth.authEmailPass).toBe('function');
  });

  it('deberia loguearme', () => {
    auth.authEmailPass("usuarionuevo@example.com", "123456789").then((result) => {
      expect(typeof result).toBe("hola");
    });
  });

  it('deberia verificar el correo', () => {
    auth.authEmailPass("usuarionuevo@example.com", "123456789").then((result) => {
      expect(result.user.emailVerified).toBeFalsy();
    });
  });
});
