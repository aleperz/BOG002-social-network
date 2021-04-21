/* eslint-disable class-methods-use-this */
export class AutenticationFirebase {
  authEmailPass(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified) {
          // $('#avatar').attr('src', 'imagenes/usuario_auth.png');
          console.log(`Bienvenido ${result.user.displayName}`);
        } else {
          firebase.auth().signOut();
          console.log(`Por favor realiza la verificación de la cuenta`);
        }
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
          `Bienvenido ${name}, debes realizar el proceso de verificación`,
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
}
