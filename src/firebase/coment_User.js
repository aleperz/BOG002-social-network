/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
export class ComentUser {
  saveComent(idPost, author, description) {
    return db.collection("coments").add({
      idPost,
      author,
      description,
      date: Date.now(),
    });
  }

  getComents(idpost, callback) {
    return db.collection("coments").where("idPost", "==", idpost).orderBy("date", "desc").onSnapshot(callback);
  }
}
