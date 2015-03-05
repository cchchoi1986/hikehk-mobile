controllerModule.controller('MapCtrl', function($scope, $http, $rootScope, $timeout, $ionicModal, apiUrl, uiGmapGoogleMapApi, $cordovaGeolocation, SearchServices) {

  console.log(SearchServices)
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

  $scope.allTrails = function() {
    $http.get(apiUrl+'trails').success(function(data, status, xhr){
      populateMarkers(data.trails);
    });
  };

  $scope.resetMap = function() {
    SearchServices.start_coords = {
      latitude: 22.337118,
      longitude: 114.1453501
    };
    SearchServices.polyline = [];
    SearchServices.zoom = 11;
    SearchServices.difficulty = 5;
    SearchServices.scenery = 5;
    SearchServices.distance = 24;
    SearchServices.duration = 10;
    SearchServices.regions = [
      { text: "HK", checked: true },
      { text: "KLN", checked: true },
      { text: "N.T.", checked: true }
    ];
    $http.get(apiUrl + "search?" +
      "duration="+SearchServices.duration +
      "&difficulty="+SearchServices.difficulty +
      "&scenery="+SearchServices.scenery +
      "&distance="+SearchServices.distance +
      "&hk="+SearchServices.regions[0].checked +
      "&kln="+SearchServices.regions[1].checked +
      "&nt="+SearchServices.regions[2].checked).success(function(data, status, xhr){
        SearchServices.searchResults = data.trails;
        console.log("new trails bro", SearchServices.searchResults);
        populateMarkers(data.trails);
    })
    
    $scope.map = {
      center: { 
        latitude: SearchServices.start_coords.latitude,
        longitude: SearchServices.start_coords.longitude
      },
      zoom: SearchServices.zoom,
    };
    $scope.polylines = [
      {
          id: 999,
          path: makeCoord(SearchServices.polyline), 
          stroke: {
              color: 'red',
              weight: 2
          },
          editable: false,
          draggable: false,
          geodesic: false,
          visible: true,
          icons: [{
              icon: {
              },
              offset: '25px',
              repeat: '50px'
          }]
      }
    ];
  };

  $scope.map = { 
    center: { 
      latitude: SearchServices.start_coords.latitude,
      longitude: SearchServices.start_coords.longitude
    },
    zoom: SearchServices.zoom,
    click: function() {
          console.log("hihi");
        },
    options: {
      styles: hikeMapStyle,
      panControl:false,
      zoomControl:true,
      mapTypeControl:false,
      scaleControl:false,
      streetViewControl:false,
      minZoom: 9,
      maxZoom: 16
    }
  };

  $scope.trailMarkers = [];

  var populateMarkers = function (data) {
    for (var i = 0; i < data.length; i++){
      $scope.trailMarkers.push({
        title: data[i].name,
        latitude: data[i].start_coordinates.latitude, 
        longitude: data[i].start_coordinates.longitude,
        id: data[i].id,
        icon: data[i].icon,
        click: function(id) {
          console.log("hihi");
          $rootScope.$emit("mapTrailClick", id.key)
        }
      })
    };
  }

  // $http.get(apiUrl+'trails').success(function(data, status, xhr){
  //   populateMarkers(data.trails)
  // });

  var makeCoord = function(array) {
    new_array = [];
    for (var i =0; i < array.length; i++){
      new_array.push({ latitude: array[i].split(',')[0], longitude: array[i].split(',')[1]});
    }
    return new_array;
  }

  $scope.polylines = [
    {
      id: 999,
      path: makeCoord(SearchServices.polyline), 
      stroke: {
          color: 'red',
          weight: 3
      },
      editable: false,
      draggable: false,
      geodesic: false,
      visible: true,
      icons: [{
          icon: {
          },
          offset: '25px',
          repeat: '50px'
      }]
    }
  ];


  // $rootScope.$on('searchResults', function (event, data) {
  //   // $scope.trailMarkers = $scope.results;
  //   // console.log($scope.trailMarkers);
  //   $scope.trailMarkers = [];
  //   $scope.polylines = [];
  //   $scope.map = { 
  //     center: { 
  //       latitude: 22.337118,
  //       longitude: 114.1453501
  //     },
  //     zoom: 10
  //   }
  //   populateMarkers(data.trails)
  // });

  // $rootScope.$on('selectTrail', function (event, data) {
  //   // $scope.trailMarkers = $scope.results;
  //   console.log("map ctrl here",data);
  //   $scope.map = {}
  //   $scope.polylines = [];
  //   $scope.map = {
  //     center: { 
  //     latitude: data.start_coordinates.latitude,
  //     longitude: data.start_coordinates.longitude
  //     },
  //     zoom: 12,
  //   }
  //   $scope.polylines = [
  //     {
  //       id: 999,
  //       path: makeCoord(data.trail_coordinates),
  //       stroke: {
  //           color: 'red',
  //           weight: 3
  //       }
  //     }
  //   ]
  // });

  // Cordova GeoLocation
  $scope.myLocation = {
    id: 0,
    coords: {},
    icon: ""
  }

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
        // icon: "http://garminbasecamp.wikispaces.com/file/view/ProgressMarker%2018x23.png/394362042/ProgressMarker%2018x23.png"
        // icon: "http://www.eecis.udel.edu/~bohacek/orange_sel_marker.png"
        icon: "http://d1cnag8e8eksul.cloudfront.net/media/com_hotspots/images/utils/person.png"
      };
    }, function(err) {
      // error
    });

  populateMarkers(SearchServices.searchResults)
  console.log(SearchServices.searchResults)

  // map refresh to counter modal rendering
  uiGmapGoogleMapApi.then(function (maps) {
      $timeout(function () {
          $scope.showMap = true;
      }, 100);
  });
})