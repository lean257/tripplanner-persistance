
$(document).ready(() => {
  function getResto() {
    return $.get('/api/restaurants')
    // .then(function (restaurants) {
    //   return restaurants
    //   restaurants.forEach(function(restaurant){
    //     return restaurant
    //   });
    // })
    // .catch( console.error.bind(console) );

  }
  function renderType(response) {
    response.forEach(item => {
      var $option = $('<option></option>') // makes a new option tag
        .text(item.name)
        .val(item.id);
      this.append($option); // add the option to the specific select
    })
  }
})
