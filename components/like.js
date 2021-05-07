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
    <div class="container-like">
      <div class="like"></div>
      <span></span>
    </div>
    ${BtnLike.getStyles()}`;
    return template;
  }

  static getStyles() {
    return `
      <style>
      .like{
        display: inline-block;
        background-image: url("./img/like.svg");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        width: 22px;
        height: 22px;
        cursor: pointer;
      }

      .active{
        background-image: url("./img/like_active.svg");
        animation: move_like 0.8s;
        animation-timing-function:  cubic-bezier(.98,.44,1,.62);
        
      }

      @keyframes move_like{
        0% { transform: rotate(0deg) scale(0, 0);}
        50% { transform: rotate(20deg) scale(1.5, 1.5);}
        100% { transform: rotate(0deg) scale(1, 1);}
      }

      span{
        font-size: 14px;
      }
    </style>`;
  }

  render() {
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    const btnLike = this.shadowRoot.querySelector(".like");
    btnLike.addEventListener("click", () => {
      btnLike.classList.toggle("active");
    });
  }

  connectedCallback() {
    this.render();
  }
}
