var express = require('express');

module.exports = function(db) {
    var router = express.Router();

    router.route('/:userId/locations')
        .get(function(req, res) {
            db.getLocations(req.params.userId,function(locations) {
                res.json(locations);
            });
        });
    router.route('/:userId/billings')
        .get(function(req, res) {
            db.getBillings(req.params.userId,function(billings) {
                res.json(billings);
            });
        });
    router.route('/:userId')
        .get(function(req, res) {
            var user;
            db.getUser(req.params.userId, function(user) {
                console.log(user);
                res.json(user);
            },req.query.fields);
        });
    router.route('/')
        .get(function(req, res) {
            var users;
            db.getUsers(function(users) {
                console.log(users);
                res.json(users);
            },req.query.fields);
        })
        .post(function(req, res) {
        });

    return router;
}