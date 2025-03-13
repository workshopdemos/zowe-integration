const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const secure = false;

const scheme = "https";
const host = secure ? "<host>" : "<ip>";
const port = "7554";

const service1 = `${scheme}://${host}:${port}/gateway/api/v1/version`;
const service2 = `${scheme}://${host}:${port}/ibmzosmf/api/v1/zosmf/info`;

const app = express();
const app_port = 8080;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Get auth token // "Authorization": "Basic ",
const service2_headers = {
    "X-CSRF-ZOSMF-HEADER": "",
    "accept": "application/json"
}

app.get('/api/combined', async (req, res) => {
    if (!secure) {
        process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    }
    try {
        const [res1, res2] = await Promise.all([
            axios.get(service1),
            axios.get(service2, { headers: service2_headers } )
        ]);

        // console.log('status', res2.status);
        // console.log('headers', res2.headers);
        // console.log('body', JSON.stringify(res2.body));

        res.json({service1: res1.data, service2: res2.data});
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch data'});
    }
});

app.listen(app_port, () => {
    console.log(`Server is running at http://localhost:${app_port}`)
});
