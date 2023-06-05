import * as db from '../utils/db.js';

export function getConfig(req, res) {
    const configId = req.params.id;
    const config = db.getConfig(configId);

    if (config) {
        const { serverURL, password, budgetID } = config;
        res.json({ id: configId, serverURL, password, budgetID });
    } else {
        res.status(404).json({ error: 'Configuration not found' });
    }
}

export function setConfig(req, res) {
    const { serverURL, password, budgetID } = req.body;
    const configId = db.saveConfig(serverURL, password, budgetID);
    
    res.status(201).json({ id: configId });
}
