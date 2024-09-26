export class BtnOpenModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
  }

  handleEvent(event) {
    if (event.type === "click") {
      const cleanEvent = new CustomEvent("cleanTextarea", {
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(cleanEvent);
    }
  }

  static getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `    
    <button></button>
    <p>-</p>
        ${BtnOpenModal.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
        <style>
      button{
        background-image: url(./img/new-post.svg);
        background-size: 40px;
        background-position: center;
        background-repeat: no-repeat; 
        background-color: #4B761F;
        border-radius: 100%;
        width: 60px;
        height: 60px;
        border: none;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        color: white;
        font-size: 2.5rem;
        position: fixed;
        right: 24px;
        bottom: 114px;
        cursor: pointer;
      }

      button:hover:after {
        position: absolute;
        padding: 0.3rem;
        background-color: hsl(0deg 0% 6%);
        content: "Nueva publicación";
        top: 22px;
        right: 62px;
        border-radius: 3px;
        opacity: 0.6;
        font-size: 12px;
        width: 100px;
      }

      @media screen and (min-width: 900px) {
       button{
        right: 350px;
        bottom: 114px;
       }
      }
         </style>`;
  }

  render() {
    this.shadowRoot.appendChild(BtnOpenModal.getTemplate().content.cloneNode(true));
    const btnOpen = this.shadowRoot.querySelector("button");
    btnOpen.addEventListener("click", this);
  }

  connectedCallback() {
    this.render();
  }
}
