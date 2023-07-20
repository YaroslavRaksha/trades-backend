
const executeQuery = require('../helpers/executeQuery');
const getError = require("../helpers/getError");

const table = 'morning_existence';

const createMorningExistenceModel = async ({ exchangerId, date, data }) => {
    const values = data.map(({ currency, amount }) => [exchangerId, date, currency, amount]);
    const query = 'INSERT INTO ?? (exchanger_id, date, currency, amount) VALUES ?';
    const params = [table, values];

    await executeQuery(query, params);
};

const deleteCurrencyFromMorningExistence = async ({ exchangerId, currencies }) => {
    const query = 'DELETE FROM ?? WHERE exchanger_id = ? AND currency IN (?)';
    const params = [table, exchangerId, currencies];

    await executeQuery(query, params);
};

const getMorningExistenceModel = async ({ exchangerId, date }) => await executeQuery(
    'SELECT currency, amount FROM ?? WHERE exchanger_id = ? AND date = ?',
    [table, exchangerId, date]
)

const getPreviousMorningExistenceModel = async ({ exchangerId, date }) => await executeQuery(
    'SELECT currency, amount FROM ?? WHERE exchanger_id = ? AND date < ? AND date = (SELECT MAX(date) FROM ?? WHERE date < ?)',
    [table, exchangerId, date, table, date]
);

const putMorningExistenceModel = async ({ exchangerId, date, currency, amount }) => {

    const putMorningExistence = await executeQuery(
        'UPDATE ?? SET amount = ? WHERE exchanger_id = ? AND date = ? AND currency = ?',
        [table, amount, exchangerId, date, currency]
    );

    if(putMorningExistence?.affectedRows === 0) {
        throw getError('rest', 400, 'Ошибка при записи наличия на утро.')
    }
};

const deleteMorningExistenceByExchangerIdModel = async ({ exchangerId }) => await executeQuery(
    'DELETE FROM ?? WHERE exchanger_id = ?',
    [table, exchangerId]
)


module.exports = {
    createMorningExistenceModel,
    deleteCurrencyFromMorningExistence,
    putMorningExistenceModel,
    getMorningExistenceModel,
    getPreviousMorningExistenceModel,
    deleteMorningExistenceByExchangerIdModel,
}