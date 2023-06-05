import fs from 'fs';
import * as api from '@actual-app/api';

const config = JSON.parse(fs.readFileSync('config.json'));
const dataDir = config.dataDir;

export async function openActual(req, res) {
    const { serverURL, password, budgetId } = req.body;

    await api.init({
        dataDir: dataDir,
        serverURL: serverURL,
        password: password,        
    });
    await api.downloadBudget(budgetId);
    res.sendStatus(200);
}

export async function closeActual(req, res) {
    await api.shutdown();
    res.sendStatus(200);
}