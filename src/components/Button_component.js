export class ViewButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
  }

  static get observedAttributes() {
    return ["class", "href"];
  }

  attributeChangedCallback(atrr, oldValue, newValue) {
    if (atrr === "class") {
      this.class = newValue;
    }
    if (atrr === "href") {
      this.href = newValue;
    }
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
    <a class="${this.class}" href="${this.href}">
    <slot name='title'></slot>
    </a>
    ${ViewButton.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
    <style>
        .primary{
        border-radius: 5px;
        padding: 0.6rem 0;
        background: #4B761F;
        border: none;
        color:white;
        text-decoration: none;
        width: 16rem;
        display: inline-block;
        text-align: center;
        font-size: 1.2rem;
        }   
        
        .secondary{
        border-radius: 5px;
        padding: 0.6rem 0;
        background: #ffff;
        border: 1px solid #4B761F;
        color:#333;
        text-decoration: none;
        width: 16rem;
        display: inline-block;
        text-align: center;
       font-size: 1.2rem;
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
