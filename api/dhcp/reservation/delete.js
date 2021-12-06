const reservationlib = require('../../../lib/dhcp/reservation');

module.exports = function(params, callback) {
    reservationlib.delete(params, function(err, response) {
        if(err) {
            let resp = {
                status: 500,
                headers: [],
                body: {
                    result: 'error',
                    message: err,
                    data: null
                }
            }
            callback(false, resp);
        } else {
            let resp = {
                status: 200,
                headers: [],
                body: {
                    result: 'success',
                    message: 'Reservation successfully deleted',
                    data: response
                }
            }
            callback(false, resp);
        }
    });
}