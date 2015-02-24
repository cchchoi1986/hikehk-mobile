angular.module('starter.controllers', [])

// .controller('DashCtrl', function($scope) {})
.controller('MapCtrl', function($scope) {
  $scope.map = 
  { 
    center: { 
      latitude: 22.3700556,
      longitude: 114.1223784
    },
    zoom: 11
  };
})

.controller('FilterCtrl', function($scope) {
  $scope.search_parameters = {};
  $scope.search_parameters.difficulty = 10;
  $scope.search_parameters.scenery = 10;
  $scope.search_parameters.distance = 24;
  $scope.search_parameters.duration = 10;
  $scope.search_parameters.regions = [
    { text: "HK", checked: true },
    { text: "Kln", checked: true },
    { text: "N.T.", checked: true }
  ];

  // test print out search params
  $scope.hihi = function () {
    console.log($scope.search_parameters)
  }

  // results example from db
  $scope.results = [
    {
      id: 1, 
      name: "Sharp Peak", 
      description: ["Sharp Peak, located in the Sai Kung East Country Park, soars at an altitude of 468 metres above sea level. As all of the paths leading to its summit are difficult, it is considered one of the most challenging climbs in the territory. Sharp Peak, High Junk Bay and Tai Yue Ngam Teng, all having pointed peaks, are also known as the three sharp peaks in Sai Kung.", "There are primarily three paths leading up to Sharp Peak. Most hikers take the southern path leading up from Nam She Au, for it is the easiest among the three. The eastern one is shorter in length but more difficult. The most arduous and treacherous path climbs up from Nam She Bay, which follows the northern slope towards the peak."], 
      region_id: "", 
      difficulty: 4.5, 
      scenery: 5.0, 
      distance: 12.0, 
      duration: 6.5, 
      route_url: "", 
      food_supply: ["Restaurants at Ham Tin"], 
      warning: ["Part of the trail is physically demanding and treacherous.", "Parts of the trail are loose gravel paths which require some clambering.", "The uphill and downhill paths near Sharp Peak are unsheltered."], 
      photo_urls: ["images/sharp_peak2/8_01.jpg", "images/sharp_peak2/8_02.jpg", "images/sharp_peak2/8_03.jpg", "images/sharp_peak2/9_01.jpg", "images/sharp_peak2/9_02.jpg", "images/sharp_peak2/9_03.jpg", "images/sharp_peak2/10_01.jpg", "images/sharp_peak2/10_02.jpg", "images/sharp_peak2/10_03.jpg", "images/sharp_peak2/11_01.jpg"], 
      start_longitude: "", 
      start_latitude: "", 
      end_longitude: "", 
      end_latitude: "", 
      vegetation: [], 
      created_at: "2015-02-18 06:11:15", 
      updated_at: "2015-02-18 06:11:15"
    },
    {
      id: 2, 
      name: "Tai Long Wan", 
      description: ["Tai Long Wan, literally meaning Big Wave Bay, lies in the east coast of Sai Kung peninsula. Carved by the waves of Pacific Ocean, it comprises four sandy beaches, namely Sai Wan, Ham Tin Wan, Tai Wan and Tung Wan.", "Tai Long Wan is renowned for its majestic view and the exceptional quality of its beaches. It is considered the “The backyard of Hong Kong”.", "To get there, you may commence at Sai Wan Pavillion where there is a path leading to Sai Wan. Alternatively, you may set off at Pak Tam Au and follow the MacLehose Trail Section Two in an reverse direction to Ham Tin Wan."], 
      region_id: "", 
      difficulty: 3.5, 
      scenery: 4.5, 
      distance: 12.5, 
      duration: 3.5, 
      route_url: "", 
      food_supply: ["Restaurants at Sai Wan", "Restaurants at Ham Tin"], 
      warning: ["The path between Tai Wan and Tung Wan is narrow and indistinct", "All the beaches are not managed by Leisure and Cultural Services Department. No lifeguard service is provided."], 
      photo_urls: ["images/tai_long_wan/photo12a.jpg", "images/tai_long_wan/photo12b.jpg", "images/tai_long_wan/photo12c.jpg", "images/tai_long_wan/photo19a.jpg", "images/tai_long_wan/photo19b.jpg", "images/tai_long_wan/photo19c.jpg", "images/tai_long_wan/photo1.jpg", "images/tai_long_wan/photo2.jpg", "images/tai_long_wan/photo3.jpg", "images/tai_long_wan/photo4.jpg"], 
      start_longitude: "", 
      start_latitude: "", 
      end_longitude: "", 
      end_latitude: "", 
      vegetation: [], 
      created_at: "2015-02-18 06:11:15", 
      updated_at: "2015-02-18 06:11:15"
    }, 
    {
      id: 3, 
      name: "Tai Tun", 
      description: ["Tai Tun is located at Sai Kung West Country Park. From the vantage point on top of the hill, one can have a panoramic view over the archipelago of Cham Chuk Wan."], 
      region_id: "", 
      difficulty: 4.0, 
      scenery: 4.0, 
      distance: 4.5, 
      duration: 2.5, 
      route_url: "", 
      food_supply: ["None"], 
      warning: ["The path leading to the top is shrubbery and not shaded.", "The path descending from Tai Tun is treacherous and indistinct. Recommended for experienced hikers with greater physical strength."], 
      photo_urls: ["images/tai_tun/photo12a.jpg", "images/tai_tun/photo12b.jpg", "images/tai_tun/photo12c.jpg", "images/tai_tun/photo4a.jpg", "images/tai_tun/photo4b.jpg", "images/tai_tun/photo4c.jpg", "images/tai_tun/photo13a.jpg", "images/tai_tun/photo13b.jpg", "images/tai_tun/photo13c.jpg", "images/tai_tun/photo16a.jpg"], 
      start_longitude: "", 
      start_latitude: "", 
      end_longitude: "", 
      end_latitude: "", 
      vegetation: [], 
      created_at: "2015-02-18 06:11:15", 
      updated_at: "2015-02-18 06:11:15"
    }
  ]
})

