const connection = require('../connection.json');
const hostname = connection.secure ? connection.host : connection.ip;
const jobsByPrefix = async (prefix, token) => {

    // Paste z/OSMF jobs snippet here



};

module.exports = { jobsByPrefix };