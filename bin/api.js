'use strict'
global.Promise = require('bluebird')
const express = require('express')
const logger = require('@open-age/logger')('bin/api').start('booting')
const http = require('http')
const webServerConfig = require('config').get('webServer')

var app = express()

require('../helpers/string')
require('../settings/database').configure(logger)
require('../settings/express').configure(app, logger)
require('../settings/routes').configure(app, logger)
require('../settings/offline-processor').configure(logger)

var port = process.env.PORT || webServerConfig.port
logger.info(`environment: ${process.env.NODE_ENV} port: ${port}`)

logger.info('starting server')
http.createServer(app).listen(port, function () {
    logger.info(`listening on http://localhost:${port}`)
    logger.end()
})

module.exports = app
