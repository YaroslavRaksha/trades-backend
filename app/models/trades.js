
const executeQuery = require('../helpers/executeQuery');

const table = 'trades';

const createTradeModel = async ({ exchangerId, date, time, type, currency, course, amount }) => await executeQuery(
    'INSERT INTO ?? (exchanger_id, date, time, type, currency, course, amount) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [table, exchangerId, date, time, type, currency, course, amount]
);

const getTradesModel = async ({ exchangerId, date, currency }) => await executeQuery(
    'SELECT id, type, time, currency, course, amount FROM ?? WHERE exchanger_id = ? AND date = ? AND currency = ?',
    [table, exchangerId, date, currency]
);

const updateTradeByIdModel = async ({ tradeId, key, value }) => await executeQuery(
    'UPDATE ?? SET ?? = ? WHERE id = ?',
    [table, key, value, tradeId]
);

const deleteTradeByIdModel = async ({ tradeId }) => await executeQuery(
    'DELETE from ?? WHERE id = ?',
    [table, tradeId]
);

const deleteTradesByCurrencyModel = async ({ exchangerId, currencies }) => {
    await executeQuery(
        'DELETE FROM ?? WHERE currency IN (?) AND exchanger_id = ?',
        [table, currencies, exchangerId]
    )
};

const getPreviousTradesModel = async ({ exchangerId, date }) => await executeQuery(
    'SELECT type, course, currency, amount FROM ?? WHERE exchanger_id = ? AND date = (SELECT MAX(date) FROM ?? WHERE exchanger_id = ? AND date < ?)',
    [table, exchangerId, table, exchangerId, table, date]
);

const deleteTradesByExchangerIdModel = async ({ exchangerId, }) => await executeQuery(
    'DELETE FROM ?? WHERE exchanger_id = ?',
    [table, exchangerId]
)

module.exports = {
    createTradeModel,
    getTradesModel,
    updateTradeByIdModel,
    deleteTradeByIdModel,
    deleteTradesByCurrencyModel,
    getPreviousTradesModel,
    deleteTradesByExchangerIdModel,
}