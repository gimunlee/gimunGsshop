var express = require('express');

module.exports = function(live, deliveries) {
    var router = express.Router();

    router.route('/live')
        .get(function(req, res) {
            res.send(live);
        })
        .put(function(req, res) {
            live = JSON.parse(JSON.stringify(req.body));
            res.writeHead(202);
            res.end();
        });
    router.route('/deliveries')
        .get(function(req, res) {
            res.send(deliveries);
            // console.log(deliveries);
        })
        .delete(function(req, res) {
            deliveries = [];
            res.writeHead(202);
            res.end();
        })
        .post(function(req, res) {
            console.log("post");
            var newUuid = uuidV4();
            console.log(req.body);
            var newItem = JSON.parse(JSON.stringify(req.body));
            newItem.id = newUuid;

            deliveries.push(newItem);

            res.writeHead(202);
            res.end();
        });
    router.route('/deliveries/:id')
        .get(function(req, res) {
            var targetItem = deliveries.find(function(item) { return item.id == req.params.id });
            if(targetItem != undefined) {
                res.send(targetItem);
            }
            else {
                res.writeHead(404);
                res.end();
            }
        })
        .put(function(req, res) {
            console.log("put");
            let targetItem = deliveries.find(function(item) { return item.id == req.params.id });
            let targetIndex = deliveries.indexOf(targetItem);
            let targetId = targetItem.id;
            if(targetIndex == -1) {
                targetIndex = deliveries.push(newDelivery()) -1;
                targetId = uuidV4();
            }
            // console.log(targetItem);
            deliveries[targetIndex] = JSON.parse(JSON.stringify(req.body));
            deliveries[targetIndex].id = targetId;
            res.send();
        })
        .delete(function(req, res) {
            var targetItem = deliveries.find(function(item) { return item.id == req.params.id});
            if(targetItem!=undefined) {
                var targetIndex = deliveries.indexOf(targetItem);
                deliveries.splice(targetIndex,1);
                res.send();
            }
            else {
                res.writeHead(404);
                res.send();
            }
        });
        
    return router;
};