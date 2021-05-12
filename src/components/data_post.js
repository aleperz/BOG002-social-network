export class DataPost extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
  }

  static get observedAttributes() {
    return [""];
  }

  attributeChangedCallback(atrr, oldValue, newValue) {
    this[atrr] = newValue;
  }

  static getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `    
    <div class="container-post">
    <img class="photo"/>
    <div class="container-name-date">
      <h3 class="name"></h3>
      <p class="date"></p>
    </div>
    <div class="container-message-like">
      <p class="description"></p>
      <div class="container-like-com">
        <btn-like class="like"></btn-like>
        <div class="btn-coment"></div>
        <coment-post class="container-coment none"></coment-post>
      </div>
    </div>
  </div>
        ${DataPost.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
    <style>
      .container-post{
        position:relative;
        display: grid;
        grid-template-columns: 1fr 1.1fr 1fr 1fr 1fr;
        grid-template-rows: max-content;
        grid-template-areas:
          "photo container-name-date container-name-date container-name-date container-name-date"
          "container-message-like container-message-like container-message-like container-message-like container-message-like";
        width: 100%;
        max-width: 600px;
        background: white;
        border-radius: 10px;
        padding: 10px;
        border: solid 1px #c4c4c4;
        box-sizing: border-box;
        box-shadow: 6px 7px 9px -2px rgb(108 103 103 / 35%);
      }
      .photo { 
        grid-area: photo; 
        width: 50px;  
        border-radius: 10px;      
      }
      .container-name-date {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas:
          "name"
          "date";
        grid-area: container-name-date;        
      }
      .name { 
        grid-area: name; 
        margin: 7px 0 0 0;
        color: #2b5203;
        text-transform: capitalize;
    }
    
      .date { 
        grid-area: date; 
        margin: 0;
        color: hsl(240deg 7% 62%);
        font-size: 14px;        
      }

      .container-message-like {
        position:relative;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: max-content;
        grid-template-areas:
          "description"
          "container-like-com";
        grid-area: container-message-like;
      }
      .description { 
        grid-area: description; 
        color: #333;
      }
      .container-like-com {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: max-content;
        grid-template-areas:
        "like btn-coment"
        "container-coment container-coment";     
        border-top: 1px solid #ccccccad;
        padding-top: 6px;
        justify-items: center;
      }
      .like { 
        grid-area: like; 
      }
      .btn-coment { 
        grid-area: btn-coment; 
        background-image: url("./img/coment_icon.svg");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        width: 22px;
        height: 22px;
        cursor: pointer;
      }
      .container-coment { 
        grid-area: container-coment; 
        width: 100%;
        border-top: 1px solid #ccccccad;        
      }
      .none{
        display: none;
      }
    </style>`;
  }

  render() {
    this.shadowRoot.appendChild(DataPost.getTemplate().content.cloneNode(true));
    const btnComent = this.shadowRoot.querySelector(".btn-coment");
    const coments = this.shadowRoot.querySelector("coment-post");
    btnComent.addEventListener("click", () => coments.classList.toggle("none"));
  }

  connectedCallback() {
    this.render();
  }
}
