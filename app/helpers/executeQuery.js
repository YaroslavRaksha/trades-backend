const mysql = require('mysql');
const getError = require('./getError');

const pool = mysql.createPool(({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
}));

const executeQuery = (sql, params = []) => {

    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                reject(getError('rest', 500, 'Could not establish connection with database'));
                return;
            }

            conn.query(sql, params, (err, result) => {
                conn.release();
                if (err) {
                    console.log(err);
                    reject(getError('rest', 500, 'Query execution failed'));
                    return;
                }
                resolve(result);
            });
        });
    });
};


module.exports = executeQuery;