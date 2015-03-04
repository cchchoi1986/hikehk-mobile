app.factory('WeatherServices', ['$http', function($http){

  var weather = {};
  weather.returnWeather = function(lat, lon){
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + ".json";
    // console.log('weather url', url);
    return $http.get(url);
  };

  weather.processData = function(data){
    var info = {
      climate: data.weather[0].main,
      description: data.weather[0].description,
      temp: Math.floor(data.main.temp-273.5),
      tempMax: Math.floor(data.main.temp_max-273.5),
      tempMin: Math.floor(data.main.temp_min-273.5),
      location: data.name,
      time: Date(Date.now)
    };
    return info;
  }

  return weather;
}])

