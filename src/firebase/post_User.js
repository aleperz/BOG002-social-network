/* eslint-disable class-methods-use-this */
const db = firebase.firestore();
export class AdminPost {
  savePost(description) {
    const user = firebase.auth().currentUser;
    let name;
    let photoUrl;
    let uid;
    if (user != null) {
      name = user.displayName;
      photoUrl = user.photoURL;
      uid = user.uid;
    }
    return db.collection("posts").doc().set({
      description, name, photoUrl, uid,
    });
  }
}
