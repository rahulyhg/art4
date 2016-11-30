angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, MyServices) {

})


// ===============================
.controller('ProfileCtrl', function($scope, $stateParams, $cordovaFileTransfer, $ionicLoading, $cordovaImagePicker, MyServices, $cordovaCamera,$filter) {

  // =============ProfilectrlCode====================
  // $scope.profileData = {};
  MyServices.getprofile($stateParams.id, function(data) {
    console.log(data);
    $scope.profileData = data.data;
    $scope.profileData.bgimage = $filter('uploadpath')($scope.profileData.bgimage);
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


  // =================== t code ===============================
  // Upload Profile Pic
  $scope.imagetobeup = "img/profile.png";
  $scope.selectImage = function() {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    $cordovaCamera.getPicture(options).then(function(imageURI) {
      $scope.profileImage = imageURI;
     $scope.uploadImage($scope.profileImage);
     $scope.uploadImageBackground($scope.profileImage);
    }, function(err) {
      // error
    });
  };

  //Upload Image
  $scope.uploadImage = function(imageURI) {
    console.log('imageURI',imageURI);
    // $scope.showLoading('Uploading Image...', 10000);
    $cordovaFileTransfer.upload(adminurl + 'upload', imageURI)
      .then(function(result) {
        // Success!
        console.log(result.response);
        result.response = JSON.parse(result.response);
        $scope.profileData.image = result.response.data[0];
        // $scope.submitData($scope.formData);
        $scope.submitProfile($scope.profileData);
      }, function(err) {
        // Error
        $scope.hideLoading();
        $scope.showLoading('Error!', 2000);
      }, function(progress) {
        // constant progress updates
      });
  };
  $scope.uploadImageBackground = function(imageURI) {
    console.log('imageURI',imageURI);
    // $scope.showLoading('Uploading Image...', 10000);
    $cordovaFileTransfer.upload(adminurl + 'upload', imageURI)
      .then(function(result) {
        // Success!
        console.log(result.response);
        result.response = JSON.parse(result.response);
        $scope.profileData.bgimage = result.response.data[0];
        $scope.profileData.bgimage = $filter('uploadpath')($scope.profileData.bgimage);
        $scope.submitProfile($scope.profileData);
      }, function(err) {
        // Error
        $scope.hideLoading();
        $scope.showLoading('Error!', 2000);
      }, function(progress) {
        // constant progress updates
      });
  };
  // =================== end of t code =========================

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
    $scope.forgotPsws = {};

    $scope.forgotSubmit = function(input, formName) {
      console.log('forrrrrrrrrrrrr');
      MyServices.forgotPassword(input, function(data) {
        if (data.data.comment == 'User not found') {
          $scope.showAlertNoData();
        } else {

          console.log(data);
          formName.email.$touched = false;
          $scope.okForgotPassword();
          $scope.forgotPsws = {};

        }
      });

    }

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
        if (data.data.message == 'No Data Found') {
          $scope.showAlertNoData();
        } else {
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
        $scope.closeModals();
      });
    };
    $scope.okForgotPassword = function() {
      var alertPopup = $ionicPopup.alert({
        cssClass: 'text-center',
        buttons: [{
          text: 'Ok',
          type: 'button-assertive'
        }],
        template: 'We have sent you a temporary password on your registered e-mail ID. You may use that to login for now.'
      });

      alertPopup.then(function(res) {
        $scope.closeModal();
        // $state.go('login');
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
        if (data.data.message == 'No Data Found') {
          $scope.correctPasswordAlert();
          formName.oldpassword.$touched = false;
          $scope.chngPassword.password = '';
        } else {
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
  .controller('SearchArtistCtrl', function($scope, MyServices) {
    $scope.getUser = $.jStorage.get("userProfile");
    $scope.getSearch = function() {}
    MyServices.getUserDetails(function(data) {
      $scope.getArtist10 = data.data;
      console.log('$scope.getArtist10', $scope.getArtist10);

    });
  })
  .controller('ArtishCtrl', function($scope, $ionicScrollDelegate, $ionicPopup, $timeout, $ionicLoading, $stateParams, $state, MyServices) {

    $scope.tab = 'new';
    $scope.classa = 'active';
    $scope.classb = '';
    $scope.tabchange = function(tab, a) {

      //        console.log(tab);
      $scope.tab = tab;
      if (a == 1) {
          $scope.showArtistList();
        $ionicScrollDelegate.scrollTop();
        $scope.classa = "active";
        $scope.classb = '';
      } else {
          $scope.showMyList();
        $ionicScrollDelegate.scrollTop();
        $scope.classa = '';
        $scope.classb = "active";
      }
    };
    $scope.getUserDetail = $.jStorage.get("userProfile");
    console.log($scope.getUserDetail._id);
    // $sccope.getArtist = [{
    //   "name":"abc",
    //   "city":"mumbai",
    //   "image":"img/download.jpg"
    // },{
    //   "name":"xyz",
    //   "city":"pune",
    //   "image":"img/images.jpg"
    // },{
    //   "name":"jkl",
    //   "city":"paris",
    //   "image":"img/download.jpg"
    // }]
    var dataToSend = {
      artistName: $stateParams.search,
      artistCity: $stateParams.city,
      talent: $stateParams.talent,
      artistGenre: $stateParams.genre,
      budget: $stateParams.budget,
    };
    $scope.showArtistList = function(){
      MyServices.filterResult(dataToSend, function(data) {
        $scope.getArtist = data.data;
        console.log('$scope.getArtist', $scope.getArtist[0]);

      });
    }
      $scope.showArtistList();


    // ==========================================================================================shortList===================
    $scope.addToWishlist = function(id, flag) {
      console.log(flag);
      if (flag == true) {
        console.log('funid', id);
        var input = {
          artist: id,
          timestamp: new Date()
        };
        $scope.getUserDetail.shortList.push(input);
        console.log('$scope.getUserDetail.shortList', $scope.getUserDetail.shortList);
      } else {
        function checkAdult(o) {
          return o.artist == id;
        }

        var index = $scope.getUserDetail.shortList.findIndex(checkAdult);
        if (index != -1) {
          $scope.getUserDetail.shortList.splice(index, 1);
            console.log('$scope.getUserDetail.shortList splice', $scope.getUserDetail.shortList);
        }
      }

    };
    $scope.submitOnMyList = function() {
      MyServices.signup($scope.getUserDetail, function(data) {
        console.log('inside save');
        if (data.value === true) {
          console.log(data);
          // $scope.mesg.push({
          //     type: 'success',
          //     msg: 'Added To Your Shortlist'
          // });
          // MyServices.getUser(function(logindata) {
          //     _.each($scope.expertdata, function(n) {
          //         n.showbtn = $filter('showbtn')(n._id, logindata);
          //
          //     })
          // })
        }
        // $scope.closeAlert = function(index) {
        //     $scope.mesg.splice(index, 1);
        // }
      });
    }
    MyServices.getprofile($scope.getUserDetail._id, function(user) {
      $scope.userdata = user.data;
      console.log($scope.userdata);
    });
    $scope.showMyList = function() {
      MyServices.addedList($scope.getUserDetail._id, function(data) {
        $scope.getListOfArtist = data.data.shortList;
        console.log('$scope.getListOfArtist', $scope.getListOfArtist);

      });
    }

    $scope.showMyList();
    $scope.removeWishlist = function(id) {
      MyServices.removeFromList(id, function(data) {
$scope.showMyList();
      })
      $scope.showMyList();
    };
    $scope.showSendListAlert = function() {
      var alertPopup = $ionicPopup.alert({
        cssClass: 'text-center',
        buttons: [{
          text: 'Ok',
          type: 'button-assertive'
        }],
        template: 'Thank you for enquiry.You will get quotation shortly.'
      });

      alertPopup.then(function(res) {
        MyServices.emptyList($scope.getUserDetail._id, function(data) {
          console.log(data);
  $scope.showMyList();
        })
      });
    };
    $scope.sendProfile = function(){
      MyServices.sendProfileToBackend($scope.getUserDetail._id,function(data){
        console.log(data);
        if(data.value == true){
          $scope.showSendListAlert();
        }
      })
    }

  })

.controller('PlaylistCtrl', function($scope, $stateParams) {});
