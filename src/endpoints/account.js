import { openActual, closeActual } from '../utils/actual.js'
import * as actualApi from '@actual-app/api';

export function getAccounts(req, res) {
    const accounts = actualApi.getAccounts();
    res.status(200).json(accounts);
}

export function createAccount(req, res) {}

export function updateAccount(req, res) {}

export function closeAccount(req, res) {}

export function reopenAccount(req, res) {}

export function deleteAccount(req, res) {}