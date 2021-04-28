/* eslint-disable class-methods-use-this */
export class AutenticationFirebase {
  authEmailPass(email, password) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          console.log(result);
          if (result.user.emailVerified) {
            // $('#avatar').attr('src', 'imagenes/usuario_auth.png');
            resolve(`Bienvenido ${result.user.displayName}`);
          } else {
            firebase.auth().signOut();
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({
              code: "verificacion",
              message: "por favor realizar verificacion del correo",
            });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async createAccountEmailPass(email, password, name) {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    result.user.updateProfile({
      displayName: name,
    });
    const configuracion = {
      url: "http://localhost:5000/",
    };
    await result.user.sendEmailVerification(configuracion);
    firebase.auth().signOut();
    return name;
  }

  authCuentaGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        //  $("#avatar").attr("src", result.user.photoURL);
        console.log(`Bienvenido ${result.user.displayName} !! `);
      });
  }

  async ressetPass(email) {
    await firebase
      .auth()
      .sendPasswordResetEmail(email);
    return "Correo enviado";
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

  vericateAuth() {
    const verification = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        return true;
      }
      return false;
    });
    console.log(verification);
  }
}
