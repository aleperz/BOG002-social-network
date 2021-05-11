export class InputPassword extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
  }

  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(atrr, oldValue, newValue) {
    this[atrr] = newValue;
    // console.log(newValue, atrr);
  }

  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `    
    <label>
      <slot name="title"></slot>
      </label>
    <div class="container-input">
        <input type="password" placeholder="Ingrese contraseña" class="input-pass">
        <div class="eye"></div>
    </div>
    ${InputPassword.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
    <style>
      label{
        display: block;
        margin-bottom: 5px;
    }
    .input-pass{
        display: block;
        margin-bottom: 16px;
        padding: 0.25rem 2rem 0.25rem 0.2rem;
        box-sizing: border-box;
        width: 100%; 
        border-radius: 5px;
        border: 1px solid #c4c4c4;
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

    .container-input{
      position: relative;
    }

    .eye{
      position: absolute;
      top: 2px;
      right: 4px;
      background-image: url("./img/visibility_on.svg");
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      width: 22px;
      height: 22px;
      cursor: pointer;
    }

    .eye.off-eye{
      background-image: url("./img/visibility_off.svg");
    }

    </style>`;
  }

  showpassword() {
    const btnEyes = this.shadowRoot.querySelector(".eye");
    const inputPassword = this.shadowRoot.querySelector(".input-pass");
    btnEyes.addEventListener("click", () => {
      inputPassword.type = (inputPassword.type === "password") ? "text" : "password";
      btnEyes.classList.toggle("off-eye");
    });
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    const input = this.shadowRoot.querySelector("input");
    this.showpassword();
    input.addEventListener("change", () => {
      this.value = input.value;
      if (this.value) input.classList.remove("error");
    });
  }

  connectedCallback() {
    this.render();
  }
}
