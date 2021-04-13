export class MainButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['class'];
  }

  attributeChangedCallback(atrr, oldValue, newValue) {
    this.class = newValue;
  }

  getTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
    <button class="${this.class}">
    <slot name='title'></slot>
    </button> 
    ${this.getStyles()}`;
    return template;
  }

  // eslint-disable-next-line class-methods-use-this
  getStyles() {
    return `
    <style>
        .primary{
        border-radius: 5px;
        padding: 0.5rem 1rem;
        background: #4B761F;
        border: none;
        color:white;
        }   
        
        .secondary{
        border-radius: 5px;
        padding: 0.5rem 1rem;
        background: #ffff;
        border: 1px solid #4B761F;
        color:#333;
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
