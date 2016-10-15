angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('LoginCtrl', function($scope,$ionicModal, $timeout) {
  $ionicModal.fromTemplateUrl('templates/modal/forgot-password.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
})
.controller('ProfileCtrl', function($scope) {

})
.controller('SearchArtistCtrl', function($scope) {

})
.controller('ArtishCtrl', function($scope,$ionicScrollDelegate, $ionicPopup, $timeout, $ionicLoading, $state) {

  $scope.tab = 'new';
  $scope.classa = 'active';
  $scope.classb = '';
  $scope.tabchange = function(tab, a) {

      //        console.log(tab);
      $scope.tab = tab;
      if (a == 1) {
          $ionicScrollDelegate.scrollTop();
          $scope.classa = "active";
          $scope.classb = '';
      } else {
          $ionicScrollDelegate.scrollTop();
          $scope.classa = '';
          $scope.classb = "active";
      }
  };

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
