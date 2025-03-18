const axios = require('axios');
const connection = require('../connection.json');

const authenticate = async (username, password) => {

    const url = `${connection.scheme}://${connection.secure ? connection.host : connection.ip}:${connection.zowePort}/gateway/api/v1/auth/login`;
    console.log('authenticate', username, password, url);
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
