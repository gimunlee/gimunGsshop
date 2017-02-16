var express = require('express');

module.exports = function() {
    var router = express.Router();
    let users = []
    users = [
        {
            'id':"GIMUN",
            'name':"이기문",
            'locations':[
                "여의도역 2번출구",
                "FKI빌딩 23층"
            ],
            'billings':[
                {
                    'type':"우리카드",
                    'number':"1111-2222-3333-4444",
                    'expirationMonth':"12/20",
                },
                {
                    'type':"휴대폰 결제",
                    'phoneNUmber':"010-1111-2222",
                }
            ]
        }
    ]

    router.route('/:userId/locations')
        .get(function(req, res) {
            var targetUser = users.find(function(item){ return item.id == req.params.userId; });
            if(targetUser != undefined) {
                res.send(JSON.stringify(targetUser.locations));
            }
            else {
                res.writeHead(404);
                res.end();
            }
        });
    router.route('/:userId/billings')
        .get(function(req, res) {
            var targetUser = users.find(function(item){ return item.id == req.params.userId;});
            if(targetUser != undefined) {
                res.send(JSON.stringify(targetUser.billings));
            }
            else {
                res.writeHead(404);
                res.send();
            }
        });

    return router;
}