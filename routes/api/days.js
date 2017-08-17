var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../../models').Hotel;
var Restaurant = require('../../models').Restaurant;
var Activity = require('../../models').Activity;
var Day = require('../../models').Day;

//get all days
router.get('/api/days', (req, res, next) => {
  Day.findAll({
    include: [Hotel, Restaurant, Activity],
    order: 'number ASC'
  })
  .then(days => res.send(days))
  .catch(next)
})

//get one day
router.get('/api/days/:id', (req, res, next) => {
  Day.findById(req.params.id)
  .then(day => res.send(day))
  .catch(next)
})
//delete one specific day
router.delete('/api/days/:id', (req, res, next) => {
  Day.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(day => res.send(day))
})
//create a new day
router.post('/api/days', (req, res, next) => {
  Day.create(req.body)
  .then(day => {
    res.send(day)
  })
})
//add restaurants to specific day
router.put('/api/days/:id/restaurants', (req, res, next) => {
  //find the day that I'm updating, then addRestaurant
  Day.findOne({where: {id: req.params.id}})
  .then(currDay => {
    return currDay.update(req.body)
  })
  .then(restaurant => res.send(restaurant))
})
//remove restaurants from specific day
router.delete('/api/days/:id/restaurants', (req, res, next) => {
  Day.findOne({where: {id: req.params.id}})
  .then(currDay => {
    currDay.removeRestaurant(req.body)
  })
  .then(restaurant => {
      res.send(restaurant)
    })
})
//add activities to specific day
router.put('/api/days/:id/activities', (req, res, next) => {
  //find the day that I'm updating, then addRestaurant
  Day.findOne({where: {id: req.params.id}})
  .then(currDay => {
    currDay.update(req.body)
  })
  .then(activity => res.send(activity))
})
//remove activities from specific day
router.delete('/api/days/:id/activities', (req, res, next) => {
  Day.findOne({where: {id: req.params.id}})
  .then(currDay => {
    currDay.removeActivity(req.body)
  })
  .then(activity => res.send(activity))
})
//add hotel: use setHotel
router.put('/api/days/:id/hotels', (req, res, next) => {
  console.log('we are in this hotel route')
  Day.findOne({where: {id: req.params.id}})
  .then(currDay => {
    return currDay.update(req.body)
  })
  .then(hotel => {
    res.send(hotel)
  })
})
//remove hotel
router.delete('/api/days/:id/hotels', (req, res, next) => {
  Day.findOne({where: {id: req.params.id}})
  .then(currDay => {
    currDay.setHotel(null)
  })
  .then(hotel => res.send(hotel))
})

module.exports = router;