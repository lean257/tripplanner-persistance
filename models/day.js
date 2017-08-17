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
      Day.findAll({
        where: {
          number: {
            $gt: day.number
          }
        }
      })
      .then(remainingDays => {
        console.log('are you getting in remainingDays?')
        remainingDays.forEach(eachDay => eachDay.number--)
      })
    }
  }
})

// Day.belongsTo(Hotel)
// Day.belongsToMany(Restaurant, {through: 'day_restaurant'});
// Day.belongsToMany(Activity, {through: 'day_activity'});

module.exports = Day;
