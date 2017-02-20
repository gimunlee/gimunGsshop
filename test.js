var express = require('express');
var db = require('./db');

module.exports = function() {
    var router = express.Router();
    router.route('/')
        .get(function(req, res) {
            console.log('test');
            res.send('test');
        });
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
    router.route('/products')
        .get(function(req, res) {
            db.getProducts(function(products) {
                res.json(products);
                console.log(products);
            },req.query.fields);
        });
    router.route('/users')
        .get(function(req, res) {
            var users;
            db.getUsers(function(users) {
                console.log(users);
                res.json(users);
            },req.query.fields);
        })
        .post(function(req, res) {
        });
    router.route('/users/:id')
        .get(function(req, res) {
            var user;
            db.getUser(req.params.id, function(user) {
                console.log(user);
                res.json(user);
            },req.query.fields);
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
    router.route('/users/:id/locations')
        .get(function(req, res) {
            db.getLocations(req.params.id,function(locations) {
                res.json(locations);
            });
        });
    router.route('/users/:id/billings')
        .get(function(req, res) {
            db.getBillings(req.params.id,function(billings) {
                res.json(billings);
            });
        });
    router.route('/init')
        .all(function(req, res) {
            db.init();
            res.send("initialization");
        });
    return router;
}