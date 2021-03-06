const scopelib = require('../../../lib/dhcp/scope');

module.exports = function(params, callback) {
    scopelib.replicate(params, function(err, response) {
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
                    message: 'Scope replicated successfully',
                    data: response
                }
            }
            callback(false, resp);
        }
    });
}