export class InputGroup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
  }

  static get observedAttributes() {
    return ["type", "placeholder"];
  }

  attributeChangedCallback(atrr, oldValue, newValue) {
    if (atrr === "type") {
      this.type = newValue;
    }
    if (atrr === "placeholder") {
      this.placeholder = newValue;
    }
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `    
    <label class="label">
      <slot name="title"></slot>
    </label>
    <input type="${this.type}" placeholder="${this.placeholder}" class="input">
   
    ${InputGroup.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
    <style>
      .label{
        display: block;
        margin-bottom: 5px;
    }
    .input{
        display: block;
        margin-bottom: 16px;
        padding: 0.2rem; 
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
