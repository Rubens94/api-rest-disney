const getExpeditiousCache = require('express-expeditious');

// Solo sirve con las rutas que tienen método GET
const defaultOptions = {
    namespace: 'expresscache',
    defaultTtl: '1 minute', // tiempo para guardar la cache en la RAM
    statusCodeExpires: {
        404: '5 minutes',
        500: 0 
    }
}

const cacheInit = getExpeditiousCache(defaultOptions);

module.exports = { cacheInit };