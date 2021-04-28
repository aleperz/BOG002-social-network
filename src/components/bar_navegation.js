export class BarNavegation extends HTMLElement {
  constructor() {
    super();
    this.currentRoute = window.location.hash;
    this.attachShadow({
      mode: "open",
    });
  }

  changeRoute() {
    const timeline = this.shadowRoot.querySelector(".btn-home");
    const perfil = this.shadowRoot.querySelector(".btn-perfil");
    const settings = this.shadowRoot.querySelector(".btn-settings");
    switch (this.currentRoute) {
      case "#timeline":
        timeline.classList.add("active");
        break;
      case "#profile":
        perfil.classList.add("active");
        break;
      case "#settings":
        settings.classList.add("active");
        break;
      default:
        break;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
    <nav  class="container-bar">
    <a href="#timeline" class="btn-home"></a>
    <a href="#profile" class="btn-perfil"></a>
    <a href="#settings" class="btn-settings"></a>
    </nav>
    ${BarNavegation.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
      <style>
    .container-bar{
        display: grid;
        grid-template-columns: repeat(3, 1fr); 
        grid-wrap: 2px;
        justify-items: center;
        width: 100%;
        height: 50px;
        box-shadow: 4px 0px 6px 1px rgba(0, 0, 0, 0.25);
        position: fixed;
        bottom: 0;
    }
    
    .btn-home{
        background-image: url(./img/home.svg);
        background-size: 40px;
        background-position: center;
        background-repeat: no-repeat; 
        width: 100%;
        height: 100%; 
    }
    
    .btn-perfil{
        background-image: url(./img/user.svg);
        background-size: 40px;
        background-position: center;
        background-repeat: no-repeat; 
        width: 100%;
        height: 100%;  
    }
    
    .btn-settings{
        background-image: url(./img/menu.svg);
        background-size: 40px;
        background-position: center;
        background-repeat: no-repeat; 
        width: 100%;
        height: 100%; 
    }

    .active{
      background-color: #A0C417;
    }

    @media screen and (min-width: 900px) {
    .container-bar{
      grid-template-columns: 1fr; 
      width: 10%;
      height: calc(100% - 52.7px);
      left: 0;
      align-items: center;
    } 

    </style>`;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    this.changeRoute();
  }

  connectedCallback() {
    this.render();
  }
}
