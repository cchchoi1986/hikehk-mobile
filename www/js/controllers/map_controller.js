controllerModule.controller('MapCtrl', function($scope, $http, $rootScope, $ionicModal, apiUrl, uiGmapGoogleMapApi, $cordovaGeolocation) {

  $ionicModal.fromTemplateUrl('intro-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    // $scope.modal.show();
  });
  $scope.openModal = function() {
    $scope.modal.show();
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

  $scope.map = { 
    center: { 
      latitude: 22.337118,
      longitude: 114.1453501
    },
    zoom: 10,
    click: function() {
          console.log("hihi");
        },
    options: {
      // scrollwheel: true,
      styles: hikeMapStyle,
      panControl:false,
      zoomControl:true,
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

  $scope.trailMarkers = [];

  var populateMarkers = function (markers, data) {
    for (var i = 0; i < data.length; i++){
      markers.push({
        title: data[i].name,
        latitude: data[i].start_coordinates.latitude, 
        longitude: data[i].start_coordinates.longitude,
        id: data[i].id,
        icon: data[i].icon,
        click: function() {
          console.log("hihi");
        }
      })
    };
    console.log(markers);
  }

  $http.get(apiUrl+'trails').success(function(data, status, xhr){
    populateMarkers($scope.trailMarkers,data.trails)
  });

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
          // path: makeCoord(trail1),
          path: "", 
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
                  // path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
              },
              offset: '25px',
              repeat: '50px'
          }]
      }
  ];


  $rootScope.$on('searchResults', function (event, data) {
    // $scope.trailMarkers = $scope.results;
    // console.log($scope.trailMarkers);
    $scope.trailMarkers = [];
    $scope.polylines = [];
    $scope.map = { 
      center: { 
        latitude: 22.337118,
        longitude: 114.1453501
      },
      zoom: 10
    }
    populateMarkers($scope.trailMarkers,data.trails)
  });

  $rootScope.$on('selectTrail', function (event, data) {
    // $scope.trailMarkers = $scope.results;
    console.log("map ctrl here",data);
    $scope.map = {}
    $scope.polylines = [];
    $scope.map = {
      center: { 
      latitude: data.start_coordinates.latitude,
      longitude: data.start_coordinates.longitude
      },
      zoom: 12,
    }
    $scope.polylines = [
      {
        id: 999,
        path: makeCoord(data.trail_coordinates),
        stroke: {
            color: 'red',
            weight: 3
        }
      }
    ]
  });

  $scope.myLocation = {
    id: 0,
    coords: {},
    icon: ""
  }

  // Cordova GeoLocation
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

})