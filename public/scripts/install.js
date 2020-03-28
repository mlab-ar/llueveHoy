"use strict";

let deferredInstallPrompt = null;
const installButton = document.getElementById("butInstall");
installButton.addEventListener("click", installPWA);

//Agregar escucha de eventos para el evento beforeinstallprompt
window.addEventListener("beforeinstallprompt", saveBeforeInstallPromptEvent);

/**
 * Controlador de eventos para el evento beforeinstallprompt.
 * Guarda el evento y muestra el botón de instalación.
 *
 * @param {Event} evt
 */
function saveBeforeInstallPromptEvent(evt) {
  //Para guardar el evento y muestre el botón de instalación.
  deferredInstallPrompt = evt;
  installButton.removeAttribute("hidden");
}

/**
 * Controlador de eventos para butInstall: realiza la instalación PWA.
 *
 * @param {Event} evt
 */
function installPWA(evt) {
  //Para que muestre el mensaje de instalación y oculte el botón de instalación.
  deferredInstallPrompt.prompt();
  // Ocultar el botón de instalación, no se puede llamar dos veces.
  evt.srcElement.setAttribute("hidden", true);
  //Registre la respuesta del usuario a la solicitud.
  deferredInstallPrompt.userChoice.then(choice => {
    if (choice.outcome === "accepted") {
      console.log("El Usuario Acepto la Solicitud", choice);
    } else {
      console.log("El Usuario no Acepto la Solicitud", choice);
    }
    deferredInstallPrompt = null;
  });
}

//Agregar escucha de eventos para el evento appinstalled.
window.addEventListener("appinstalled", logAppInstalled);

/**
 * Controlador de eventos para el evento appinstalled.
 * Registre la instalación en analytics o guarde el evento de alguna manera.
 *
 * @param {Event} evt
 */
function logAppInstalled(evt) {
  //Para registrar el evento
  console.log("Aplicación LlueveHoy Instalada.", evt);
}
