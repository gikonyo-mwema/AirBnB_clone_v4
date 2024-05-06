/* global $ */
$(document).ready(function () {
  const amenities = {};

  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }
    const amenityNames = Object.values(amenities);
    $('.amenities h4').text(amenityNames.join(', '));
  });

  // Request to the status API
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus, jqXHR) {
    if (jqXHR.status === 200 && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  // Button click event
  $('button').click(function () {
    // Request to the places_search API
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          const place = data[i];
          $('.places').append('<article><div class="title"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + ' Guest(s)</div><div class="number_rooms">' + place.number_rooms + ' Bedroom(s)</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom(s)</div></div><div class="description">' + place.description + '</div></article>');
        }
      }
    });
  });
});
