var Db = function() {
};
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect("mongodb://localhost/voiceshop");
var db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error:"));

var billingSchema = mongoose.Schema({
    type:String,
    name:String,
    detail:{}
});
var Billing = mongoose.model('Billing',billingSchema);

var locationSchema = mongoose.Schema({
    alias:String,
    city:String,
    detail:String
});
var Location = mongoose.model('Location',locationSchema);

var userSchema = mongoose.Schema({
    voiceShopId: {
        type:String,
        unique:true
    },
    name: String,
    locations: [locationSchema],
    billings: [billingSchema],
});
var User = mongoose.model('User',userSchema);

var productSchema = mongoose.Schema({
    name:String,
    category:String,
    price:Number,
    image:String,
    options:{}
});
var Product = mongoose.model('Product',productSchema);

var deliverySchema = mongoose.Schema({
    product:[productSchema],
    transportation:String,
    currentLocation:String, // 배송 중 현재 장소
    from:String,
    to:String,
    estimatedTimeToArrive:Date,
    message:String
});
var Delivery = mongoose.model('Delivery',deliverySchema);

// var kittySchema = mongoose.Schema({
//     'name': String
// });
// var Kitten = mongoose.model('Kitten', kittySchema);
// var silence = new Kitten({
//     'name':"Silence"
// });
// console.log(silence.name);
// silence.save(function (err, item) {
//     if (err) return console.error(err);
//     console.log(item.name + " saved.");
// });

// console.log("All");
// Kitten.find(function(err, kittens) {
//     if (err) return console.error(err);
//     console.log(kittens);
// });

// const findName = "Silence";
// console.log("Only " + findName);
// Kitten.find({'name':findName}, function(err, kittens) {
//     if(err) return console.error(err);
//     console.log(kittens);
// })

var liveProduct;
db.once('open', function() {
    console.log("db opened");
    Product.findOne({},function(err,product) {
        liveProduct = product;
        console.log("Initial Live product is " + liveProduct.name);
    });
});
Db.prototype = {
    getLive:function(callback) {
        callback(liveProduct);
    },
    putLive:function(newProduct,callback) {
        // console.log("new Product : " + JSON.stringify(newProduct));
        Product.findById(newProduct.id,function(err, item) {
            // console.log("found " + JSON.stringify(item));
            liveProduct = item;
            callback();
        });
    },
    getUsers:function(callback, fields) {
        User.find({},fields,function(err, users) {
            if(err) return console.error(err);
            callback(users);
        });
    },
    getUser:function(id, callback, fields) {
        User.findOne({voiceShopId:id},function(err, user) {
            if(err) return console.error(err);
            callback(user);
        });
    },
    getProducts:function(callback, fields) {
        Product.find(function(err, products) {
            if(err) return console.error(err);
            callback(products);
        });
    },
    getDeliveries:function(callback, fields) {
        Delivery.find(function(err, deliveries) {
            if(err) return console.error(err);
            callback(deliveries);
        });
    },
    postDeliveries:function(newDeliveryData,callback) {
        var newDelivery = new Delivery(newDeliveryData);
        newDelivery.save(function(err, delivery) {
            if(err) return console.error(err);
            console.log(JSON.stringify(delivery) + "posted");
            callback();
        });
    },
    getDelivery:function(id,callback) {
        Delivery.findById(id,function(err, delivery) {
            if(err) return console.error(err);
            callback(delivery);
        });
    },
    putDelivery:function(id,newDelivery,callback) {
        Delivery.findById(id,function(err, delivery) {
            if(err) return console.error(err);
            for(var key in newDelivery) {
                delivery[key] = newDelivery[key];
            }
            delivery.save();
            console.log("put into " + JSON.stringify(delivery));
            callback();
        })
    },
    deleteDeliveries:function(callback) {
        Delivery.find({}).remove(function(err) {
            if(err) return console.error(err);
            console.log("All deliveries removed");
            callback();
        });
    },
    getLocations:function(userId,callback) {
        User.findOne({voiceShopId:userId},{locations:1},function(err, user) {
            if(err) return console.error(err);
            console.log(user);
            console.log(user.locations);
            callback(user.locations);
        });
    },
    getBillings:function(userId,callback) {
        User.findOne({voiceShopId:userId},{billings:1},function(err, user) {
            if(err) return console.error(err);
            console.log(user.billings);
            callback(user.billings);
        })
    },
    init:function() {
        var gimun = new User({
            voiceShopId:"GIMUN",
            name:"Gimun Lee",
            locations:[
                {
                    alias:"my home",
                    city:"Busan",
                    detail:"Minam"
                },
                {
                    alias:"room",
                    city:"Seoul",
                    detail:"Dobongsan"
                },
                {
                    alias:"company",
                    city:"Seoul",
                    detail:"F.K.I. Building"
                }],
            billings:[{
                type:"card",
                name:"woori card",
                detail:{
                    expirationMonth:"12/20"
                }
            },
            {
                type:"mobile",
                name:"Mobile",
                detail:{
                    phoneNumber:"010-1111-2222"
                }
            }]
        });
        gimun.save(function(err, item) {
            if(err) return console.error(err);
            console.log(item.name + " saved.");
        });

        var gill = new User({
            voiceShopId:"GILL",
            name:"Gimun Gill",
            locations:[
                {
                    alias:"my home",
                    city:"California",
                    detail:"Minam"
                },
                {
                    alias:"room",
                    city:"Gwanjoo",
                    detail:"Dobongsan"
                },
                {
                    alias:"company",
                    city:"Haewoondae",
                    detail:"F.K.I. Building"
                }],
            billings:[{
                type:"card",
                name:"kookmin card",
                detail:{
                    expirationMonth:"12/20"
                }
            },
            {
                type:"mobile",
                name:"Mobile",
                detail:{
                    phoneNumber:"010-1111-2222"
                }
            }]
        });
        gill.save(function(err, item) {
            if(err) return console.error(err);
            console.log(item.name + " saved.");
        });

        var xscreen = new Product({
            name:"G Pad 3 10.1",
            category:"Mobile",
            price:400000,
            options:{
                color:["Red","Blue"]
            }
        });
        xscreen.save(function(err, item) {
            if(err) return console.error(err);
            console.log(item.name + " saved");
        });
        var fridge = new Product({
            name:"Refrigerator",
            category:"Appliance",
            price:5000000,
            options:{
                color:["White","Metal"]
            }
        });
        fridge.save(function(err, item) {
            if(err) return console.error(err);
            console.log(item.name + " saved");
        })

        var phoneDaejon = new Delivery({
            'product':xscreen,
            transportation:"Daehan Express",
            currentLocation:"Daejon",
            from:"New tech dev team",
            to:'Hang-bok-ma-ru',
            estimatedTimeToArrive:Date('2017-02-20'),
            message:"The password of the door is 1 2 3 4."
        });
        phoneDaejon.save(function(err, item) {
            if(err) return console.error(err);
            console.log(item.transportation + " saved.");
        });

        var phoneDaejon2 = new Delivery({
            'product':fridge,
            transportation:"Hankook Express",
            currentLocation:"Seoul",
            from:"New tech dev team",
            to:'Hang-bok-ma-ru',
            estimatedTimeToArrive:Date('2017-02-20'),
            message:"The password of the door is 1 2 3 4."
        });
        phoneDaejon2.save(function(err, item) {
            if(err) return console.error(err);
            console.log(item.transportation + " saved.");
        });
    }
}

module.exports = new Db();