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

const preload = async () => {
    if (!connection.secure) {
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    }
    try {
        token = await authenticate(connection.user, connection.password);
        console.log(token);
    } catch (error) {
        console.log(error);
    }
};

preload();

app.get('/api/getList', async (req, res) => {
    try {
        const data = await jobsByPrefix('ZWEDUMMY', token);
        res.json({ list: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/startSTC', async (req, res) => {
    try {
        const data = await sysviewCommand('/S ZWEDUMMY', token);
        res.json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/stopSTC', async (req, res) => {
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
