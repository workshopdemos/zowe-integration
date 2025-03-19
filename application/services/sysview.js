const connection = require('../connection.json');
const hostname = connection.secure ? connection.host : connection.ip;
const sysviewCommand = async (command, token) => {

    // Paste SYSVIEW command snippet here 



};

module.exports = { sysviewCommand };
