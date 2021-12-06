const leaselist = require('./list');
const leasedelete = require('./delete');
const reserve = require('./reserve');

module.exports = {
    list: leaselist,
    delete: leasedelete,
    reserve: reserve
}