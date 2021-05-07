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

  createUserWithEmailAndPassword: (email, password) => new Promise((resolve) => {
    resolve({
      user: {
        displayName: "",
        updateProfile(objectName) {
          this.displayName = objectName.displayName;
          return `se registro a  ${objectName.displayName}`;
        },
        sendEmailVerification: (objCfg) => "se  ha enviado tu correo",
      },
    });
  }),

  signInWithPopup: () => new Promise((resolve) => {
    resolve({
      user: {
        displayName: "usuario de google",
      },
    });
  }),

  sendPasswordResetEmail:(email) => new Promise((resolve) => {
    resolve("Correo enviado");
  }),

  signOut: () => new Promise((resolve) => {
    resolve("sesion cerrada");
  }),

  currentUser: {
    displayName: "alejandra",
    photoUrl: null,
    uid: "Sef0Hp71o2RoAnjkSBsJLJkBpeB3",
  },
});

const firebase = {
  auth,
};
export default jest.fn(() => firebase);
