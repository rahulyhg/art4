angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, MyServices) {

})

.controller('LoginCtrl', function($scope, $ionicModal, $timeout, MyServices) {
    $ionicModal.fromTemplateUrl('templates/modal/forgot-password.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modal/new-user.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modals) {
      $scope.modals = modals;
    });
    $scope.openModals = function() {
      $scope.modals.show();
    };
    $scope.closeModals = function() {
      $scope.modals.hide();
    };
    $scope.formData = {};

    $scope.submitForm = function(userdata) {
      MyServices.signup(userdata, function(data) {
        console.log(data);
      });
    }
    $scope.submitLoginForm = function(userdata) {
      MyServices.login(userdata, function(data) {
        $scope.myuserId = data.data._id;
        $state.go('app.profile',{id:$scope.myuserId})
        console.log(data);
      });
    }
  })
  .controller('SignupCtrl', function($scope, MyServices) {

  })
  .controller('ProfileCtrl', function($scope, MyServices,$stateParams) {
    $scope.profileData = {};

    $scope.submitProfile = function(userdata) {
      MyServices.getprofile($stateParams.id, function(data) {
        console.log(data);
        $scope.getUserData = data;
        console.log($scope.getUserData);
      });
    }
  })
  .controller('ChangePasswordCtrl', function($scope) {

  })
  .controller('SearchArtistCtrl', function($scope) {

  })
  .controller('ArtishCtrl', function($scope, $ionicScrollDelegate, $ionicPopup, $timeout, $ionicLoading, $state) {

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

.controller('PlaylistCtrl', function($scope, $stateParams) {});
