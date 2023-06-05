import express from 'express';

import { getAccounts, createAccount, updateAccount, closeAccount, reopenAccount, deleteAccount } from './endpoints/account.js'
import { getBudgetMonths, getBudgetMonth, setBudgetAmount, setBudgetCarryover } from './endpoints/budget.js'
import { getCategoryGroups, createCategoryGroup, updateCategoryGroup, deleteCategoryGroup } from './endpoints/category_group.js';
import { getCategories, createCategory, updateCategory, deleteCategory } from './endpoints/category.js';
import { getConfig, setConfig } from './endpoints/config.js';
import { getPayeeRules, createPayeeRule, updatePayeeRule, deletePayeeRule } from './endpoints/payee_rule.js';
import { getPayees, createPayee, updatePayee, deletePayee } from './endpoints/payee.js';
import { getTransactions, addTransactions, importTransactions, updateTransaction, deleteTransaction } from './endpoints/transaction.js';
import { openActual, closeActual } from './utils/actual.js'


const app = express();
export { app as endpoints };


app.get('/config/:id', getConfig);
app.post('/config', setConfig);
app.post('/open', openActual);
app.post('/close', closeActual);

/* ----------------- BUDGETS ----------------- */
app.get('/budget', getBudgetMonths);
app.get('/budget/:month', getBudgetMonth);
app.put('/budget/:month/amount', setBudgetAmount);
app.put('/budget/:month/carryover', setBudgetCarryover);

/* --------------- TRANSACTIONS --------------- */
app.get('/transactions/:acctId', getTransactions);
app.post('/transactions/:acctId', addTransactions);
app.post('/transactions/:acctId/import', importTransactions);
app.patch('/transaction/:txId', updateTransaction);
app.delete('/transaction/:txId', deleteTransaction);

/* ----------------- ACCOUNTS ----------------- */
app.get('/accounts', getAccounts);
app.post('/account', createAccount);
app.patch('/account/:acctId', updateAccount);
app.post('/account/:acctId/close', closeAccount);
app.post('/account/:acctId/reopen', reopenAccount);
app.delete('/account/:acctId', deleteAccount);

/* ----------------- CATEGORIES ----------------- */
app.get('/categories', getCategories);
app.post('/category', createCategory);
app.patch('/category/:catId', updateCategory);
app.delete('/category/:catId', deleteCategory);

/* --------------- CATEGORY GROUPS --------------- */
app.get('/category/groups', getCategoryGroups);
app.post('/category/group/:groupId', createCategoryGroup);
app.patch('/category/group/:groupId', updateCategoryGroup);
app.delete('/category/group/:groupId', deleteCategoryGroup);

/* ----------------- PAYEES ----------------- */
app.get('/payees', getPayees);
app.post('/payee', createPayee);
app.post('/payee/:payeeId', updatePayee);
app.delete('/payee/:payeeId', deletePayee);

/* --------------- PAYEE RULES --------------- */
app.get('/payee/rules', getPayeeRules);
app.post('/payee/:payeeId/rule', createPayeeRule);
app.post('/payee/rule/:rule_id', updatePayeeRule);
app.delete('/payee/rule/:rule_id', deletePayeeRule);

/* --------------- AQL --------------- */
// TODO