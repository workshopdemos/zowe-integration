const axios = require('axios');
const connection = require('../connection.json');

const jobsByPrefix = async (prefix, token) => {

    const url = `${connection.scheme}://${connection.secure ? connection.host : connection.ip}:${connection.zowePort}/ibmzosmf/api/v1/zosmf/restjobs/jobs?owner=*&prefix=${prefix}&max-jobs=1000&exec-data=N`;
    console.log('jobsByPrefix', url, token);
    const headers = {
        "X-CSRF-ZOSMF-HEADER": "",
        'Content-Type': 'application/json',
        'Cookie': token
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching from zosmf: ${error.message}`);
    }
};

module.exports = { jobsByPrefix };
