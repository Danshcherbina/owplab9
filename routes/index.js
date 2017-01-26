var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' }); //возвращает главную страничку
});

router.get('/search', function(req, res){
    res.render('search', {
        user: req.user,
        search: "nothing",
        lol: "posts" });
});

module.exports = router;
