var express = require('express');
var router = express.Router();
const mongodb = require('promised-mongo');

const url = 'mongodb://garmrr:kazzak80@ds129179.mlab.com:29179/heroku_xvs5zgf6/webprogbase';
const db = mongodb(url);

/* GET home page. */
router.get('/:id', function(req, res, next) {
    db.products.find()
        .then(products => res.render("product", {
        _id: products[req.params.id]['_id'],
        id: products[req.params.id]['id'],
        name: products[req.params.id]['name'],
        type: products[req.params.id]['type'],
        shelflife: products[req.params.id]['shelflife'],
        weight: products[req.params.id]['weight'],
        img: products[req.params.id]['img']
    }))
    .catch(err => sendError(res, err));
});

module.exports = router;

function sendError(res, reason) {
    res.status(500).json({ error: String(reason) });
}

function sendResult(res, result) {
    res.json({ result });
}
