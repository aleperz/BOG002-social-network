const auth = () => ({
  signInWithEmailAndPassword: (email, password) => new Promise((resolve, reject) => {
    if (email === "usuarionuevo@example.com") {
      resolve({
        user: {
          displayName: "usuario nuevo",
          emailVerified: true,
          email: "usuarionuevo@example.com",
        },
      });
    } else if (email === "usuarioNoVerificado@example.com") {
      resolve({
        user: {
          displayName: "usuario no verificado",
          emailVerified: false,
          email: "usuarioNoVerificado@example.com",
        },
      });
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({
        code: "correo no registrado",
        message: "el  correo  no se encuentra en la base de datos",
      });
    }
  }),

  signOut: () => new Promise((resolve) => {
    resolve("sesion cerrada");
  }),
});

const firebase = {
  auth,
};
export default jest.fn(() => firebase);
