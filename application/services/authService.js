const axios = require('axios');
const connection = require('../connection.json');
const hostname = connection.secure ? connection.host : connection.ip;
const gateway_url = `${connection.scheme}://${hostname}:${connection.zowePort}`;

const authenticate = async (username, password) => {

    const url = `${gateway_url}/gateway/api/v1/auth/login`;

    try {
        const response = await axios.post(url, {
            username,
            password
        });
        return response.headers['set-cookie'][0];
    } catch (error) {
        throw new Error(`Error authenticating: ${error.message}`);
    }
};

module.exports = { authenticate };
