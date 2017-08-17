var Sequelize = require('sequelize');
var db = require('./_db');
var Place = require('./place');
var Hotel = require('./hotel')
var Restaurant = require('./restaurant')
var Activity = require('./activity')

var Day = db.define('day', {
  number: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  hooks: {
    beforeDestroy: (day, options) => {
      return Day.findAll({
        where: {
          number: {
            $gt: day.number
          }
        }
      })
      .then(remainingDays => {
        var updatingDayNumbers = remainingDays.map(day => {
          day.number--
          return day.save()
        })
        //why do I need to return promise for updatingDayNumbers?
        return Promise.all(updatingDayNumbers)
      })
    }
  }
})

module.exports = Day;
