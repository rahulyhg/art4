angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, MyServices) {

})


// ===============================
.controller('ProfileCtrl', function($scope, $stateParams, $cordovaFileTransfer, $ionicLoading, $cordovaImagePicker,MyServices) {

  // =============ProfilectrlCode====================
  // $scope.profileData = {};
  MyServices.getprofile($stateParams.id, function(data) {
    console.log(data);
    $scope.profileData = data.data;
    console.log($scope.profileData);
  });
  $scope.submitProfile = function(input) {
    MyServices.signup(input, function(data) {
      console.log(data);
    });

  }
  var getUserProfile = $.jStorage.get('userProfile');
  $scope.userId = getUserProfile._id;
  console.log('$scope.userId', $scope.userId);
  // ===================End of Profilectrl===============

  $scope.startloading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-light"></ion-spinner>'
    });
  };
  $scope.collection = {
    selectedImage: ''
  };

  $scope.collection.selectedImage = "img/addphoto.png";
  $scope.imagetobeup = "img/profile.png";

  var options = {
    maximumImagesCount: 1,
    quality: 100
  };

  $scope.uploadProfilePic = function() {
    $cordovaImagePicker.getPictures(options).then(function(resultImage) {
      // Success! Image data is here
      console.log(resultImage);
      $scope.imagetobeup = resultImage[0];
      $scope.uploadPhoto(adminurl + "upload/", function(data) {
        console.log(data);
        console.log(JSON.parse(data.response));
        var parsedImage = JSON.parse(data.response);
        $scope.personal.profilePicture = parsedImage.data[0];
      });
    }, function(err) {
      // An error occured. Show a message to the user
    });
  }

  //  $scope.getImageSaveContact = function() {
  //      // Image picker will load images according to these settings
  //      var options = {
  //          maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
  //          width: 800,
  //          height: 800,
  //          quality: 80            // Higher is better
  //      };
  //
  //      $cordovaImagePicker.getPictures(options).then(function (results) {
  //          // Loop through acquired images
  //          for (var i = 0; i < results.length; i++) {
  //              $scope.collection.selectedImage = results[i];   // We loading only one image so we can use it like this
  //
  //              window.plugins.Base64.encodeFile($scope.collection.selectedImage, function(base64){  // Encode URI to Base64 needed for contacts plugin
  //                  $scope.collection.selectedImage = base64;
  //              });
  //          }
  //      }, function(error) {
  //          console.log('Error: ' + JSON.stringify(error));    // In case of error
  //      });
  //  };


  $scope.uploadPhoto = function(serverpath, callback) {
    console.log("function called");
    // if ($scope.imagetobeup) {
    //     $scope.startloading();
    // }
    $cordovaFileTransfer.upload(serverpath, $scope.imagetobeup, options)
      .then(function(result) {
        console.log(result);
        callback(result);
        $ionicLoading.hide();
        //$scope.addretailer.store_image = $scope.filename2;
      }, function(err) {
        // Error
        console.log(err);
      }, function(progress) {
        // constant progress updates
      });
  };
  // $scope.imgURI = "img/takephoto.png";
  // $scope.takePhotoCamera = function() {
  //   var options = {
  //     quality: 75,
  //     destinationType: Camera.DestinationType.DATA_URL,
  //     sourceType: Camera.PictureSourceType.CAMERA,
  //     allowEdit: true,
  //     encodingType: Camera.EncodingType.JPEG,
  //     targetWidth: 300,
  //     targetHeight: 300,
  //     popoverOptions: CameraPopoverOptions,
  //     saveToPhotoAlbum: false
  //   };
  //
  //   $cordovaCamera.getPicture(options).then(function(imageData) {
  //     console.log("hi1");
  //
  //     $scope.imgURI = "data:image/jpeg;base64," + imageData;
  //   }, function(err) {
  //     // An error occured. Show a message to the user
  //   });
  // }

  // $scope.choosePhoto = function() {
  //   var options = {
  //     quality: 75,
  //     destinationType: Camera.DestinationType.DATA_URL,
  //     sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
  //     allowEdit: true,
  //     encodingType: Camera.EncodingType.JPEG,
  //     targetWidth: 300,
  //     targetHeight: 300,
  //     popoverOptions: CameraPopoverOptions,
  //     saveToPhotoAlbum: false
  //   };
  //
  //   $cordovaCamera.getPicture(options).then(function(imageData) {
  //     $scope.imgURI = "data:image/jpeg;base64," + imageData;
  //   }, function(err) {
  //     // An error occured. Show a message to the user
  //   });
  // }

})

