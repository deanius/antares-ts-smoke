import {default as AntaresProtocol, Action} from 'antares-protocol'

const antares = new AntaresProtocol

if (!antares) {
    process.exit(1)
}

console.log('Yay could import AntaresProtocol !')

// run shared functionality
require('./smoke-it-up')(antares)
