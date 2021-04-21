/* eslint-disable class-methods-use-this */
export class AutenticationFirebase {
  //  toNotificationToast()
  //   const notifi
  // }

  authEmailPass(email, password) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          if (result.user.emailVerified) {
            // $('#avatar').attr('src', 'imagenes/usuario_auth.png');
            resolve(`Bienvenido ${result.user.displayName}`);
          } else {
            firebase.auth().signOut();
            reject(`Por favor realiza la verificación de la cuenta`);
          }
        });
    });
  }

  createAccountEmailPass(email, password, name) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({
          displayName: name,
        });

        const configuracion = {
          url: "http://localhost:5000",
        };

        result.user.sendEmailVerification(configuracion).catch((error) => {
          console.error(error);
        });

        firebase.auth().signOut();

        console.log(
          `Bienvenido ${name}, debes realizar el proceso de verificación`
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  authCuentaGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        //  $("#avatar").attr("src", result.user.photoURL);
        console.log(`Bienvenido ${result.user.displayName} !! `);
      })
      .catch((error) => {
        console.error(error);
        console.log(`Error al autenticarse con google: ${error} `);
      });
  }

  ressetPass(email) {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log("correo enviado");
      })
      .catch((error) => {
        console.error(error);
        console.log(`Correo no registrado ${error}`);
      });
  }

  signOutSesion() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("sesion cerrada");
      })
      .catch((error) => {
        console.error(error);
        console.log(`No se puede  cerrar sesion: ${error} `);
      });
  }
}
