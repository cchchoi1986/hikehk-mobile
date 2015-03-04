controllerModule.controller('InfoCtrl', function($scope, $http, $rootScope, $stateParams, apiUrl, WeatherServices) {

  var getWeather = function(lat, lon){
    console.log("weather gets called");
    WeatherServices.returnWeather(lat, lon).success(function(data){
      $scope.weatherInfo = WeatherServices.processData(data)
    });
  }

  $http.get(apiUrl+'trails/'+$stateParams.id).success(function(data, status, xhr){
    $scope.trail = data;
    $scope.noPlants = $scope.trail.plants.length < 1 ? true : false;
    $scope.noBirds = $scope.trail.birds.length < 1 ? true : false;
    getWeather($scope.trail.start_coordinates.latitude, $scope.trail.start_coordinates.longitude);
    $rootScope.$emit('selectTrail', $scope.trail);
  })


  $scope.makeStars = function(factor) {
    range = 5;
    wholeDiff = range - factor;
    stars = "";
    for (var m = factor; m > 0; m--) {
      if (m === 0.5) {
        stars = stars + "<i class='icon ion-ios-star-half'></i>";
      } else {
        stars = stars + "<i class='icon ion-ios-star'></i>";
      }
    }
    for (var n = wholeDiff; n > 0.5; n--) {
      stars = stars + "<i class='icon ion-ios-star-outline'></i>";
    }
    // console.log(stars);
    return stars;
  }


})