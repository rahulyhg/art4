angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, MyServices, $filter, $state) {
  var getUserProfile = $.jStorage.get('userProfile');
  if ($.jStorage.get('userProfile')) {
    MyServices.getprofile(getUserProfile._id, function(data) {
      console.log(data);
      $scope.profileData = data.data;
      $scope.profileData.bgimage = $filter('uploadpath')($scope.profileData.bgimage);
      $scope.ProfileImgForMenu = $filter('uploadpath')($scope.profileData.image);
      // console.log('$scope.ProfileImgForMenu',$scope.ProfileImgForMenu);
    });
  }
  $scope.getprofile = function() {
    console.log("hi");
    MyServices.getprofile(getUserProfile._id, function(data) {
      console.log(data);
      $scope.profileData = data.data;
      $scope.profileData.bgimage = $filter('uploadpath')($scope.profileData.bgimage);
      $scope.ProfileImgForMenu = $filter('uploadpath')($scope.profileData.image);
      // console.log('$scope.ProfileImgForMenu',$scope.ProfileImgForMenu);
    });
  };
  $scope.logout = function() {
    $.jStorage.set('userProfile', null);
    $.jStorage.deleteKey('userProfile');
    $.jStorage.flush();

    if ($.jStorage.get('userProfile') === null) {
      $state.go('login');

    }
  };
})


// ===============================
.controller('ProfileCtrl', function($scope, $stateParams, $cordovaFileTransfer, $ionicLoading, $cordovaImagePicker, MyServices, $cordovaCamera, $filter, $state) {
  // =============ProfilectrlCode====================
  var getUserProfile = $.jStorage.get('userProfile');
  if ($.jStorage.get('userProfile')) {
    $scope.userId = getUserProfile._id;
  }
  $scope.profileData = {};
  MyServices.getprofile($.jStorage.get('userProfile')._id, function(data) {
    console.log(data);
    $scope.profileData = data.data;
    $scope.profileData.bgimage = $filter('uploadpath')($scope.profileData.bgimage);
    $scope.ProfileImgForMenu = $filter('uploadpath')($scope.profileData.image);
    // console.log('$scope.ProfileImgForMenu',$scope.ProfileImgForMenu);
  });

  $scope.submitProfile = function(input) {
    var res = [];
    console.log(input);
    // $scope.profileData.bgimage = $filter('uploadpath')($scope.profileData.bgimage);
    if ($scope.profileData.bgimage) {
      var res = $scope.profileData.bgimage.split("=");
    }
    console.log(res);
    $scope.profileData.bgimage = res[1];
    // $scope.profileData.bgimage = "58ece7f1fe67247ce2ad7b0d.jpg";
    console.log('$scope.profileData.bgimage', $scope.profileData.bgimage);
    MyServices.signup($scope.profileData, function(data) {
      console.log($scope.profileData,data);
      // $scope.getMyProfile();
      MyServices.getprofile($.jStorage.get('userProfile')._id, function(data) {
        console.log(data);
        $scope.profileData = data.data;
        $scope.profileData.bgimage = $filter('uploadpath')($scope.profileData.bgimage);
        $scope.ProfileImgForMenu = $filter('uploadpath')($scope.profileData.image);
        // console.log('$scope.ProfileImgForMenu',$scope.ProfileImgForMenu);
      });
      // $state.go('app.search-artist');
    });

  }

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
      targetWidth: 100,
      targetHeight: 100,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    $cordovaCamera.getPicture(options).then(function(imageURI) {
      $scope.profileImage = imageURI;
      $scope.uploadImage($scope.profileImage);
      //  $scope.uploadImageBackground($scope.profileImage);
    }, function(err) {
      // error
    });
  };
  $scope.selectImageBg = function() {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 320,
      targetHeight: 150,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    $cordovaCamera.getPicture(options).then(function(imageURI) {
      $scope.profileImage = imageURI;
      //  $scope.uploadImage($scope.profileImage);
      $scope.uploadImageBackground($scope.profileImage);
    }, function(err) {
      // error
    });
  };

  //Upload Image
  $scope.uploadImage = function(imageURI) {
    console.log('imageURI', imageURI);
    // $scope.showLoading('Uploading Image...', 10000);
    $cordovaFileTransfer.upload(adminurl + 'upload', imageURI)
      .then(function(result) {
        // Success!
        console.log(result.response);
        result.response = JSON.parse(result.response);
        $scope.profileData.image = result.response.data[0];
        // $scope.submitData($scope.formData);
        // $scope.submitProfile($scope.profileData);
      }, function(err) {
        // Error
        // $scope.hideLoading();
        $scope.showLoading('Error!', 2000);
      }, function(progress) {
        // constant progress updates
      });
  };
  $scope.uploadImageBackground = function(imageURI) {

    console.log('imageURI', imageURI);
    // $scope.showLoading('Uploading Image...', 10000);
    $cordovaFileTransfer.upload(adminurl + 'upload', imageURI)
      .then(function(result) {
        // Success!
        console.log(result.response);
        result.response = JSON.parse(result.response);
        $scope.profileData.bgimage = result.response.data[0];
        $scope.profileData.bgimage = $filter('uploadpath')($scope.profileData.bgimage);
        // $scope.submitProfile($scope.profileData);
      }, function(err) {
        // Error
        // $scope.hideLoading();
        $scope.showLoading('Error!', 2000);
      }, function(progress) {
        // constant progress updates
      });
  };
  // =================== end of t code =========================

//=========profile like search=============

$scope.getUser = $.jStorage.get('userProfile');
console.log('$scope.getUser', $scope.getUser);

if ($scope.getUser) {



  MyServices.getprofile($scope.getUser._id, function(user) {
    $scope.userdata = user.data;
    // $scope.userdata.bgimage = 'img/artistPage.jpeg';
    $scope.userdata.bgimage = $filter('uploadpath')($scope.userdata.bgimage);
    console.log($scope.userdata);
  });
  // $scope.getSearch = function() {}
  MyServices.getUserDetails(function(data) {
    $scope.getArtist10 = data.data;
    console.log('$scope.getArtist10', $scope.getArtist10);

  });

}

//=========profile like search=============


})

