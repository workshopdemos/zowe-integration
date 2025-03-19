const connection = require('../connection.json');
const jobsByPrefix = async (prefix, token) => {

    const fetch = require('node-fetch');

    const url = `${connection.scheme}://${connection.secure ? connection.host : connection.ip}:${connection.zowePort}/ibmzosmf/api/v1/zosmf/restjobs/jobs?owner=*&prefix=${prefix}&max-jobs=1000&exec-data=N`;

    let options = {method: 'GET', headers: {
                "X-CSRF-ZOSMF-HEADER": "",
                'Content-Type': 'application/json',
                'Cookie': token
            }};

    return fetch(url, options)
        .then(res => res.json());

};

module.exports = { jobsByPrefix };