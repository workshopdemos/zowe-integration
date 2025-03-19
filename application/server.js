const express = require('express');
const cors = require('cors');
const path = require('path');
const connection = require('./connection.json');

const { authenticate } = require('./services/authService'); 
const { sysviewCommand } = require('./services/sysview');
const { jobsByPrefix } = require('./services/zosmf');

const app = express();
const app_port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let token = '';
let logMessagesQueue = [];

const preload = async () => {
    if (!connection.secure) {
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    }
    try {
        token = await authenticate(connection.user, connection.password);
        logMessagesQueue.push(`SERVER:  Authenticated`);
    } catch (error) {
        logMessagesQueue.push(`SERVER:  Failed to authenticate: ${error}`);
    }
};

preload();

app.get('/api/log', (req, res) => {
    res.json({ logMessages: logMessagesQueue });
    logMessagesQueue = [];
});


app.get('/api/getList', async (req, res) => {
    logMessagesQueue.push('SERVER:  Get jobs by prefix ZWEDUMMY');
    try {
        const data = await jobsByPrefix('ZWEDUMMY', token);
        res.json({ list: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/startSTC', async (req, res) => {
    logMessagesQueue.push('SERVER:  Issuing /S ZWEDUMMY command');
    try {
        const data = await sysviewCommand('/S ZWEDUMMY', token);
        res.json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/stopSTC', async (req, res) => {
    logMessagesQueue.push('SERVER:  Issuing /C ZWEDUMMY command');
    try {
        const data = await sysviewCommand('/C ZWEDUMMY', token);
        res.json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(app_port, () => {
    console.log(`Server is running at http://localhost:${app_port}`)
});
