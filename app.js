let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var db = require('./db');

const uuidV4 = require('uuid/v4');

// const PRODUCT_SAMPLE = {
//     'name' : "G pad 3 10.1",
//     'category' : "Mobile",
//     'price' : 400000,
//     'image' : null,
//     'options' : {
//         'color' : "Black"
//     }
// }
// const DELIVERY_SAMPLE = {
//     'id' : uuidV4(),
//     'product' : newProduct(),
//     'transportation' : "Daehan Express",
//     'currentLocation' : "Daejon",
//     'from' : "여의도 FKI빌딩 23층 신기술개발팀",
//     'to' : "여의도 FKI빌딩 20층 행복마루",
//     'estimatedTimeToArrive' : "2017년 2월 25일 저녁",
//     'message' : "비밀번호 1234입니다. 문 앞에 두어주세요."
// }

// let live = newProduct();
// let deliveries = [DELIVERY_SAMPLE];

app.set('port', process.env.PORT || 8080);

/////////////////////////////////////////

app.get("/", function(req, res) {
    res.send("Welcome to Voice Shop server!");
});

var test = require('./test');
app.use('/test',test(db));
/////////////////////////////////////////

var query = require('./query');
app.use('/',query(db));

var userQuery = require('./userQuery');
app.use('/users',userQuery(db));

app.get('/test',function(req, res) {
    res.json("{'message':'this is for the test', 'koreanMessage':'이것은 테스트입니다.'}");});

//////////////////////////////////////////
app.listen(app.get('port'), function() {
    console.log("listening to " + app.get('port'));
});
