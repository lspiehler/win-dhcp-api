var express = require('express');
var router = express.Router();
const dhcp = require('../api/dhcp');

/* GET users listing. */
router.get('/dhcp/:object/:action', function(req, res, next) {
    res.set('Cache-Control', 'public, max-age=0, no-cache');
    let params = {
        updatecache: false
    }
    if(req.query.updatecache == 'true') {
        params.updatecache = true;
    }
    if(req.query.index) {
        params.index = req.query.index;
    }
    if(dhcp.hasOwnProperty(req.params.object) && dhcp[req.params.object].hasOwnProperty(req.params.action)) {
        dhcp[req.params.object][req.params.action](params, function(err, resp) {
            //console.log(resp);
            //if(err) {
                if(resp.headers) {
                    for(let i = 0; i <= resp.headers.length - 1; i++) {
                        res.set(resp.headers[i][0], resp.headers[i][1]);
                    }
                }
                res.status(resp.status).json(resp.body);
                //res.status(500).send(err);
            //} else {
            //    res.json(queues);
            //}
        });
    } else {
        res.status(404).send('No route found for ' + req.url);
    }
});

router.post('/dhcp/:object/:action', function(req, res, next) {
    res.set('Cache-Control', 'public, max-age=0, no-cache');
    if(dhcp.hasOwnProperty(req.params.object) && dhcp[req.params.object].hasOwnProperty(req.params.action)) {
        //console.log(req.body);
        dhcp[req.params.object][req.params.action](req.body, function(err, resp) {
            if(resp.headers) {
                for(let i = 0; i <= resp.headers.length - 1; i++) {
                    res.set(resp.headers[i][0], resp.headers[i][1]);
                }
            }
            res.status(resp.status).json(resp.body);
        });
    } else {
        res.status(404).send('No route found for ' + req.url);
    }
});

module.exports = router;
