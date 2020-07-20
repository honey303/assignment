const request = require('request')

const clients = (callback) => {
    const url = 'http://0.0.0.0:8087/clients'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the api!', error)
        }
        else {
            callback(undefined, body)
        }
    })
}

module.exports = clients