// ====================================

.controller('LoginCtrl', function($scope, $ionicModal, $timeout, MyServices, $ionicPopup, $state, $timeout) {
    console.log($.jStorage.get('userProfile'));
    if ($.jStorage.get('userProfile')) {
      $state.go('app.search-artist');
    }
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
      console.log(formName.email.$touched);
      MyServices.signup(userdata, function(data) {
        if (data.value === true) {
          console.log(data);
          $.jStorage.set('userProfile', data.data);
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
          $state.go('app.search-artist')
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
        $state.go('app.profile');
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

.controller('ChangePasswordCtrl', function($scope, MyServices, $stateParams, $ionicPopup, $filter) {
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
  .controller('SearchArtistCtrl', function($scope, MyServices, $filter, $state) {

    $scope.getUser = $.jStorage.get('userProfile');
    console.log('$scope.getUser', $scope.getUser);

    if ($scope.getUser) {



      MyServices.getprofile($scope.getUser._id, function(user) {
        $scope.userdata = user.data;
        // $scope.userdata.bgimage = 'img/artistPage.jpeg';
        $scope.userdata.bgimage = $filter('uploadpath')($scope.userdata.bgimage);
        console.log($scope.userdata);
      });
      // $scope.getSearch = function() {}
      MyServices.getUserDetails(function(data) {
        $scope.getArtist10 = data.data;
        console.log('$scope.getArtist10', $scope.getArtist10);

      });

    }

    
  })
  .controller('ArtishCtrl', function($scope, $ionicScrollDelegate, $ionicPopup, $timeout, $ionicLoading, $stateParams, $state, MyServices, $filter, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/modal/image.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.searchText = "";

    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    $scope.tab = 'new';
    $scope.classa = 'active';
    $scope.classb = '';
    $scope.goBackHandler = function() {
      console.log("hi");
      window.history.back(); //This works
    }
    $scope.tabchange = function(tab, a) {
      console.log($scope.searchText);
      $scope.searchText = "";
      console.log($scope.searchText);

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
    $scope.getUserDetail = $.jStorage.get('userProfile');
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
    $scope.showArtistList = function() {
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
          $scope.searchText = "";
          console.log(data);
          $scope.tabchange('already', 2);
          // $scope.getUserDetail.shortList = [];
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
      $scope.userdata.bgimage = $filter('uploadpath')($scope.userdata.bgimage);
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
          // $scope.showMyList();
          $state.go('app.search-artist');
        })
      });
    };
    $scope.sendProfile = function() {
      MyServices.sendProfileToBackend($scope.getUserDetail._id, function(data) {
        console.log(data);
        if (data.value == true) {
          $scope.showSendListAlert();
          $scope.getUserDetail.shortList = [];
        }
      })
    }

  })

.controller('PlaylistCtrl', function($scope, $stateParams) {});
