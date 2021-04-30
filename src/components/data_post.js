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
    <div class="container-user-data">
      <h3></h3>
      <p></p>
    </div class="contaimer-message">
    <div>
      <p></p>
      <div></div>
    </div>
  </div>
        ${DataPost.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
        <style>
      
         </style>`;
  }

  render() {
    this.shadowRoot.appendChild(DataPost.getTemplate().content.cloneNode(true));
  }

  connectedCallback() {
    this.render();
  }
}
