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
    <button>+</button>
    <p>-</p>
        ${BtnOpenModal.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
        <style>
      button{
        background-color: #4B761F;
        border-radius: 100%;
        width: 44px;
        height: 44px;
        border: none;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        color: white;
        font-size: 2.5rem;
        position: fixed;
        right: 24px;
        bottom: 114px;
        cursor: pointer;
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
