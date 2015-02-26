angular.module('starter.controllers', [])

// .controller('DashCtrl', function($scope) {})
.controller('MapCtrl', function($scope, $http) {
  $scope.map = 
  { 
    center: { 
      latitude: 22.3700556,
      longitude: 114.1223784
    },
    zoom: 11
  };
})

.controller('FilterCtrl', function($scope, $http) {
  $scope.search_parameters = {};
  $scope.search_parameters.difficulty = 5;
  $scope.search_parameters.scenery = 5;
  $scope.search_parameters.distance = 24;
  $scope.search_parameters.duration = 10;
  $scope.search_parameters.regions = [
    { text: "HK", checked: true },
    { text: "KLN", checked: true },
    { text: "N.T.", checked: true }
  ];

  // test print out search params
  $scope.hihi = function () {
    console.log($scope.search_parameters)
  }

  // get results from database
  $http.get('https://hikehk.herokuapp.com/trails').success(function(data, status, xhr){
      $scope.results = data;
      console.log($scope.results);
  })

  $scope.make_stars = function(factor) {
    range = 5;
    wholeDiff = range - factor;
    stars = "";
    for (var i = factor; i > 0; i--) {
      if (i == 0.5) {
        stars = stars + "<i class='icon ion-ios-star-half'></i>";
      } else {
        stars = stars + "<i class='icon ion-ios-star'></i>";
      }
    }
    for (var i = wholeDiff; i > 0.5; i--) {
      stars = stars + "<i class='icon ion-ios-star-outline'></i>";
    }
    return stars;
  }

})

.controller('InfoCtrl', function($scope, $http, $stateParams) {

  $http.get('https://hikehk.herokuapp.com/trails/'+$stateParams.id).success(function(data, status, xhr){
    $scope.trail = data;
    console.log($scope.trail)
  })

  $scope.make_stars = function(factor) {
    range = 5;
    wholeDiff = range - factor;
    stars = "";
    for (var i = factor; i > 0; i--) {
      if (i == 0.5) {
        stars = stars + "<i class='icon ion-ios-star-half'></i>";
      } else {
        stars = stars + "<i class='icon ion-ios-star'></i>";
      }
    }
    for (var i = wholeDiff; i > 0.5; i--) {
      stars = stars + "<i class='icon ion-ios-star-outline'></i>";
    }
    // console.log(stars);
    return stars;
  }

})

.controller('FloralCtrl', function($scope, $http) {
  
})

.controller('FaunaCtrl', function($scope, $http) {
  
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
