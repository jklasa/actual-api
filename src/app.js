import express from 'express';
import * as api from './api.js';
import fs from 'fs';

// Create REST API
const app = express();
app.use(express.json());
app.use('/api', api.endpoints);

app.get('/test', (req, res) => {
    console.log("Test endpoint");
    res.sendStatus(200);
})

export default async function run() {
    // Start the server
    const config = JSON.parse(fs.readFileSync('config.json'));
    app.listen(config.port, config.hostname, () => {
        console.log('Listening on ' + config.hostname + ':' + config.port + '...');
    });
}