// ====================================

.controller('LoginCtrl', function($scope, $ionicModal, $timeout, MyServices, $ionicPopup, $state, $timeout) {
    $.jStorage.flush();
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

    $scope.submitForm = function(userdata, formName) {
      // console.log(formName.email.$touched);
      MyServices.signup(userdata, function(data) {

        if (data.value === true) {

          console.log(data);
          formName.name.$touched = false;
          formName.agency.$touched = false;
          formName.number.$touched = false;
          formName.web.$touched = false;
          formName.email.$touched = false;
          $scope.showAlert();
          $scope.formData = {};

        }
      });
    }


    $scope.submitLoginForm = function(userdata) {
      MyServices.login(userdata, function(data) {
        if(data.data.message == 'No Data Found'){
          $scope.showAlertNoData();
        }else{
          $.jStorage.set('userProfile', data.data);
          $scope.myuserId = data.data._id;
          $state.go('app.profile', {
            id: $scope.myuserId
          })
          console.log(data);
        }

      });
    }
    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        cssClass: 'text-center',
        buttons: [{
          text: 'Ok',
          type: 'button-assertive'
        }],
        template: 'Registration Successfull !!'
      });

      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };
    $scope.showAlertNoData = function() {
      var alertPopup = $ionicPopup.alert({
        cssClass: 'text-center',
        buttons: [{
          text: 'Ok',
          type: 'button-assertive'
        }],
        template: 'User Not Registered !!'
      });

      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };
  })
  .controller('SignupCtrl', function($scope, MyServices) {

  })
  // .controller('ProfileCtrl', function($scope, MyServices, $stateParams) {
  //
  // })

.controller('ChangePasswordCtrl', function($scope, MyServices, $stateParams, $ionicPopup) {
    var dataToSend = {};
    dataToSend._id = $stateParams.id;
    $scope.chngPassword = {};
    $scope.submitChangePswd = function(input, formName) {
      console.log(formName);
      dataToSend.password = input.password;
      dataToSend.changePassword = input.changePassword;
      MyServices.getChangePassword(dataToSend, function(data) {
        if(data.data.message == 'No Data Found'){
          $scope.correctPasswordAlert();
          formName.oldpassword.$touched = false;
          $scope.chngPassword.password= '';
        }else{
          console.log(data);
          formName.oldpassword.$touched = false;
          formName.newpassword.$touched = false;
          formName.confirmpassword.$touched = false;
          $scope.showChangePasswordAlert();
          $scope.chngPassword = {};

        console.log(data);
        // $scope.profileData = data.data;
        // console.log($scope.profileData);
      }
      });
    }

    $scope.showChangePasswordAlert = function() {
      var alertPopup = $ionicPopup.alert({
        cssClass: 'text-center',
        buttons: [{
          text: 'Ok',
          type: 'button-assertive'
        }],
        template: 'Password Changed Successfully !!'
      });

      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };
    $scope.correctPasswordAlert = function() {
      var alertPopup = $ionicPopup.alert({
        cssClass: 'text-center',
        buttons: [{
          text: 'Ok',
          type: 'button-assertive'
        }],
        template: 'Please Insert Correct Password!!'
      });

      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };
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
