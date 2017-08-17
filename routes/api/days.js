var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../../models').Hotel;
var Restaurant = require('../../models').Restaurant;
var Activity = require('../../models').Activity;
var Day = require('../../models').Day;

//get all days /api/days
router.get('/', (req, res, next) => {
  Day.findAll({
    //include works like join
    include: [Hotel, Restaurant, Activity],
    order: 'number ASC'
  })
  .then(days => res.send(days))
  .catch(next)
})

//create a new day
router.post('/', (req, res, next) => {
  Day.create(req.body)
  .then(day => {
    res.send(day)
  })
})
//use req.param to set req.day for all the findById
router.param('id', (req,res, next, id) => {
  Day.findById(id)
  .then(foundDay => {
    //are we assigning new prop for req? how can we access it outside of this function?
    req.day = foundDay
    next();
    return null;
  })
  .catch(next)
})

//delete one specific day
router.delete('/:id', (req, res, next) => {
  req.day.destroy()
  .then(() => {
    res.sendStatus(204)
  })
  .catch(next)
})
//add restaurants to specific day
router.put('/:id/restaurants', (req, res, next) => {
  //find the day that I'm updating, then addRestaurant
  //addRestaurant just takes an ID that we pass in from ajax request
  req.day.addRestaurant(req.body.restaurantId)
  .then(() => res.sendStatus(204))
  .catch(next)
})
//remove restaurants from specific day
router.delete('/:id/restaurants', (req, res, next) => {
  req.day.removeRestaurant(req.body.restaurantId)
  .then(() => res.sendStatus(204))
  .catch(next)
})
//add activities to specific day
router.put('/:id/activities', (req, res, next) => {
  req.day.addActivity(req.body.activityId)
  .then(() => res.sendStatus(204))
  .catch(next)
})
//remove activities from specific day
router.delete('/:id/activities', (req, res, next) => {
  req.day.removeActivity(req.body.activityId)
  .then(() => res.sendStatus(204))
  .catch(next)
})
//add hotel: use setHotel
router.put('/:id/hotels', (req, res, next) => {
  req.day.setHotel(req.body.hotelId)
  .then(() => res.sendStatus(204))
  .catch(next)
})
//remove hotel
router.delete('/:id/hotels', (req, res, next) => {
  req.day.setHotel(null)
  .then(() => res.sendStatus(204))
  .catch(next)
})

module.exports = router;
