export class ViewButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
  }

  static getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
    <button>
    <slot name='title'></slot>
    </button>
    ${ViewButton.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
    <style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&family=Shadows+Into+Light+Two&display=swap');

    button{
      border: none;
      text-decoration: underline;
      background: none;
      cursor: pointer;
      font-family: "Roboto", sans-serif;
    }
    button:hover{
      color: #7b309a;
    }
 
        </style>`;
  }

  render() {
    this.shadowRoot.appendChild(ViewButton.getTemplate().content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }
}
