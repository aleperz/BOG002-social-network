// importamos la funcion que vamos a testear
import firebaseMock from "../_mocks_/firebase_mock.js";
import { AutenticationFirebase } from '../src/firebase/authentication.js';

const auth = new AutenticationFirebase();
global.firebase = firebaseMock();

describe('authEmailPass', () => {
  it('debería ser una función', () => {
    expect(typeof auth.authEmailPass).toBe('function');
  });

  it('deberia loguearme', (done) => {
    auth.authEmailPass("usuarionuevo@example.com", "123456789").then((result) => {
      expect(result).toBe("Bienvenido usuario nuevo");
      expect(typeof result).toBe("string");
      done();
    });
  });
  it('deberia validar si el  correo se verifico', (done) => {
    auth.authEmailPass("usuarioNoVerificado@example.com", "123456789").catch((error) => {
      expect(error.code).toBe("verificacion");
      done();
    });
  });
  it('deberia indicar que no esta registrado', (done) => {
    auth.authEmailPass("usuarioNoExite@example.com", "123456789").catch((error) => {
      expect(error.code).toBe("correo no registrado");
      done();
    });
  });
});
