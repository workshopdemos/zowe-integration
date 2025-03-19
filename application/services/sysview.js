const axios = require('axios');
const connection = require('../connection.json');

const sysviewCommand = async (command, token) => {

    const encodedCommand = encodeURIComponent(command);
    const url = `${connection.scheme}://${connection.secure ? connection.host : connection.ip}:${connection.zowePort}/casysview/api/v1/SYSVIEW/Command?command=${encodedCommand}`;

    const headers = {
        'Content-Type': 'application/json',
        'Cookie': token
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        throw new Error(`Error issuing sysview command: ${error.message}`);
    }
};

module.exports = { sysviewCommand };





