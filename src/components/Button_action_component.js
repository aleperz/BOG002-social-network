export class ActionButton extends HTMLElement {
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
        <slot name='image'></slot>
        <slot name='title'></slot>
    </button>
      ${ActionButton.getStyles()}`;
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
          width: 100%;    
          text-align: center;
          font-size: 1.2rem;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
        }
          
        .secondary{
          border-radius: 5px;
          padding: 0.6rem 0;
          background: #ffff;
          border: 1px solid #4B761F;
          color:#333;
          width: 100%;    
          text-align: center;
          font-size: 1.2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .primary[disabled]{
          background: #c4c4c4;
          color: #333;
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
