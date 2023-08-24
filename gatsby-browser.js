const {ConfigureInstall} = require("./src/components/UseInstall");

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
      `La aplicacion se ha actualizado ` +
      `Necesitas recargarla para no perderte los nuevos cambios`
  )

  if (answer === true) {
    window.location.reload()
  }
}

