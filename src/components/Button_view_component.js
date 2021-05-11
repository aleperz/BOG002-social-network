export class ViewButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
  }

  static get observedAttributes() {
    return ["class"];
  }

  attributeChangedCallback(atrr, oldValue, newValue) {
    this[atrr] = newValue;
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
    <button class="${this.class}">
    <slot name='title'></slot>
    </button>
    ${ViewButton.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
    <style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&family=Shadows+Into+Light+Two&display=swap');

    .btn-underline{
      border: none;
      text-decoration: underline;
      background: none;
      cursor: pointer;
      font-family: "Roboto", sans-serif;
    }
    button:hover{
      color: #7b309a;
    }

    .btn{
      border: none;
      background: none;
      cursor: pointer;
      font-family: "Roboto", sans-serif;
      font-size: 1rem
    }

    .btn-link{
      border: none;
      text-decoration: underline;
      background: none;
      cursor: pointer;
      font-family: "Shadows Into Light Two", cursive;
      font-size: 1.5rem;
      width: 100%;
    }
    
 
    </style>`;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }
}
