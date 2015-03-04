app.controller('FaunaCtrl', function($scope, $http, $stateParams, $ionicModal, apiUrl) {

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