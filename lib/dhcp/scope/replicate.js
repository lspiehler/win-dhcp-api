const powershell = require('../../powershell');

module.exports = function(params, callback) {
    powershell.runCommand({ cmd: 'Invoke-DhcpServerv4FailoverReplication -ScopeId ' + params.scopeid + ' -Force' }, function(err, resp) {
        if(err) {
            callback(err, false);
        } else {
            callback(false, false);
        }
    });
}