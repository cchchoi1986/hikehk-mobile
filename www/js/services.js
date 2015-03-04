angular.module('starter.services', [])

.factory('WeatherServices', ['$http', function($http){

  var weather = {};

  weather.returnWeather = function(lat, lon){

    // var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + ".json";

    var url = "https://api.worldweatheronline.com/free/v2/weather.ashx?key=f2f8b5561b809dffdccd40d1e680c&q=" + lat + "," + lon + "&format=json"; 
    // console.log(url);

    return $http.get(url);
  };

  weather.processData = function(data){
    var info = {
      climate: data.data.current_condition[0].weatherDesc[0].value,
      temp: data.data.current_condition[0].temp_C,
      precip: data.data.current_condition[0].precipMM,
      feel: data.data.current_condition[0].FeelsLikeC,
      visibility: data.data.current_condition[0].visibility,
      updated: data.data.current_condition[0].observation_time
    };
    return info;
  }

  return weather;
}])


.factory('SearchServices', ['$http', 'apiUrl', '$rootScope', function($http, apiUrl, $rootScope) {

  var searchParameters = {};
  
  // $http.get(apiUrl+'trails').success(function(data, status, xhr){
  //   searchParameters.searchResults = data.trails;
  // });
  
  
  searchParameters.searchResults = [];
  searchParameters.start_coords = {
    latitude: 22.337118,
    longitude: 114.1453501
  };
  searchParameters.polyline = [];
  searchParameters.zoom = 11;
  searchParameters.difficulty = 5;
  searchParameters.scenery = 5;
  searchParameters.distance = 24;
  searchParameters.duration = 10;
  searchParameters.regions = [
    { text: "HK", checked: true },
    { text: "KLN", checked: true },
    { text: "N.T.", checked: true }
  ];

  $rootScope.$on('selectTrail', function (event, data) {
    searchParameters.start_coords = {
      latitude: data.start_coordinates.latitude,
      longitude: data.start_coordinates.longitude
    };
    searchParameters.polyline = data.trail_coordinates;
    searchParameters.zoom = 13;
    searchParameters.searchResults = [data];
    console.log(searchParameters);
  });

  return searchParameters;

}]);