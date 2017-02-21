var express = require('express');

module.exports = function(db) {
    var router = express.Router();

    router.route('/live')
        .get(function(req, res) {
            db.getLive(function(liveProduct) {
                res.send(liveProduct);
            },req.query.fields);
        })
        .put(function(req, res) {
            db.putLive(req.body,function() {
                res.sendStatus(202);
            });
        });
    router.route('/deliveries')
        .get(function(req, res) {
            db.getDeliveries(function(deliveries) {
                console.log(deliveries);
                res.json(deliveries);
            },req.query.fields);
        })
        .delete(function(req, res) {
            db.deleteDeliveries(function() {
                res.sendStatus(202);
            });
        })
        .post(function(req, res) {
            db.postDeliveries(req.body,function() {
                res.sendStatus(202);
            });
        });
    router.route('/deliveries/:id')
        .get(function(req, res) {
            db.getDelivery(req.params.id,function(delivery) {
                res.json(delivery);
            });
        })
        .put(function(req, res) {
            db.putDelivery(req.params.id,req.body,function() {
                res.sendStatus(202);
            });
        });
        // .delete(function(req, res) {
        //     var targetItem = deliveries.find(function(item) { return item.id == req.params.id});
        //     if(targetItem!=undefined) {
        //         var targetIndex = deliveries.indexOf(targetItem);
        //         deliveries.splice(targetIndex,1);
        //         res.send();
        //     }
        //     else {
        //         res.writeHead(404);
        //         res.send();
        //     }
        // });
    router.route('/products')
        .get(function(req, res) {
            db.getProducts(function(products) {
                res.json(products);
                console.log(products);
            },req.query.fields);
        });
        
    return router;
};