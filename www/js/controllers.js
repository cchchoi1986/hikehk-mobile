controllersModule

// .controller('DashCtrl', function($scope) {})

.controller('FilterCtrl', function($scope, $http, $rootScope, $timeout, apiUrl) {
  $scope.searchParameters = {};
  $scope.searchParameters.difficulty = 5;
  $scope.searchParameters.scenery = 5;
  $scope.searchParameters.distance = 24;
  $scope.searchParameters.duration = 10;
  $scope.searchParameters.regions = [
    { text: "HK", checked: true },
    { text: "KLN", checked: true },
    { text: "N.T.", checked: true }
  ];

  var timeOut = 1000;
  var timeoutPromise;
  var getParams = function() {
    $scope.loading = true;
    $timeout.cancel(timeoutPromise);
    timeoutPromise = $timeout(function(){   //Set timeout
      submitParams();
    }, timeOut);
  }

  var submitParams = function() {
    var url = apiUrl + "search?" +
      "duration="+$scope.searchParameters.duration +
      "&difficulty="+$scope.searchParameters.difficulty +
      "&scenery="+$scope.searchParameters.scenery +
      "&distance="+$scope.searchParameters.distance +
      "&hk="+$scope.searchParameters.regions[0].checked +
      "&kln="+$scope.searchParameters.regions[1].checked +
      "&nt="+$scope.searchParameters.regions[2].checked;

    $http.get(url).success(function(data, status, xhr){
        $scope.results = data;
        $scope.loading = false;
        console.log('data as sent by FilterCtrl', $scope.results);
        $rootScope.$emit('searchResults', $scope.results);
        // console.log($scope.searchParameters.regions.checked)
        $scope.noResults = $scope.results.trails.length < 1 ? true : false;
    })
  }

  $scope.makeStars = function(factor) {
    var range = 5;
    var wholeDiff = range - factor;
    var stars = "";
    for (var j = factor; j > 0; j--) {
      if (j === 0.5) {
        stars = stars + "<i class='icon ion-ios-star-half'></i>";
      } else {
        stars = stars + "<i class='icon ion-ios-star'></i>";
      }
    }
    for (var k = wholeDiff; k > 0.5; k--) {
      stars = stars + "<i class='icon ion-ios-star-outline'></i>";
    }
    return stars;
  }

  $scope.$watch("searchParameters.difficulty", function() {
    getParams();
  });
  $scope.$watch("searchParameters.duration", function() {
    getParams();
  });
  $scope.$watch("searchParameters.distance", function() {
    getParams();
  });
  $scope.$watch("searchParameters.scenery", function() {
    getParams();
  });
  $scope.$watch("searchParameters.regions[0].checked", function() {
    getParams();
  });
  $scope.$watch("searchParameters.regions[1].checked", function() {
    getParams();
  });
  $scope.$watch("searchParameters.regions[2].checked", function() {
    getParams();
  });

})

.controller('InfoCtrl', function($scope, $http, $rootScope, $stateParams, apiUrl, WeatherServices) {

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

.controller('FloraCtrl', function($scope, $http, $stateParams, $ionicModal, apiUrl) {
  
  $http.get(apiUrl+'trails/'+$stateParams.id).success(function(data, status, xhr){
      $scope.plants = data.plants;
      console.log($scope.plants);
      $scope.noPlants = $scope.plants.length < 1 ? true : false;
  })

  $ionicModal.fromTemplateUrl('plant-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function(plant) {
    $scope.modal.show();
    $scope.selectedPlant = {
      id: plant.id,
      common_name: plant.common_name,
      family_name: plant.family_name,
      scientific_name: plant.scientific_name,
      plant_type: plant.plant_type,
      chinese_name: plant.chinese_name,
      chinese_family_name: plant.chinese_family_name,
      photo_urls: plant.photo_urls
    }
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

})

.controller('FaunaCtrl', function($scope, $http, $stateParams, $ionicModal, apiUrl) {

  $http.get(apiUrl+"trails/"+$stateParams.id).success(function(data, status, xhr){
      $scope.birds = data.birds;
      console.log($scope.birds);
      $scope.noBirds = $scope.birds.length < 1 ? true : false;
  })


  $ionicModal.fromTemplateUrl('bird-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function(bird) {
    $scope.modal.show();
    $scope.selectedBird = {
      common_name: bird.common_name,
      scientific_name: bird.scientific_name,
      photo_url: bird.photo_url
    }
    console.log($scope.selected);
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

})

.controller("someController", function($scope, uiGmapGoogleMapApi) {
    // Do stuff with your $scope.
    // Note: Some of the directives require at least something to be defined originally!
    // e.g. $scope.markers = []

    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function(maps) {

    });
});