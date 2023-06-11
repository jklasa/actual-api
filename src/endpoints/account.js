import { verifyActual } from '../utils/actual.js'
import * as actualApi from '@actual-app/api';

export async function getAccounts(req, res) {
    if (!verifyActual(res)) { return }

    const accounts = await actualApi.getAccounts();
    res.status(200).json(accounts);
}

export function createAccount(req, res) {}

export function updateAccount(req, res) {}

export function closeAccount(req, res) {}

export function reopenAccount(req, res) {}

export function deleteAccount(req, res) {}