const powershell = require('../../powershell');
const config = require('../../../config');

module.exports = function(params, callback) {
    if(config.CLUSTERED) {
        powershell.runCommand({ cmd: 'Invoke-DhcpServerv4FailoverReplication -ScopeId ' + params.scopeid + ' -Force' }, function(err, resp) {
            if(err) {
                callback(err, false);
            } else {
                callback(false, false);
            }
        });
    } else {
        callback(false, false);
    }
}