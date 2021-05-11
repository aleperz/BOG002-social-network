const printToatsError = (messageError) => {
  const toastError = document.getElementById("error-toast");
  const toastErrorSpan = toastError.shadowRoot.querySelector("span");
  toastErrorSpan.innerHTML = messageError;
  toastError.shadowRoot.querySelector("div").classList.add("show");
};

export const printToatsDone = (messageDone) => {
  const toastError = document.getElementById("done-toast");
  const toastErrorSpan = toastError.shadowRoot.querySelector("span");
  toastErrorSpan.textContent = messageDone;
  toastError.shadowRoot.querySelector("div").classList.add("show");
};

export const getErrorFirebase = (error, ...input) => {
  let messageError;
  switch (error.code) {
    case "auth/argument-error":
      if (input.length > 1) {
        messageError = "Debe ingresar correo y contraseña";
        input[0].classList.add("error");
        input[1].classList.add("error");
      } else input[0].classList.add("error");
      messageError = "Debe ingresar correo";
      break;
    case "auth/invalid-email":
      messageError = "Correo invalido";
      input[0].classList.add("error");
      break;
    case "auth/wrong-password":
      messageError = "Contraseña invalida si no la recuerda haga clik en olvide la contraseña";
      input[1].classList.add("error");
      break;
    case "verificacion":
      messageError = "por favor realizar verificacion del correo";
      input[0].classList.add("error");
      break;
    case "auth/email-already-in-use":
      messageError = "Correo ya esta registrado";
      input[0].classList.add("error");
      break;
    case "auth/weak-password":
      messageError = "La contraseña debe tener minino 6 caracteres ";
      input[1].classList.add("error");
      break;
    case "wrong/name":
      messageError = "Debes ingresar tu nombre";
      input[0].classList.add("error");
      break;
    case "auth/user-not-found":
      messageError = "El correo no esta registrado";
      input[0].classList.add("error");
      break;
    case "wrong/passOld":
      messageError = "Ingrese su actual contraseña";
      input[0].classList.add("error");
      break;
    default:
      messageError = "Ha ocurrido un error inesperado";
      break;
  }
  printToatsError(messageError);
};
