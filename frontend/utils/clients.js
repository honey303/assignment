const request = require('request')

// let ec2 = require("ec2-publicip");
// const IP;
// ec2.getPublicIP( (error, ip) => {
//   if (error) console.log(error);
//   IP = ip
//   console.log("Instance Public IP: ", ip);
// });


const clients = (callback) => {
    const url = `http://54.211.89.96:8087/clients`

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
