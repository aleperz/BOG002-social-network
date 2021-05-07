/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
export class LikeUser {
  saveLike(idPost, idUser) {
    return db.collection("like").add({
      idPost,
      idUser,
    });
  }

  getLike(idpost, callback) {
    return db.collection("like").where("idPost", "==", idpost).onSnapshot(callback);
  }

  async getLikeById(idpost, iud) {
    const allLike = await db.collection("like").where("idPost", "==", idpost).get();
    const likes = [];
    allLike.forEach((element) => {
      likes.push({ id: element.id, ...element.data() });
    });
    const likeFound = likes.find((element) => element.idUser === iud);
    return likeFound.id;
  }

  async deleteLike(idpost, iduser) {
    const result = await this.getLikeById(idpost, iduser);
    return db
      .collection("like")
      .doc(result)
      .delete()
      .then(() => "like eliminado");
  }
}
