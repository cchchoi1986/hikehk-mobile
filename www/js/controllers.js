angular.module('starter.controllers', ['urlConstant'])

// .controller('DashCtrl', function($scope) {})
.controller('MapCtrl', function($scope, $http, uiGmapGoogleMapApi, $cordovaGeolocation) {

  var hikeMapStyle = [
    {
      "featureType":"landscape.natural",
      "elementType":"geometry.fill",
      "stylers":[
        {"visibility":"on"},
        {"color":"#e0efef"}
      ]
    },
    {
      "featureType":"poi",
      "elementType":"geometry.fill",
      "stylers":[
        {"visibility":"on"},
        {"hue":"#1900ff"},
        {"color":"#c0e8e8"}
      ]
    },
    {
      "featureType":"road",
      "elementType":"geometry",
      "stylers":[
        {"lightness":100},
        {"visibility":"simplified"}
      ]
    },
    {
      "featureType":"road",
      "elementType":"labels",
      "stylers":[
        {"visibility":"off"}
      ]
    },
    {
      "featureType":"transit.line",
      "elementType":"geometry",
      "stylers":[
        {"visibility":"on"},
        {"lightness":700}
      ]
    },
    {
      "featureType":"water",
      "elementType":"all",
      "stylers":[
        {"color":"#7dcdcd"}
      ]
    }
  ];

  $scope.map = 
  { 
    center: { 
      latitude: 22.3700556,
      longitude: 114.1223784
    },
    zoom: 11,
    options: {
      scrollwheel: true,
      styles: hikeMapStyle,
      panControl:false,
      // zoomControl:true,
      // zoomControlOptions: {
      //     style: google.maps.ZoomControlStyle.SMALL,
      //     position: google.maps.ControlPosition.LEFT_BOTTOM
      // },
      mapTypeControl:false,
      scaleControl:false,
      streetViewControl:false,
      minZoom: 10,
      maxZoom: 16
    }
  };

  

  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude

      return $scope.myLocation = 
      {
        id: 0,
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        icon: "http://www.eightgables.com/interactive/location/xstar.png,qver=1.0.40224.1820.pagespeed.ic.R-WLcTtD1J.png"
      };
    }, function(err) {
      // error
    });

  // var watchOptions = {
  //   frequency : 1000,
  //   timeout : 3000,
  //   enableHighAccuracy: false // may cause errors if true
  // };

  $scope.myLocation = {
    id: 0,
    coords: {
      latitude: 0,
      longitude: 0
    }
  };
  
  // var watch = $cordovaGeolocation.watchPosition(watchOptions);
  // watch.then(
  //   null,
  //   function(err) {
  //     // error
  //   },
  //   function(position) {
  //     var lat  = position.coords.latitude;
  //     var long = position.coords.longitude;
  //     $scope.mycoords = {
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude
  //     }
  //     console.log($scope.mycoords);
  // });

  $scope.mylocation = {
    id: 0,
    coords: {
      latitude: 40.1451,
      longitude: -99.6680
    }
  };

  

  // watch.clearWatch();
  // OR
  // $cordovaGeolocation.clearWatch(watch)
    // .then(function(result) {
    //   // success
    //   }, function (error) {
    //   // error
    // });

})

.controller('FilterCtrl', function($scope, $http, $timeout, apiUrl) {
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
  $scope.$watch("searchParameters.difficulty", function() {
    $scope.loading = true;
    $timeout.cancel(timeoutPromise);
    timeoutPromise = $timeout(function(){   //Set timeout
      submitParams();
      $scope.loading = false;
    }, timeOut);
  });
  $scope.$watch("searchParameters.duration", function() {
    $scope.loading = true;
    $timeout.cancel(timeoutPromise);
    timeoutPromise = $timeout(function(){   //Set timeout
      submitParams();
      $scope.loading = false;
    }, timeOut);
  });
  $scope.$watch("searchParameters.distance", function() {
    $scope.loading = true;
    $timeout.cancel(timeoutPromise);
    timeoutPromise = $timeout(function(){   //Set timeout
      submitParams();
      $scope.loading = false;
    }, timeOut);
  });
  $scope.$watch("searchParameters.scenery", function() {
    $scope.loading = true;
    $timeout.cancel(timeoutPromise);
    timeoutPromise = $timeout(function(){   //Set timeout
      submitParams();
      $scope.loading = false;
    }, timeOut);
  });
  $scope.$watch("searchParameters.regions[0].checked", function() {
    $scope.loading = true;
    $timeout.cancel(timeoutPromise);
    timeoutPromise = $timeout(function(){   //Set timeout
      submitParams();
      $scope.loading = false;
    }, timeOut);
  });
  $scope.$watch("searchParameters.regions[1].checked", function() {
    $scope.loading = true;
    $timeout.cancel(timeoutPromise);
    timeoutPromise = $timeout(function(){   //Set timeout
      submitParams();
      $scope.loading = false;
    }, timeOut);
  });
  $scope.$watch("searchParameters.regions[2].checked", function() {
    $scope.loading = true;
    $timeout.cancel(timeoutPromise);
    timeoutPromise = $timeout(function(){   //Set timeout
      submitParams();
      $scope.loading = false;
    }, timeOut);
  });


  // request URL
  // "http://www.google.com/search?key1=value1&key2=value2"
  // "http://www.google.com/search ? key1 = value1 & key2 = value2"

  // in routes
  // get "search" => "controller#action"
  var submitParams = function() {
    $http.get(apiUrl+'search?duration='+$scope.searchParameters.duration+"&difficulty="+$scope.searchParameters.difficulty+"&scenery="+$scope.searchParameters.scenery+"&distance="+$scope.searchParameters.distance+"&hk="+$scope.searchParameters.regions[0].checked+"&kln="+$scope.searchParameters.regions[1].checked+"&nt="+$scope.searchParameters.regions[2].checked).success(function(data, status, xhr){
        $scope.results = data;
        console.log($scope.searchParameters.regions.checked)
        console.log($scope.results);
    })
  }


  
  // in rails controller
  // params[:key1] -> value1
  // params[:key2] -> value2

  // get results from database
  // $http.get('https://hikehk.herokuapp.com/trails').success(function(data, status, xhr){
  //     $scope.results = data;
  //     console.log($scope.results);
  // })

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

})

.controller('InfoCtrl', function($scope, $http, $stateParams, apiUrl) {

  $http.get(apiUrl+'trails/'+$stateParams.id).success(function(data, status, xhr){
    $scope.trail = data;
    console.log($scope.trail)
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

  $http.get(apiUrl+'trails/'+$stateParams.id+'/flora').success(function(data, status, xhr){
  // $http.get('http://localhost:3000/flora').success(function(data, status, xhr){
      $scope.plants = data;
      console.log($scope.plants);
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
  
  $http.get(apiUrl+"trails/"+$stateParams.id+'/fauna').success(function(data, status, xhr){
  // $http.get('http://localhost:3000/fauna').success(function(data, status, xhr){
      $scope.birds = data;
      console.log($scope.birds);
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

// .controller('ChatsCtrl', function($scope, Chats) {
//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   }
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

// .controller('FriendsCtrl', function($scope, Friends) {
//   $scope.friends = Friends.all();
// })

// .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
//   $scope.friend = Friends.get($stateParams.friendId);
// })

// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
// });
