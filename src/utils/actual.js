import fs from 'fs';
import * as api from '@actual-app/api';

const config = JSON.parse(fs.readFileSync('config.json'));
const dataDir = config.dataDir;
let actualOpen = false;

export async function openActual(req, res) {
    try {
        const { serverURL, password, budgetId } = req.body;

        await api.init({
            dataDir: dataDir,
            serverURL: serverURL,
            password: password,        
        });
        await api.downloadBudget(budgetId);
        actualOpen = true;
        res.sendStatus(200);
    } catch (error) {
        res.status(500).send("Error" + error);
        console.log(error.message);
    }
}

export function verifyActual(res) {
    if (!actualOpen) {
        res.status(412).send("Server API connection is not yet initialized.")
        return false;
    }
    return true;
}

export async function closeActual(req, res) {
    await api.shutdown();
    actualOpen = false;
    res.sendStatus(200);
}