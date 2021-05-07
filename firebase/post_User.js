/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

export class AdminPost {
  savePost(description, user) {
    let name;
    let photoURL;
    let uid;
    if (user !== null) {
      name = user.displayName;
      photoURL = user.photoURL;
      uid = user.uid;
    }
    return db.collection("posts").add({
      description,
      name,
      photoURL,
      uid,
      date: Date.now(),
    });
  }

  getPost(callback) {
    return db.collection("posts").orderBy("date", "desc").onSnapshot(callback);
  }

  async getPostToEdit(id) {
    const docRef = await db.collection("posts").doc(id).get();
    return docRef.data();
  }

  updatePost(objectRef, id) {
    return db.collection("posts").doc(id).update(objectRef).then(() => "post editado");
  }

  deletePost(id) {
    return db.collection("posts").doc(id).delete().then(() => "post eliminado");
  }
}
