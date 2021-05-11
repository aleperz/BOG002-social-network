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
        .container-message{
          width: 80%;
          border: 1px solid #c4c4c4;
          border-radius: 5px;
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
