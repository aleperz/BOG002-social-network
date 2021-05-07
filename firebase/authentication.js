/* eslint-disable class-methods-use-this */
export class AutenticationFirebase {
  authEmailPass(email, password) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          if (result.user.emailVerified) {
            // ('avatar').attr('src', 'imagenes/usuario_auth.png');
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
    firebase.auth().signOut();
    const configuracion = {
      url: "http://localhost:5000/",
    };
    await result.user.sendEmailVerification(configuracion);
    console.log(result.user);
    return result.user.displayName;
  }

  authCuentaGoogle(provider) {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // console.log(provider);
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        //  $("#avatar").attr("src", result.user.photoURL);
        console.log(`Bienvenido ${result.user.displayName} !! `);
        return `Bienvenido ${result.user.displayName} !! `;
      });
  }

  async ressetPass(email) {
    await firebase.auth().sendPasswordResetEmail(email);
    return "Correo enviado";
  }

  signOutSesion() {
    return firebase
      .auth()
      .signOut()
      .then(() => "sesion cerrada");
  }
}
