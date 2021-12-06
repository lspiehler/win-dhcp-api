const reservationlist = require('./list');
const reservationdelete = require('./delete');
const reservationcreate = require('./create');

module.exports = {
    list: reservationlist,
    delete: reservationdelete,
    create: reservationcreate
}