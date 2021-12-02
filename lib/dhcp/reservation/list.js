const powershell = require('../../powershell');

var cachedresp = {};
var reqcallbacks = [];

module.exports = function(params, callback) {
    let index = 'ClientId';
    if(params.index) {
        index = params.index;
    }
    if(cachedresp[index] && params.updatecache != true) {
        callback(false, cachedresp[index]);
    } else {
        if(reqcallbacks.length == 0) {
            delete cachedresp[index];
            reqcallbacks.push(callback);
            powershell.runCommand({ cmd: 'Get-DhcpServerv4Scope | Get-DhcpServerv4Reservation | ConvertTo-Json' }, function(err, portresp) {
                if(err) {
                    callback(err, false);
                } else {
                    let ipprops = ['IPAddress', 'ScopeId'];;
                    let ports = JSON.parse(portresp.stdout.toString());
                    cachedresp[index] = {};
                    for(let i = 0; i <= ports.length - 1; i++) {
                        delete ports[i].CimSystemProperties;
                        delete ports[i].CimInstanceProperties;
                        delete ports[i].CimClass;
                        for(let j = 0; j <= ipprops.length - 1; j++) {
                            ports[i][ipprops[j]] = ports[i][ipprops[j]].IPAddressToString;
                        }
                        if(cachedresp[index].hasOwnProperty(ports[i][index])) {
                            cachedresp[index][ports[i][index]].push(ports[i]);
                        } else {
                            cachedresp[index][ports[i][index]] = [ports[i]];
                        }
                    }
                    //console.log(cachedresp);

                    while(reqcallbacks.length >= 1) {
                        let cb = reqcallbacks.shift();
                        cb(false, cachedresp[index]);

                    }
                }
            });
        } else {
            reqcallbacks.push(callback);
        }
    }
}