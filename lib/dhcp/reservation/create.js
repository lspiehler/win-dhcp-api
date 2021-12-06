const powershell = require('../../powershell');

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
    let cmd = 'Add-DhcpServerv4Reservation ' + generateArgs(params);
    //console.log('powershell ' + cmd);
    powershell.runCommand({ cmd: cmd, waitstdout: false }, function(err, resp) {
        if(err) {
            callback(err, false);
        } else {
            //console.log(resp);
            callback(false, resp);
        }
    });
}