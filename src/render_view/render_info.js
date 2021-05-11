export const toInfo = () => {
  const btnAleja = document.getElementById("link-alejandra");
  const btnAndrea = document.getElementById("link-andrea");
  const btnTatiana = document.getElementById("link-tatiana");

  btnAleja.addEventListener("click", () => window.open("https://github.com/aleperz"));
  btnAndrea.addEventListener("click", () => window.open("https://github.com/Andy164"));
  btnTatiana.addEventListener("click", () => window.open("https://github.com/Tatiroa994"));
};
