export class EditDeletePost extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
  }

  handleEvent(event) {
    if (event.type === "click") {
      const openModalEdit = new CustomEvent("openModalEdit", {
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(openModalEdit);
      const optionMenu = this.shadowRoot.querySelector(".optionsHide");
      optionMenu.classList.remove("visible");
    }
  }

  static getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `    
    <div class="containerMenu">
      <div>
        <span>...</span>
      </div>
      <div class="optionsHide">
        <p id="edit">Editar</p>
        <p id="delete">Borrar</p>
      </div>    
    </div>
        ${EditDeletePost.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
        <style>
      .containerMenu{
        position: absolute;
        right: 12px;
        top: -16px;
        cursor:pointer;
    }
    .containerMenu span{
      font-size: 2.5rem;
    }
      
      .optionsHide.visible{
        display:block;
        width: 100px;
        position: absolute;
        text-align: center;
        right: -10px;
        background-color: #d2d2d2;
        border-radius: 3px;
      }
      .optionsHide{
        display:none
      }
      .optionsHide p{
        width:100%;
        margin: 0;
        padding: 10px 0;
        border-radius: 3px;
      } 
      .optionsHide p:hover{
        background-color:gray;
        border-radius:3px;
        color:white;
      }

         </style>`;
  }

  render() {
    this.shadowRoot.appendChild(EditDeletePost.getTemplate().content.cloneNode(true));
    const menu = this.shadowRoot.querySelector("span");
    const optionMenu = this.shadowRoot.querySelector(".optionsHide");
    menu.addEventListener("click", () => {
      optionMenu.classList.toggle("visible");
    });
    const btnEdit = this.shadowRoot.querySelector("#edit");
    btnEdit.addEventListener("click", this);
  }

  connectedCallback() {
    this.render();
  }
}
