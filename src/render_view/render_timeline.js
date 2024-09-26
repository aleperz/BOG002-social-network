import { AdminPost } from "../firebase/post_User.js";
import { LikeUser } from "../firebase/like_User.js";
import { ComentUser } from "../firebase/coment_User.js";

const post = new AdminPost();
const like = new LikeUser();
const coment = new ComentUser();
let editStatusPost = false;
let idPost = "";

export const newPost = () => {
  const user = firebase.auth().currentUser;
  const modalPost = document.getElementById("modal-post");
  const divModal = modalPost.shadowRoot.getElementById("modal");
  const btnPosting = modalPost.shadowRoot.querySelector(".primary");
  btnPosting.addEventListener("click", async () => {
    if (!editStatusPost) {
      await post.savePost(modalPost.value, user);
    } else {
      await post.updatePost({ description: modalPost.value }, idPost);
      editStatusPost = false;
    }
    divModal.classList.replace("modal", "hidden");
  });
};
const getDatePost = (timeStamp) => {
  const d = new Date(timeStamp);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();
  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;
  return [day, month, year].join("/");
};

const editPost = async (e) => {
  editStatusPost = true;
  idPost = e.target.dataset.id;
  const result = await post.getPostToEdit(idPost);
  const editContent = new CustomEvent("editContent", {
    detail: { message: result.description },
    bubbles: true,
    composed: true,
  });
  e.target.dispatchEvent(editContent);
};

const deletePosts = async (e) => {
  idPost = e.target.dataset.id;
  await post.deletePost(idPost);
};

const giveLike = async (e) => {
  const btnClass = e.target.classList.contains("active");
  const idp = e.target.dataset.id;
  const user = firebase.auth().currentUser;
  const idUser = user.uid;
  if (btnClass) await like.saveLike(idp, idUser);
  else await like.deleteLike(idp, idUser);
};

const paintLike = async (id, countLike, likeBtn) => {
  await like.getLike(id, (querySnapshot) => {
    const likeByPost = [];
    const user = firebase.auth().currentUser;
    querySnapshot.forEach((doc) => {
      likeByPost.push({ ...doc.data() });
    });
    const btnl = likeBtn;
    const lc = countLike;
    lc.textContent = likeByPost.length;
    const likeFound = likeByPost.find((element) => element.idUser === user.uid);
    if (likeFound) btnl.classList.add("active");
  });
};

const comentSave = async (e) => {
  const user = firebase.auth().currentUser;
  const idPosts = e.target.dataset.id;
  const inputComent = e.target.previousSibling.value;
  await coment.saveComent(idPosts, user.displayName, inputComent);
  const cleanContent = new CustomEvent("cleanContent", {
    bubbles: true,
    composed: true,
  });
  e.target.dispatchEvent(cleanContent);
};

const printComents = async (idP, contComent) => {
  const containerComent = contComent;
  await coment.getComents(idP, (querySnapshot) => {
    containerComent.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      const comentUser = document.createElement("coment-message");
      containerComent.appendChild(comentUser);
      const author = comentUser.shadowRoot.querySelector(".name");
      const date = comentUser.shadowRoot.querySelector(".date");
      const description = comentUser.shadowRoot.querySelector(".description");
      author.textContent = docData.author;
      date.textContent = getDatePost(docData.date);
      description.textContent = docData.description;
    });
  });
};

export const printPost = () => {
  const containerPost = document.getElementById("container-post");
  const user = firebase.auth().currentUser;
  post.getPost((querySnapshot) => {
    containerPost.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const docData = doc.data();
      const elementPost = document.createElement("data-post");
      elementPost.classList.add("itemPost");
      containerPost.appendChild(elementPost);
      const likeBtn = elementPost.shadowRoot.querySelector("btn-like").shadowRoot.querySelector(".like");
      const likeCount = elementPost.shadowRoot.querySelector("btn-like").shadowRoot.querySelector("span");
      likeBtn.dataset.id = doc.id;
      likeBtn.addEventListener("click", giveLike);
      const btnComent = elementPost.shadowRoot.querySelector("coment-post").shadowRoot.querySelector(".icon-send");
      btnComent.dataset.id = doc.id;
      btnComent.addEventListener("click", comentSave);
      const contComent = elementPost.shadowRoot.querySelector("coment-post").shadowRoot.querySelector(".messages");
      const author = elementPost.shadowRoot.querySelector("h3");
      const description = elementPost.shadowRoot.querySelector(".description");
      const date = elementPost.shadowRoot.querySelector(".date");
      const photo = elementPost.shadowRoot.querySelector("img");
      author.textContent = docData.name;
      description.textContent = docData.description;
      date.textContent = getDatePost(docData.date);
      photo.src = docData.photoURL || "./img/user.svg";
      if (docData.uid === user.uid) {
        const managePost = document.createElement("edit-delete-post");
        const containerPostShadow = elementPost.shadowRoot.querySelector(
          ".container-post",
        );
        containerPostShadow.appendChild(managePost);
        const updatePost = managePost.shadowRoot.querySelector("#edit");
        const deletePost = managePost.shadowRoot.querySelector("#delete");
        updatePost.dataset.id = doc.id;
        deletePost.dataset.id = doc.id;
        updatePost.addEventListener("click", editPost);
        deletePost.addEventListener("click", deletePosts);
      }
      paintLike(doc.id, likeCount, likeBtn);
      printComents(doc.id, contComent);
    });
  });
};