.controller('InfoCtrl', function($scope) {
  $scope.trail = {
    id: 1, 
    name: "Sharp Peak", 
    description: ["Sharp Peak, located in the Sai Kung East Country Park, soars at an altitude of 468 metres above sea level. As all of the paths leading to its summit are difficult, it is considered one of the most challenging climbs in the territory. Sharp Peak, High Junk Bay and Tai Yue Ngam Teng, all having pointed peaks, are also known as the three sharp peaks in Sai Kung.", "There are primarily three paths leading up to Sharp Peak. Most hikers take the southern path leading up from Nam She Au, for it is the easiest among the three. The eastern one is shorter in length but more difficult. The most arduous and treacherous path climbs up from Nam She Bay, which follows the northern slope towards the peak."], 
    region_id: "", 
    difficulty: 4.5, 
    scenery: 5.0, 
    distance: 12.0, 
    duration: 6.5, 
    route_url: "", 
    food_supply: ["Restaurants at Ham Tin"], 
    warning: ["Part of the trail is physically demanding and treacherous.", "Parts of the trail are loose gravel paths which require some clambering.", "The uphill and downhill paths near Sharp Peak are unsheltered."], 
    photo_urls: ["images/sharp_peak2/8_01.jpg", "images/sharp_peak2/8_02.jpg", "images/sharp_peak2/8_03.jpg", "images/sharp_peak2/9_01.jpg", "images/sharp_peak2/9_02.jpg", "images/sharp_peak2/9_03.jpg", "images/sharp_peak2/10_01.jpg", "images/sharp_peak2/10_02.jpg", "images/sharp_peak2/10_03.jpg", "images/sharp_peak2/11_01.jpg"], 
    start_longitude: "", 
    start_latitude: "", 
    end_longitude: "", 
    end_latitude: "", 
    vegetation: [], 
    created_at: "2015-02-18 06:11:15", 
    updated_at: "2015-02-18 06:11:15"
  }

  $scope.make_stars = function(factor) {
    range = 5;
    wholeDiff = range - factor;
    stars = "";
    for (var i = factor; i > 0; i--) {
      if (i == 0.5) {
        stars = stars + "<i class='icon ion-ios-star-half'>";
      } else {
        stars = stars + "<i class='icon ion-ios-star'>";
      }
    }
    for (var i = wholeDiff; i > 0.5; i--) {
      if (i == 0.5) {
        stars = stars + "<i class='icon ion-ios-star-outline'>";
      }
    }
    // console.log(stars);
    return stars;
  }
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
