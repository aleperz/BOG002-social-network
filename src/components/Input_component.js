export class InputGroup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
  }

  static get observedAttributes() {
    return ["type", "placeholder", "value"];
  }

  attributeChangedCallback(atrr, oldValue, newValue) {
    this[atrr] = newValue;
    // console.log(newValue, atrr);
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `    
    <label>
      <slot name="title"></slot>
    </label>
    <input type="${this.type}" placeholder="${this.placeholder}">
   
    ${InputGroup.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
    <style>
      label{
        display: block;
        margin-bottom: 5px;
    }
    input{
        display: block;
        margin-bottom: 16px;
        padding: 0.2rem; 
        width: 100%; 
        border-radius: 5px;
        border: 1px solid #c4c4c4;
        box-sizing: border-box;
        }
    input:focus{
        outline: none;
        border-color: #4b761f;
        box-shadow: 0 0 0 0.25rem rgb(161 196 23 /35%);
    }

    .error{
      border: solid red 2px;
      border-radius: 5px;
      box-shadow: 0 0 0 0.25rem rgb(230 46 45 /35%);
    }
     </style>`;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    const input = this.shadowRoot.querySelector("input");
    input.addEventListener("change", () => {
      this.value = input.value;
      if (this.value) input.classList.remove("error");
    });
  }

  connectedCallback() {
    this.render();
  }
}
