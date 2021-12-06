const powershell = require('../../powershell');
const scopelib = require('../scope');

let datatypes = {
    "clientid": "string",
    "ipaddress": "string",
    "scopeid": "string"
}

var generateArgs = function(params) {
    let args = [];
    let props = Object.keys(params);
    for(let i = 0; i <= props.length - 1; i++) {
        if(datatypes.hasOwnProperty(props[i])) {
            //console.log('Property definition exists ' + props[i]);
            if(datatypes[props[i]]=='string') {
                if(params[props[i]]) {
                    args.push('-' + props[i] + ' "' + params[props[i]].split('"').join('`"') + '"');
                }
            } else if(datatypes[props[i]]=='bool') {
                if(params[props[i]]) {
                    args.push('-' + props[i] + ':$True')
                } else {
                    args.push('-' + props[i] + ':$False')
                }
            } else {

            }
        }
    }
    return args.join(' ');
}

module.exports = function(params, callback) {
    if(!params.hasOwnProperty('scopeid')) {
        callback('Request must include "scopeid" parameter', false);
        return;
    }
    if(params.hasOwnProperty('ipaddress') || params.hasOwnProperty('clientid')) {
        
    } else {
        callback('Request must include either a "ipaddress" or "clientid" parameter', false);
        return;
    }
    let cmd = 'Get-DhcpServerv4Lease ' + generateArgs(params) + ' | Add-DhcpServerv4Reservation';
    //console.log('powershell ' + cmd);
    powershell.runCommand({ cmd: cmd, waitstdout: false }, function(err, resp) {
        if(err) {
            callback(err, false);
        } else {
            scopelib.replicate(params, function(err, response) {
                if(err) {
                    callback(err, false);
                } else {
                    callback(false, resp.stdout.toString());
                }
            });
        }
    });
}