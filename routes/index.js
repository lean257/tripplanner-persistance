var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models').Hotel;
var Restaurant = require('../models').Restaurant;
var Activity = require('../models').Activity;

router.get('/', function(req, res, next) {
  res.render('index')
});
router.get('/options', (req, res, next) => {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
  ])
  .then(response => {
    //response[0] is hotel
    res.send(response)
  })
  .catch(next)
})
//so I don't have to write in api/days everytime
router.use('/api/days', require('./api/days'));
module.exports = router;
