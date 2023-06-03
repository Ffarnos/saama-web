const { ConfigureInstall } = require('./src/components/UseInstall')

exports.onClientEntry = () => {
  ConfigureInstall()
}
