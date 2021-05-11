export class ComentsPost extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
  }

  handleEvent(event) {
    if (event.type === "cleanContent") {
      const inputComent = this.shadowRoot.querySelector("input");
      inputComent.value = "";
    }
  }

  static getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `    
    
    <div class="container-coment">
      <div class="container-input">
        <input><div class="icon-send"></div>
      </div>
      <div class="messages">
      </div>
    </div>
        ${ComentsPost.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
        <style>
        .container-coment{
          width: 100%;
          padding-top: 10px;
        }

        div.icon-send{
          position: absolute;
          top: 2px;
          right: 20px;
          background-image: url("./img/send1.svg");
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          width: 22px;
          height: 22px;
          cursor: pointer;                      
        }

        .container-input{
          width: 100%;
          position:relative;
          display: flex;
          justify-content: center;  
          margin-bottom: 1rem;        
        }

        input{
          width: 90%;
          padding: 4px 34px 4px 4px; 
          border-radius: 5px;
          border: 1px solid #c4c4c4;
          box-sizing: border-box;
        }
        .messages{
          width: 100%;
        }
         </style>`;
  }

  render() {
    this.shadowRoot.appendChild(ComentsPost.getTemplate().content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
    document.addEventListener("cleanContent", this);
  }
}
