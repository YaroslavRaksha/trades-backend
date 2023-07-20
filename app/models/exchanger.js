
const executeQuery = require('../helpers/executeQuery');
const {add} = require("nodemon/lib/rules");

const table = 'exchangers';

const createExchangerModel = async ({ address, currencies, }) => await executeQuery(
    'INSERT INTO ?? (address, currencies) VALUES (?, ?)',
    [table, address, currencies]
);

const getExchangerByIdModel = async ({ exchangerId }) => await executeQuery(
    'SELECT address, currencies FROM ?? WHERE id = ?',
    [table, exchangerId]
);

const updateExchangerByIdModel = async ({ exchangerId, address, currencies }) => await executeQuery(
    'UPDATE ?? SET address = ?, currencies = ? WHERE id = ?',
    [table, address, currencies, exchangerId]
)

const getAllExchangersModel = async () => await executeQuery(
    'SELECT * FROM ??',
    [table]
)

const deleteExchangerModel = async ({ exchangerId }) => await executeQuery(
    'DELETE FROM ?? WHERE id = ?',
    [table, exchangerId]
);

module.exports = {
    createExchangerModel,
    getExchangerByIdModel,
    getAllExchangersModel,
    updateExchangerByIdModel,
    deleteExchangerModel,
}