controllerModule.controller('FilterCtrl', function($scope, $http, $rootScope, $timeout, apiUrl) {
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