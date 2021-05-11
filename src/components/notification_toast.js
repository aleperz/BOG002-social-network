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

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
    <div class="${this.class}" id="cont-toast">
      <slot name="image"></slot>
      <div>
        <h2>
         <slot name="title"></slot>
        </h2>
        <span>
          <slot name="message"></slot>
        </span>
      </div>
      <span class="close">X</span>
    </div>      
      ${NotificacionToast.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
    <style>
      div#cont-toast {
        display: flex;
        visibility: hidden; 
        min-width: 250px; 
        color: #333;
        border-radius: 1px 8px 8px 1px; 
        padding: 10px; 
        position: fixed;
        z-index: 1; 
        left: 6%; 
        bottom: 70%;
        box-shadow: rgb(0 0 0 / 20%) 0 0 10px;
        width: 340px;
      }

      div div h2 {
        margin: 0 0 10px 0;
      }

      .error{
        border: solid 1px #e8594c;
        border-left: solid 10px #fe0404;        
        background-color: #f6cfcb;
      }

      .done{
        border-left: solid 10px #4b761f;
        background-color: #d1e7dd;
      }

      .warn{
        border-left: solid 10px #fbbc05;  
        background-color: #fff3cd;
      }

      div#cont-toast.show {
        visibility: visible;                
        -webkit-animation: fadein 0.5s;
        animation: fadein 2s;
      }
      
        @-webkit-keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 70%; opacity: 1;}
      }
      
      @keyframes fadein {
        from {bottom: 0; opacity: 0;}
        to {bottom: 70%; opacity: 1;}
      }
      
      .close{
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 13px;
        font-weight: bold;
      }       
    </style>`;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    const container = this.shadowRoot.querySelector("#cont-toast");
    const close = this.shadowRoot.querySelector(".close");
    close.addEventListener("click", () => {
      container.classList.remove("show");
    });
  }

  connectedCallback() {
    this.render();
  }
}
