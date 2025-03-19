const connection = require('../connection.json');
const sysviewCommand = async (command, token) => {

    const fetch = require('node-fetch');

    const url = `${connection.scheme}://${connection.secure ? connection.host : connection.ip}:${connection.zowePort}/casysview/api/v1/SYSVIEW/Command?command=${command}`;

    let options = {method: 'GET', headers: {'Content-Type': 'application/json', 'Cookie': token}};

    return fetch(url, options)
        .then(res => res.json());

};

module.exports = { sysviewCommand };
