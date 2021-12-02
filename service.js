var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name:'DHCP Management Service',
    description: 'DHCP Management Service',
    script: 'C:\\win-dhcp-api\\bin\\www'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
    svc.start();
});

svc.install();