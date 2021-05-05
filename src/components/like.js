export class BtnLike extends HTMLElement {
  constructor() {
    super();
    this.currentRoute = window.location.hash;
    this.attachShadow({
      mode: "open",
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
    <div></div>
    ${BtnLike.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
      <style>
      div{
        position: absolute;
        top: 2px;
        right: 4px;
        background-image: url("./img/icon_like.svg");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        width: 22px;
        height: 22px;
        cursor: pointer;
      }

      .active{
        background-image: url("./img/icon_like_active.svg");
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
