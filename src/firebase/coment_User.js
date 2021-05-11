/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
export class ComentUser {
  saveComent(idPost, author, description) {
    return db.collection("coments").add({
      idPost,
      author,
      description,
      date: new Date(),
    });
  }

  getComents(idpost, callback) {
    return db.collection("coments").where("idPost", "==", idpost).onSnapshot(callback);
  }
}
