const { useConfigureInstall } = require('./src/components/UseInstall')

exports.onClientEntry = () => {
  useConfigureInstall()
}
