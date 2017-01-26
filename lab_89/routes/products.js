var express = require('express');
var router = express.Router();
const mongodb = require('promised-mongo');

const url = 'mongodb://localhost:27017/webprogbase';
const db = mongodb(url);

/* GET home page. */
router.get('/', function(req, res){
    db.products.find()
        .then(products => {
        res.render('products', {
        products: products,
        user: req.user,
        search: "nothing",
        lol: "posts"
    });
})
    .catch(err => sendError(res, err));
});

router.get('/deletecat/:id', function (req, res){
    db.products.remove({
        id: req.params.id
    }, true)
        .then(x => res.redirect('/products'))
    .catch(err => sendError(res, err));
});

router.get('/search', function(req, res) {
    var lol = "posts";
    if (req.query.name == '')
        res.redirect('/products');
    else {
        db.products.find ({name: req.query.name})
            .then(products => {
            db.products.findOne( {name: req.query.name})
            .then(product => {
            if (product == null){
            res.render('products', {
                products: products,
                user: req.user,
                search: req.query.name,
                lol : "noposts",
            });
        } else {
            res.render('products', {
                products: products,
                user: req.user,
                search: req.query.name,
                lol : lol,
            });
        }
    })
    .catch(err => sendError(res, err));
    })
    .catch(err => sendError(res, err));
    }
});

router.post('/deletecat', function (req, res){
    db.products.remove({
        _id: mongodb.ObjectId(req.body.todelete)
    }, true)
        .then(x => res.redirect('/products'))
    .catch(err => sendError(res, err));
});

module.exports = router;

function sendError(res, reason) {
    res.status(500).json({ error: String(reason) });
}

function sendResult(res, result) {
    res.json({ result });
}
