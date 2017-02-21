var express = require('express');

module.exports = function(db) {
    var router = express.Router();
    router.route('/')
        .get(function(req, res) {
            console.log('test');
            res.send('test');
        });
    router.route('/init')
        .all(function(req, res) {
            db.init();
            res.send("initialization");
        });
    return router;
}