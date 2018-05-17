const AntaresProtocol = require('antares-protocol')

const antares = new AntaresProtocol

if (!antares) {
    process.exit(1)
}

console.log('Yay could require AntaresProtocol !')

// run shared functionality
require('./smoke-it-up')(antares)
