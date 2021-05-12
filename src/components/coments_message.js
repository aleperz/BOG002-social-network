export class ComentsMessage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: "open",
    });
  }

  static getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `    
    
    <div class="container-message">
      <p class="name"></p>
      <p class="date"></p>
      <p class="description"></p>
    </div>
        ${ComentsMessage.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
        <style>
        *{
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .container-message{
          width: 80%;
          border: 1px solid #c4c4c4;
          border-radius: 5px;
          margin: auto;
          margin-bottom: 1rem;
          background-color: #efeded;
          padding: 10px;
        }
        .name{
          font-weight: bolder;
          font-size: 1rem;
          text-transform: capitalize;
        }
        .date{
          color: #6f6f6f;
          font-size: 11px;
        }
        .description{
          color: #333;
          margin-top: 8px;
        }

        
         </style>`;
  }

  render() {
    this.shadowRoot.appendChild(ComentsMessage.getTemplate().content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }
}
