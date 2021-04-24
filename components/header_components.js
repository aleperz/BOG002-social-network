export class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
    <header class="header">
    <img src="/img/logo.svg" class="logo">
      <h1>EcoIdeate</h1>      
    </header>   
    ${Header.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `  
    <style>   
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&family=Shadows+Into+Light+Two&display=swap");   
    .header{
        display: flex;
        align-items: flex-end;
        font-family: "Shadows Into Light Two", cursive;
        justify-content: center;        
        background: #4b761f;
        width: 100%;
        font-size: 1.5rem;
    }
    .logo{
        width: 45px;
    }

    h1{
        color: white;
        font-size: 2.3rem;
        font-weight: lighter;
        margin: 0;
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
