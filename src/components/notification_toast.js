export class NotificacionToast extends HTMLElement {
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

  getSrcImg() {
    switch (this.class) {
      case "error":
        this.src = "./img/errorIcon.svg";
        break;
      case "done":
        this.src = "./img/doneIcon.svg";
        break;
      case "warn":
        this.src = "./img/warnIcon.svg";
        break;
      default:
        break;
    }
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
    <div class="${this.class}">
        <h2>
         <slot name="title"></slot>
        </h2>
        <img src="${this.src}"
  </div>      
      ${NotificacionToast.getStyles()}
      ${this.getSrcImg()}`;
    return template;
  }

  static getStyles() {
    return `
    <style>
      div{
        visibility: hidden; 
        min-width: 250px; 
        margin-left: -125px; 
        background-color: #fff;
        color: #333
        text-align: center; 
        border-radius: 2px; 
        padding: 16px; 
        position: fixed;
        z-index: 1; 
        left: 50%; 
        bottom: 30px;
      }

      .error{
        border-left: solid 4px #fe0404;
      }

      .done{
        border-left: solid 4px #4b761f;
      }

      .warn{
        border-left: solid 4px #fbbc05;  
      }

      div.show {
        visibility: visible;                
        -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
        animation: fadein 0.5s, fadeout 0.5s 2.5s;
      }
      
        @-webkit-keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 30px; opacity: 1;}
      }
      
      @keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 30px; opacity: 1;}
      }
      
      @-webkit-keyframes fadeout {
        from {bottom: 30px; opacity: 1;}
        to {bottom: 0; opacity: 0;}
      }
      
      @keyframes fadeout {
        from {bottom: 30px; opacity: 1;}
        to {bottom: 0; opacity: 0;}
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
