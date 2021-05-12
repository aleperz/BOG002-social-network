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
      const btnComent = this.shadowRoot.getElementById("btn-coment");
      btnComent.classList.toggle("none");
      inputComent.value = "";
    }
  }

  static getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `    
    
    <div class="container-coment">
      <div class="container-input">
        <input placeholder="Escribe tu comentario..."><div id="btn-coment" class="icon-send none"></div>
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
        .none{
          display:none;
        }
         </style>`;
  }

  render() {
    this.shadowRoot.appendChild(ComentsPost.getTemplate().content.cloneNode(true));
    const input = this.shadowRoot.querySelector("input");
    const btnComent = this.shadowRoot.getElementById("btn-coment");
    input.addEventListener("input", () => {
      const inpuntLength = input.value.trim().length;
      if (inpuntLength) btnComent.classList.remove("none");
      else btnComent.classList.add("none");
    });
  }

  connectedCallback() {
    this.render();
    document.addEventListener("cleanContent", this);
  }
}
