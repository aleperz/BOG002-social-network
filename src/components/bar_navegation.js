export class BarNavegation extends HTMLElement {
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
    <nav  class="container-bar">
        <div class="btn-home"><a href="#"></a></div>
        <div class="btn-perfil"><a href="#"></a></div>
        <div class="btn-settings"><a href="#"></a></div>
    </nav>
      ${BarNavegation.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
      <style>
    .container-bar{
        list-style-type: none;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(3, 1fr); 
        grid-wrap: 2px;
        justify-items: center;
        width: 100%;
        height: auto;
        box-shadow: 4px 0px 6px 1px rgba(0, 0, 0, 0.25);
        position: fixed;
        bottom: 0;
    }
    
    .btn-home{
        background-image: url(./img/icon_home.svg);
        background-size: 40px;
        background-position: center;
        background-repeat: no-repeat; 
        width: 50px;
        height: 50px; 
    }
    
    .btn-perfil{
        background-image: url(./img/icon_perfil.svg);
        background-size: 40px;
        background-position: center;
        background-repeat: no-repeat; 
        width: 50px;
        height: 50px; 
    }
    
    .btn-settings{
        background-image: url(./img/menu_mobile.svg);
        background-size: 40px;
        background-position: center;
        background-repeat: no-repeat; 
        width: 50px;
        height: 50px;
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
  }

  connectedCallback() {
    this.render();
  }
}
