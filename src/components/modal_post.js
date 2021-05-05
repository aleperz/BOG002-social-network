export class ModalPost extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
  }

  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(atrr, oldValue, newValue) {
    this[atrr] = newValue;
  }

  handleEvent(event) {
    const btnPosting = this.shadowRoot.querySelector(".primary").shadowRoot.querySelector("button");
    const textarea = this.shadowRoot.querySelector("textarea");
    const modal = this.shadowRoot.querySelector("#modal");
    const titleModal = this.shadowRoot.querySelector("h2");
    const btnUpdate = this.shadowRoot.querySelector(".primary > span");
    if (event.type === "cleanTextarea") {
      modal.classList.replace("hidden", "modal");
      textarea.value = "";
      btnPosting.setAttribute("disabled", true);
      titleModal.textContent = "Crear publicacion";
      btnUpdate.innerText = "Publicar";
    }
    if (event.type === "openModalEdit") {
      modal.classList.replace("hidden", "modal");
    }
    if (event.type === "editContent") {
      btnUpdate.innerText = "Guardar";
      textarea.value = event.detail.message;
      titleModal.textContent = "Editar publicacion";
    }
  }

  static getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `    
    <div class="hidden" id="modal">
    <div class="container-modal">
      <span class="close">&times;</span>
      <h2></h2>
      <textarea class="message" rows="7" cols="35"></textarea>
      <div class="container-btn">
        <button-action class="primary"><span slot="title">publicar</span></button-action>
        <button-action class="secondary"><span slot="title">Cancelar</span></button-action>        
      </div>
      <img src="">
    </div>
  </div>
      ${ModalPost.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
      <style>
    .hidden{
        display: none;
    }

    .modal{
        width: 100vw;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        background-color: rgba(0,0,0,0.4);
        z-index: 100;
        align-items: flex-start;
        display: flex;
    }

    .container-modal{
        width: 100vw;
        height: 100vh;
        background: white;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 3rem;
        margin: auto;
    }

    .close{
        position: absolute;
        top: 1px;
        right: 13px;
        font-size: 2rem;
        color: #333;
        cursor: pointer;
    }

    textarea{
        border: #4b761f 1px solid;
        margin-bottom: 3rem;
        border-radius: 5px;
    }

    texrarea: focus{
        outline: none;
        border-color: #4b761f;
        box-shadow: 0 0 0 0.25rem rgb(161 196 23 /35%);
    }

    .container-btn{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
      
    button-action{
        margin-bottom: 2rem;
        width: 80%;
        max-width: 16rem;
    }
      
    h2{
       color: #4b761f;
       margin-bottom: 3rem;
    }

@media screen and (min-width: 700px) {
    .modal{
        align-items: center;        
        }

    .container-modal{
        width: 60%;
        height: 50%;
        flex-direction: column;
        align-items: center;
        padding-top: 3rem;
        padding-top: 1rem;
        max-width: 600px;
        border-radius: 5px;
    }

    .container-btn {
        flex-direction: row-reverse;        
        justify-content: center;
    }

    button-action{
        margin: 1rem 4rem;
        width: 80%;
        max-width: 16rem;
    }

    .primary{
        margin: 1rem 4rem 1rem 2rem;
    }

    .secondary{
        margin: 1rem 2rem 1rem 4rem;
    }

    textarea{
        margin-bottom: 1rem;
        width: 76.5%;
    }

    h2{
        margin-bottom: 2rem;
    }
}
       </style>`;
  }

  render() {
    this.shadowRoot.appendChild(
      ModalPost.getTemplate().content.cloneNode(true),
    );
    const modal = this.shadowRoot.querySelector("#modal");
    const textarea = this.shadowRoot.querySelector("textarea");
    const btnClose = this.shadowRoot.querySelector(".close");
    const btnPosting = this.shadowRoot.querySelector(".primary").shadowRoot.querySelector("button");
    btnPosting.setAttribute("disabled", true);
    this.shadowRoot.addEventListener("click", (event) => {
      const cancel = event.target.closest(".secondary");
      if (
        event.target === modal
        || event.target === btnClose
        || cancel
      ) {
        modal.classList.replace("modal", "hidden");
      }
    });
    textarea.addEventListener("keyup", () => {
      this.value = textarea.value;
      if (this.value) btnPosting.removeAttribute("disabled");
    });
  }

  connectedCallback() {
    document.addEventListener("cleanTextarea", this);
    document.addEventListener("openModalEdit", this);
    document.addEventListener("editContent", this);
    this.render();
  }
}
