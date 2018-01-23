angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, MyServices, $filter, $state) {
    var getUserProfile = $.jStorage.get('userProfile');
    if ($.jStorage.get('userProfile')) {
      MyServices.getprofile(getUserProfile._id, function (data) {
        console.log(data);
        $scope.appdata = data.data;
        $scope.appdata.bgimage = $filter('uploadpath')($scope.appdata.bgimage);
        $scope.ProfileImgForMenu = $filter('uploadpath')($scope.appdata.image);
        // console.log('$scope.ProfileImgForMenu',$scope.ProfileImgForMenu);
      });
    }
    $scope.getprofile = function () {
      console.log("hi");
      MyServices.getprofile(getUserProfile._id, function (data) {
        console.log(data);
        $scope.appdata = data.data;
        $scope.appdata.bgimage = $filter('uploadpath')($scope.appdata.bgimage);
        $scope.ProfileImgForMenu = $filter('uploadpath')($scope.appdata.image);
        // console.log('$scope.ProfileImgForMenu',$scope.ProfileImgForMenu);
      });
    };
    $scope.logout = function () {
      $.jStorage.set('userProfile', null);
      $.jStorage.deleteKey('userProfile');
      $.jStorage.flush();

      if ($.jStorage.get('userProfile') === null) {
        $state.go('login');

      }
    };
  })


  // ===============================
  .controller('ProfileCtrl', function ($scope, $stateParams, $state, $ionicPopup, $cordovaFileTransfer, $ionicLoading, $cordovaImagePicker, MyServices, $cordovaCamera, $filter, $state) {
    // =============ProfilectrlCode====================
    var getUserProfile = $.jStorage.get('userProfile');
    if ($.jStorage.get('userProfile')) {
      $scope.userId = getUserProfile._id;
    }
    $scope.profileData = {};
    MyServices.getprofile($.jStorage.get('userProfile')._id, function (data) {
      console.log(data);
      $scope.profileData = data.data;
      // $scope.profileData.bgimage = $filter('uploadpath')($scope.profileData.bgimage);
      // $scope.ProfileImgForMenu = $filter('uploadpath')($scope.profileData.image);
      // console.log('$scope.ProfileImgForMenu',$scope.ProfileImgForMenu);
    });

    $scope.submitProfile = function (input) {
      var res = [];
      console.log(input);
      // $scope.profileData.bgimage = $filter('uploadpath')($scope.profileData.bgimage);
      // if ($scope.profileData.bgimage) {
      //   var res = $scope.profileData.bgimage.split("=");
      // }
      // console.log(res);
      // $scope.profileData.bgimage = res[1];
      // $scope.profileData.bgimage = "58ece7f1fe67247ce2ad7b0d.jpg";
      console.log('$scope.profileData.bgimage', $scope.profileData.bgimage);
      MyServices.updateProfile($scope.profileData, function (data) {
        console.log($scope.profileData, data);
        // $scope.getMyProfile();
        MyServices.getprofile($.jStorage.get('userProfile')._id, function (data) {
          console.log(data);
          if (data.value) {
            $scope.profileData = data.data;
            $.jStorage.set('userProfile', data.data);
            var alertPopup = $ionicPopup.alert({
              cssClass: 'text-center',
              buttons: [{
                text: 'Ok',
                type: 'button-assertive'
              }],
              template: 'Your profile has been successfully updated.'
            });

            alertPopup.then(function (res) {
              $state.go('app.search-artist')
            });

          }
          // $scope.profileData.bgimage = $filter('uploadpath')($scope.profileData.bgimage);
          // $scope.ProfileImgForMenu = $filter('uploadpath')($scope.profileData.image);
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
    $scope.selectImage = function () {
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
      $cordovaCamera.getPicture(options).then(function (imageURI) {
        $scope.profileImage = imageURI;
        $scope.uploadImage($scope.profileImage);
        //  $scope.uploadImageBackground($scope.profileImage);
      }, function (err) {
        // error
      });
    };
    $scope.selectImageBg = function () {
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
      $cordovaCamera.getPicture(options).then(function (imageURI) {
        $scope.profileImage = imageURI;
        //  $scope.uploadImage($scope.profileImage);
        $scope.uploadImageBackground($scope.profileImage);
      }, function (err) {
        // error
      });
    };

    //Upload Image
    $scope.uploadImage = function (imageURI) {
      console.log('imageURI', imageURI);
      // $scope.showLoading('Uploading Image...', 10000);
      $cordovaFileTransfer.upload(adminurl + 'upload', imageURI)
        .then(function (result) {
          // Success!
          console.log(result.response);
          result.response = JSON.parse(result.response);
          $scope.profileData.image = result.response.data[0];
          // $scope.submitData($scope.formData);
          // $scope.submitProfile($scope.profileData);
        }, function (err) {
          // Error
          // $scope.hideLoading();
          $scope.showLoading('Error!', 2000);
        }, function (progress) {
          // constant progress updates
        });
    };
    $scope.uploadImageBackground = function (imageURI) {

      console.log('imageURI', imageURI);
      // $scope.showLoading('Uploading Image...', 10000);
      $cordovaFileTransfer.upload(adminurl + 'upload', imageURI)
        .then(function (result) {
          // Success!
          console.log(result.response);
          result.response = JSON.parse(result.response);
          $scope.profileData.bgimage = result.response.data[0];
          // $scope.profileData.bgimage = $filter('uploadpath')($scope.profileData.bgimage);
          // $scope.submitProfile($scope.profileData);
        }, function (err) {
          // Error
          // $scope.hideLoading();
          $scope.showLoading('Error!', 2000);
        }, function (progress) {
          // constant progress updates
        });
    };
    // =================== end of t code =========================

    //=========profile like search=============

    $scope.getUser = $.jStorage.get('userProfile');
    console.log('$scope.getUser', $scope.getUser);

    if ($scope.getUser) {



      MyServices.getprofile($scope.getUser._id, function (user) {
        $scope.userdata = user.data;
        // $scope.userdata.bgimage = 'img/artistPage.jpeg';
        // $scope.userdata.bgimage = $filter('uploadpath')($scope.userdata.bgimage);
        console.log($scope.userdata);
      });
      // $scope.getSearch = function() {}
      MyServices.getUserDetails(function (data) {
        $scope.getArtist10 = data.data;
        console.log('$scope.getArtist10', $scope.getArtist10);

      });

    }

    //=========profile like search=============


  })

  // ====================================

  .controller('LoginCtrl', function ($scope, $ionicModal, $timeout, MyServices, $ionicPopup, $state) {
   
    console.log($.jStorage.get('userProfile'));
    var getUserProfile = $.jStorage.get('userProfile');
    //  console.log(getUserProfile.status)

    if ($.jStorage.get('userProfile')) {
      if ((getUserProfile.status == true)) {
        $state.go('app.profile');
      }
    }

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
    $scope.forgotPsws = {};

    $scope.forgotSubmit = function (input, formName) {
      console.log('forrrrrrrrrrrrr');
      MyServices.forgotPassword(input, function (data) {
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
    }).then(function (modals) {
      $scope.modals = modals;
    });
    $scope.openModals = function () {
      $scope.modals.show();
    };
    $scope.closeModals = function () {
      $scope.modals.hide();
    };
    $scope.formData = {};

    $scope.submitForm = function (userdata, formName) {
      console.log(formName.email.$touched);
      MyServices.signup(userdata, function (data) {
        if (data.value === true) {
          console.log(data);
          $.jStorage.set('userProfileOTP', data.data);
          formName.name.$touched = false;
          formName.agency.$touched = false;
          formName.number.$touched = false;
          formName.web.$touched = false;
          formName.email.$touched = false;
          //$scope.showAlert();
          $scope.formData = {};
          $scope.modals.hide();
          $state.go('otp');
        } else {
          var alertPopup = $ionicPopup.alert({
            cssClass: 'text-center',
            buttons: [{
              text: 'Ok',
              type: 'button-assertive'
            }],
            template: 'Unable to generate OTP.'
          });
        }
      });
    }
    $scope.submitLoginForm = function (userdata) {
      MyServices.login(userdata, function (data) {
        if ((data.data.message == 'No Data Found') || (data.data.status == false)) {
          $scope.showAlertNoData();
          console.log("no data found");
        } else {
          $.jStorage.set('userProfile', data.data);
          $scope.myuserId = data.data._id;
          $state.go('app.profile')
          console.log(data);
        }

      });
    }
    $scope.showAlert = function () {
      var alertPopup = $ionicPopup.alert({
        cssClass: 'text-center',
        buttons: [{
          text: 'Ok',
          type: 'button-assertive'
        }],
        template: 'Registration Successfull !!'
      });

      alertPopup.then(function (res) {
        $scope.closeModals();
        $state.go('app.profile');
      });
    };
    $scope.okForgotPassword = function () {
      var alertPopup = $ionicPopup.alert({
        cssClass: 'text-center',
        buttons: [{
          text: 'Ok',
          type: 'button-assertive'
        }],
        template: 'We have sent you a temporary password on your registered e-mail ID. You may use that to login for now.'
      });

      alertPopup.then(function (res) {
        $scope.closeModal();
        // $state.go('login');
      });
    };
    $scope.showAlertNoData = function () {
      var alertPopup = $ionicPopup.alert({
        cssClass: 'text-center',
        buttons: [{
          text: 'Ok',
          type: 'button-assertive'
        }],
        template: 'User Not Registered !!'
      });

      alertPopup.then(function (res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };
  })


  .controller('ChangePasswordCtrl', function ($scope, MyServices, $stateParams, $ionicPopup, $filter) {
    var dataToSend = {};
    dataToSend._id = $stateParams.id;
    $scope.chngPassword = {};
    $scope.submitChangePswd = function (input, formName) {
      console.log(formName);
      dataToSend.password = input.password;
      dataToSend.changePassword = input.changePassword;
      MyServices.getChangePassword(dataToSend, function (data) {
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

    $scope.showChangePasswordAlert = function () {
      var alertPopup = $ionicPopup.alert({
        cssClass: 'text-center',
        buttons: [{
          text: 'Ok',
          type: 'button-assertive'
        }],
        template: 'Password Changed Successfully !!'
      });

      alertPopup.then(function (res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };
    $scope.correctPasswordAlert = function () {
      var alertPopup = $ionicPopup.alert({
        cssClass: 'text-center',
        buttons: [{
          text: 'Ok',
          type: 'button-assertive'
        }],
        template: 'Please Insert Correct Password!!'
      });

      alertPopup.then(function (res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };
  })
  .controller('SearchArtistCtrl', function ($scope, MyServices, $ionicPopup, $ionicModal, $timeout, $filter, $state, $stateParams) {
    $scope.artistList = {}
    $scope.getListOfArtist = [];
    $scope.getArtist = [];
    $scope.otp = {}
    $scope.otpToSend = '';
    $scope.resend = true;
    $scope.getUserDetail = $.jStorage.get('userProfile'); //TO get user details
    var _id = $scope.getUserDetail._id
    $scope.otp._id = $scope.getUserDetail._id;
    $scope.artistList._id = _id
    $scope.artistList.shortList = []
 
  
    // $scope.artistList.shortList = $scope.getListOfArtist
console.log("hellocheck",$scope.getArtist)
    //Get data from state param to get artist list from backend;
    var dataToSend = {
      artistName: $stateParams.search,
      artistCity: $stateParams.city,
      talent: $stateParams.talent,
      artistGenre: $stateParams.genre,
      budget: $stateParams.budget,
    };
    $scope.playerVars = {
    controls: 0,
    autoplay: 1
};
    $scope.getUser = $.jStorage.get('userProfile');
    console.log('$scope.getUser', $scope.getUser);

    if ($scope.getUser) {



      MyServices.getprofile($scope.getUser._id, function (user) {
        $scope.userdata = user.data;
        // $scope.userdata.bgimage = 'img/artistPage.jpeg';
        // $scope.userdata.bgimage = $filter('uploadpath')($scope.userdata.bgimage);
        console.log($scope.userdata);
      });
      // $scope.getSearch = function() {}
      MyServices.getUserDetails(function (data) {
        $scope.getArtist10 = data.data;
        console.log('$scope.getArtist10', $scope.getArtist10);

      });

    }
    $scope.keyword = {
      'keyword':''
    };
    $scope.search = function (value) {
      // var length = 0;
      $scope.companyCategory = [];
      $scope.isText = true;
      console.log("searchvalue",value)
      if (value != "") {
          console.log("searchvalue1",value)
          
          MyServices.search(value, function (data) {
              console.log("searchvalue2",value,data)
              if (data.value) {
                  console.log("Event data", data.data.results);
                  $scope.artist = data.data.results;
                  
                  console.log("close",$scope.artist);
              } else {
                  console.log("Event data false");
              }
          // else{
          //     console.log("not working")
          // }
          });
      }
  };


  $scope.limit = 5;
  $scope.checked = 0;
  $scope.addToWishlist = function (data, flag) {
    console.log("helloflag",flag)
    if (flag == true) {
      $scope.checked++;
      var artistObj = _.find($scope.getListOfArtist, function (o) {
        // console.log("check",$scope.getListOfArtist)
        if (data._id === o._id) {
          return o;
        }
      });

     
      
      if (artistObj === undefined) {
        $scope.getListOfArtist.push(data);
       
      }
    } else {
      $scope.checked--;
      var artistObj = _.find($scope.getListOfArtist, function (o) {
        if (data._id === o._id) {
          return o;
        }
      });
      _.pull($scope.getListOfArtist,artistObj );
      console.log("pullnotworking",$scope.getListOfArtist)
      
   
    }
    $scope.getUserDetail.getListOfArtist = $scope.getListOfArtist
    $.jStorage.set('userProfile', $scope.getUserDetail);
    console.log("check",$scope.getListOfArtist)
  };

 

    $ionicModal.fromTemplateUrl('templates/modal/generateOtp.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
    _.each($scope.getListOfArtist,function(val){
      console.log("helloids",val)
      $scope.artistList.shortList.push({
        artist:val._id
      })
      console.log("artistid",$scope.artistList)
    })
    MyServices.Otp($scope.otp, function (data){
      console.log("otpplease",data)
    });
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };

  $scope.submitOtp=function(){
    console.log("almostder",$scope.artistList)
MyServices.submitOtp($scope.artistList, function (data){
console.log("submitOtp",data)
if(data.value=true){
  var alertPopup = $ionicPopup.alert({
    cssClass: 'text-center',
    buttons: [{
      text: 'Ok',
      type: 'button-assertive',
      onTap: function (e) {
                          $state.go('app.profile');
                          $scope.closeModal()
                      }
    }],
    template: 'SMS Sent Successfully!!!'
  });
}
})
  }

  $scope.resendOtp=function(){
    $scope.resend = false;
    MyServices.Otp($scope.otp, function (data){
      console.log("otpplease",data)
      $timeout(function () {
        $scope.resend = true;
      }, 10000);
    });
  }

  var init = function () {
    return $ionicModal.fromTemplateUrl('templates/modal/video.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;

    });
  };

  $scope.video = {};
  $scope.showVideo = function (url) {
    init().then(function () {
      $scope.modal.show();
    });
    $scope.url=url;
    if(url)
    var link = url.split("=");
    if (link) {
      $scope.video.url = link[1] + "?autoplay=1";
    }else{
      console.log(url);
      $scope.video.url = url + "?autoplay=1";
    }
  };

  $scope.closeVideo = function () {
   
   
  };

  })
  // $ionicModal.fromTemplateUrl('templates/modal/forgot-password.html', {
  //   scope: $scope,
  //   animation: 'slide-in-up'
  // }).then(function (modal) {
  //   $scope.modal = modal;
  // });
  // $scope.openModal = function () {
  //   $scope.modal.show();
  // };
  // $scope.closeModal = function () {
  //   $scope.modal.hide();
  // };

 

  // .controller('ArtistCtrl', function ($scope, $ionicScrollDelegate, $ionicPopup, $timeout, $ionicLoading, $stateParams, $state, MyServices, $filter, $ionicModal) {
  //   $scope.getListOfArtist = [];
  //   $ionicModal.fromTemplateUrl('templates/modal/image.html', {
  //     scope: $scope,
  //     animation: 'slide-in-up'
  //   }).then(function (modal) {
  //     $scope.modal = modal;
  //   });
  //   $scope.searchText = "";

  //   $scope.openModal = function () {
  //     $scope.modal.show();
  //   };
  //   $scope.closeModal = function () {
  //     $scope.modal.hide();
  //   };
  //   $scope.tab = 'new';
  //   $scope.classa = 'active';
  //   $scope.classb = '';
  //   $scope.goBackHandler = function () {
  //     console.log("hi");
  //     window.history.back(); //This works
  //   }
  //   $scope.tabchange = function (tab, a) {
  //     console.log($scope.searchText);
  //     $scope.searchText = "";
  //     console.log($scope.searchText);

  //     //        console.log(tab);
  //     $scope.tab = tab;
  //     if (a == 1) {
  //       $scope.showArtistList();
  //       $ionicScrollDelegate.scrollTop();
  //       $scope.classa = "active";
  //       $scope.classb = '';
  //     } else {
  //       $scope.showMyList();
  //       $scope.getListOfArtist = [];
  //       $ionicScrollDelegate.scrollTop();
  //       $scope.classa = '';
  //       $scope.classb = "active";
  //     }
  //   };
  //   $scope.getUserDetail = $.jStorage.get('userProfile');
  //   console.log($scope.getUserDetail._id);

  //   // $sccope.getArtist = [{
  //   //   "name":"abc",
  //   //   "city":"mumbai",
  //   //   "image":"img/download.jpg"
  //   // },{
  //   //   "name":"xyz",
  //   //   "city":"pune",
  //   //   "image":"img/images.jpg"
  //   // },{
  //   //   "name":"jkl",
  //   //   "city":"paris",
  //   //   "image":"img/download.jpg"
  //   // }]
  //   var dataToSend = {
  //     artistName: $stateParams.search,
  //     artistCity: $stateParams.city,
  //     talent: $stateParams.talent,
  //     artistGenre: $stateParams.genre,
  //     budget: $stateParams.budget,
  //   };
  //   $scope.showArtistList = function () {
  //     MyServices.filterResult(dataToSend, function (data) {
  //       $scope.getArtist = data.data;
  //       console.log('$scope.getArtist', $scope.getArtist[0]);

  //     });
  //   }
  //   $scope.selectArtist = function () {
  //     // $scope.getUserDetail.shortList = [];
  //     // MyServices.signup($scope.getUserDetail, function (data) {
  //     //   $scope.getArtist = data.data;
  //     //   console.log('$scope.getArtist', $scope.getArtist[0]);

  //     // });
  //   }
  //   $scope.showArtistList();

  //   $scope.limit = 5;
  //   $scope.checked = 0;
  //   // ==========================================================================================shortList===================
  //   $scope.addToWishlist = function (id, flag) {
  //     if (flag == true) {
  //       $scope.checked++;
  //       console.log('funid', id);
  //       var input = {
  //         artist: id,
  //         timestamp: new Date()
  //       };
  //       $scope.getUserDetail.shortList.push(input);
  //       console.log('$scope.getUserDetail.shortList', $scope.getUserDetail.shortList);
  //     } else {
  //       $scope.checked--;

  //       function checkAdult(o) {
  //         return o.artist == id;
  //       }

  //       var index = $scope.getUserDetail.shortList.findIndex(checkAdult);
  //       if (index != -1) {
  //         $scope.getUserDetail.shortList.splice(index, 1);
  //         console.log('$scope.getUserDetail.shortList splice', $scope.getUserDetail.shortList);
  //       }
  //     }


  //     console.log(flag);


  //   };
  //   $scope.submitOnMyList = function () {
  //     // $scope.getListOfArtist = $scope.getUserDetail.shortList;
  //     $scope.getListOfArtist = [];
  //     _.each($scope.getUserDetail.shortList, function (n) {
  //       if (n.timestamp != undefined) {
  //         $scope.getListOfArtist.push(n);
  //       }
  //     })
  //     // console.log("############################ $scope.getUserDetail.shortList", $scope.getUserDetail.shortList[0].timestamp);
  //     $scope.getUserDetail.shortList = [];
  //     $scope.tab = "already";
  //     // MyServices.signup($scope.getUserDetail, function(data) {

  //     //   console.log('inside save');
  //     //   if (data.value === true) {
  //     //     $scope.checked=0;
  //     //     console.log($scope.checked);
  //     //     $scope.searchText = "";
  //     //     console.log(data);
  //     //     $scope.tabchange('already', 2);
  //     //     // $scope.getUserDetail.shortList = [];
  //     //     // $scope.mesg.push({
  //     //     //     type: 'success',
  //     //     //     msg: 'Added To Your Shortlist'
  //     //     // });
  //     //     // MyServices.getUser(function(logindata) {
  //     //     //     _.each($scope.expertdata, function(n) {
  //     //     //         n.showbtn = $filter('showbtn')(n._id, logindata);
  //     //     //
  //     //     //     })
  //     //     // })
  //     //   }
  //     //   // $scope.closeAlert = function(index) {
  //     //   //     $scope.mesg.splice(index, 1);
  //     //   // }
  //     // });
  //   }
  //   MyServices.getprofile($scope.getUserDetail._id, function (user) {
  //     $scope.userdata = user.data;
  //     // $scope.userdata.bgimage = $filter('uploadpath')($scope.userdata.bgimage);
  //     console.log($scope.userdata);
  //   });
  //   $scope.showMyList = function () {
  //     // MyServices.addedList($scope.getUserDetail._id, function (data) {
  //     //   $scope.getListOfArtist = data.data.shortList;
  //     //   console.log('$scope.getListOfArtist', $scope.getListOfArtist);

  //     // });
  //   }

  //   $scope.showMyList();
  //   $scope.removeWishlist = function (id) {
  //     MyServices.removeFromList(id, function (data) {
  //       $scope.showMyList();
  //     })
  //     $scope.showMyList();
  //   };
  //   $scope.showSendListAlert = function () {
  //     var alertPopup = $ionicPopup.alert({
  //       cssClass: 'text-center',
  //       buttons: [{
  //         text: 'Ok',
  //         type: 'button-assertive'
  //       }],
  //       template: 'Thank you for enquiry.You will get quotation shortly.'
  //     });

  //     alertPopup.then(function (res) {
  //       MyServices.emptyList($scope.getUserDetail._id, function (data) {
  //         console.log(data);
  //         // $scope.showMyList();
  //         $state.go('app.search-artist');
  //       })
  //     });
  //   };
  //   $scope.sendProfile = function () {
  //     if (!_.isEmpty($scope.getUserDetail.shortList)) {
  //       MyServices.sendProfileToBackend($scope.getUserDetail._id, function (data) {
  //         console.log(data);
  //         if (data.value == true) {

  //           $scope.showSendListAlert();
  //           $scope.getUserDetail.shortList = [];
  //         }
  //       })
  //     } else {
  //       var alertPopup = $ionicPopup.alert({
  //         cssClass: 'text-center',
  //         buttons: [{
  //           text: 'Ok',
  //           type: 'button-assertive'
  //         }],
  //         template: 'There is no artist added in your MyList.'
  //       });

  //       alertPopup.then(function (res) {

  //       });
  //     }

  //   }

  // })

  .controller('ArtistCtrl', function ($scope, $ionicScrollDelegate, $ionicPopup, $timeout, $ionicLoading, $stateParams, $state, MyServices, $filter, $ionicModal) {
    $scope.artistList = {}
    $scope.getListOfArtist = [];
    $scope.getArtist = [];
    $scope.otp = {}
    $scope.otpToSend = '';
    $scope.resend = true;
    $scope.getUserDetail = $.jStorage.get('userProfile'); //TO get user details
    var _id = $scope.getUserDetail._id
    $scope.otp._id = $scope.getUserDetail._id;
    $scope.artistList._id = _id
    $scope.artistList.shortList = []
    // $scope.artistList.shortList = $scope.getListOfArtist
console.log("hellocheck",$scope.getArtist)
    //Get data from state param to get artist list from backend;
    var dataToSend = {
      artistName: $stateParams.search,
      artistCity: $stateParams.city,
      talent: $stateParams.talent,
      artistGenre: $stateParams.genre,
      budget: $stateParams.budget,
    };

    //To get artist list from backend.
    $scope.showArtistList = function () {
      MyServices.filterResult(dataToSend, function (data) {
        $scope.getArtist = data.data;
        console.log('$scope.getArtist', $scope.getArtist);
       if ($scope.getArtist.length == 0){
         var alertPopup = $ionicPopup.alert({
          cssClass: 'text-center',
          buttons: [{
            text: 'Ok',
            type: 'button-assertive',
            onTap: function (e) {
                                $state.go("app.search-artist");
                            }
          }],
          template: 'Bummer! The artist you’re looking for has not been born yet! Try looking for another one!'
        });
       }else{
         console.log("artist available")
       }
      });
    };

    $scope.showArtistList();

    // $ionicModal.fromTemplateUrl('templates/modal/image.html', {
    //   scope: $scope,
    //   animation: 'slide-in-up'
    // }).then(function (modal) {
    //   $scope.modal = modal;
    // });
    $scope.searchText = "";

    $scope.openModal = function () {
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    $scope.tab = 'new';
    $scope.classa = 'active';
    $scope.classb = '';
    $scope.goBackHandler = function () {
      // console.log("hi");
      window.history.back(); //This works
    }

    //To handle tab switch
    $scope.tabchange = function (tab, a) {
      // console.log($scope.searchText);
      $scope.searchText = "";
      // console.log($scope.searchText);

      //        console.log(tab);
      $scope.tab = tab;
      if (a == 1) {
        $ionicScrollDelegate.scrollTop();
        $scope.getListOfArtist = [];
        $scope.showArtistList();
        $scope.classa = "active";
        $scope.classb = '';
      } else {
        $ionicScrollDelegate.scrollTop();
        $scope.getArtist = [];
        $scope.classa = '';
        $scope.classb = "active";
      }
    };

    //Set limit to select
    $scope.limit = 5;
    $scope.checked = 0;

    //List of selected artist
    $scope.addToWishlist = function (data, flag) {
      console.log("helloflag",flag)
      if (flag == true) {
        $scope.checked++;
        var artistObj = _.find($scope.getListOfArtist, function (o) {
          // console.log("check",$scope.getListOfArtist)
          if (data._id === o._id) {
            return o;
          }
        });
  
       
        
        if (artistObj === undefined) {
          $scope.getListOfArtist.push(data);
          
          console.log("check",$scope.getListOfArtist)
        }
      } else {
        $scope.checked--;
        var artistObj = _.find($scope.getListOfArtist, function (o) {
          if (data._id === o._id) {
            return o;
          }
        });
        _.pull($scope.getListOfArtist,artistObj );
        console.log("pullnotworking",$scope.getListOfArtist)
       
       
      }
    
    };

    $ionicModal.fromTemplateUrl('templates/modal/generateOtp.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.modal.show();
      _.each($scope.getListOfArtist,function(val){
        console.log("helloids",val)
        $scope.artistList.shortList.push({
          artist:val._id
        })
        console.log("artistid",$scope.artistList)
      })
      MyServices.Otp($scope.otp, function (data){
        console.log("otpplease",data)
      });
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
  
    $scope.submitOtp=function(){
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      console.log("almostder",$scope.artistList)
  MyServices.submitOtp($scope.artistList, function (data){
   
  console.log("submitOtp",data)
  if(data.value == true){
    $ionicLoading.hide()
    var alertPopup = $ionicPopup.alert({
      cssClass: 'text-center',
      buttons: [{
        text: 'Ok',
        type: 'button-assertive',
        onTap: function (e) {
                            $scope.closeModal()
                            $state.go('app.search-artist')
                        }
      }],
      template: 'Thank You!!!'
    });
  }else{
    $ionicLoading.hide()
    var alertPopup = $ionicPopup.alert({
      cssClass: 'text-center',
      buttons: [{
        text: 'Ok',
        type: 'button-assertive',
        onTap: function (e) {
                           
                        }
      }],
      template: 'Incorrect Otp!!!'
    });
  }
  })
    }
  
    $scope.resendOtp=function(){
      $scope.resend = false;
      MyServices.Otp($scope.otp, function (data){
        console.log("otpplease",data)
        $timeout(function () {
          $scope.resend = true;
        }, 10000);
      });
    }

    //to go to my list tab
    $scope.submitOnMyList = function () {
      // console.log("$scope.getListOfArtist", $scope.getListOfArtist);
      $ionicScrollDelegate.scrollTop();
      $scope.tab = "already";
      $scope.classa = '';
      $scope.classb = "active";
    };

    //To remove article from list
    $scope.removeWishlist = function (value) {
      var artistObj = _.find($scope.getListOfArtist, function (o) {
        if (value === o._id) {
          return o;
        }
      });
      if (artistObj !== undefined) {
        _.pull($scope.getListOfArtist, artistObj);
        // console.log("check",$scope.getListOfArtist)
      }
    };

    

    //To send profile to backend
    $scope.sendProfile = function () {
      if (!_.isEmpty($scope.getListOfArtist)) {
        console.log("findid",$scope.getUserDetail._id)
   MyServices.addToList($scope.artistList, function(data){
     console.log("heyyssp",$scope.artistList);
        })     
        MyServices.sendProfileToBackend($scope.getUserDetail._id, function (data) {
           console.log(data);
          if (data.value == true) {

            $scope.showSendListAlert();
            $scope.getListOfArtist = [];
            // console.log("check",$scope.getListOfArtist)
          }
        })
      } else {
        var alertPopup = $ionicPopup.alert({
          cssClass: 'text-center',
          buttons: [{
            text: 'Ok',
            type: 'button-assertive'
          }],
          template: 'There is no artist added in your MyList.'
        });

        alertPopup.then(function (res) {

        });
      }

    };

    //after Successfull submit
    $scope.showSendListAlert = function () {
      var alertPopup = $ionicPopup.alert({
        cssClass: 'text-center',
        buttons: [{
          text: 'Ok',
          type: 'button-assertive'
        }],
        template: 'Thank you for enquiry.You will get quotation shortly.'
      });

      alertPopup.then(function (res) {
        MyServices.emptyList($scope.getUserDetail._id, function (data) {
          // console.log(data);
          // $scope.showMyList();
          $state.go('app.search-artist');
        })
      });
    };

    var init = function () {
      return $ionicModal.fromTemplateUrl('templates/modal/video.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;

      });
    };

    $scope.video = {};
    
    $scope.showVideo = function (url) {
      
      init().then(function () {
        $scope.modal.show();
      });
      $scope.url=url;
      if(url)
      var link = url.split("=");
      console.log('hellourl',link);
      if (link) {
        $scope.video.url = link[1] + "?autoplay=1&controls=0&showinfo=0";
      }else{
        console.log(url);
        $scope.video.url = url + "?autoplay=1&controls=0&showinfo=0";
      }
    };

    $scope.closeVideo = function () {
      var alertPopup = $ionicPopup.alert({
        cssClass: 'text-center',
        buttons: [{
          text: 'YES',
          type: 'button-assertive',
          onTap: function (e) {
            $scope.modal.remove()
            .then(function () {
              $scope.modal = null;
            });
                          }
        },{
          text: 'No',
          type: 'button-assertive',
          onTap: function (e) {
                          }
        }],
        template: 'Are you sure you want to exit?'
      });
    };

  })


  .controller('OtpCtrl', function ($scope, $state, $ionicScrollDelegate, $ionicPopup, MyServices) {

    var userData = $.jStorage.get('userProfileOTP');
    //To submit OTP to backend for verification
    $scope.submitOTP = function (value) {
      var dataObj = {
        otp: value.otp,
        mobile: userData.mobile,
        _id: userData._id
      }
      MyServices.verifyOTP(dataObj, function (data) {
        if (data.data) {
          if (_.isEmpty(data.data)) {
            var alertPopup = $ionicPopup.alert({
              cssClass: 'text-center',
              buttons: [{
                text: 'Ok',
                type: 'button-assertive'
              }],
              template: 'OTP validation failed'
            });
            $.jStorage.flush('userProfileOTP');
            $state.go('login');
          } else {
            $.jStorage.flush('userProfileOTP');
            $.jStorage.set('userProfile', data.data);
            $scope.myuserId = data.data._id;
            var alertPopup = $ionicPopup.alert({
              cssClass: 'text-center',
              buttons: [{
                text: 'Ok',
                type: 'button-assertive'
              }],
              template: 'Please Wait for the Confirmation'
            });

            alertPopup.then(function (res) {
              $state.go('login');
            });
          }
        } else {
          $.jStorage.flush('userProfileOTP');
          var alertPopup = $ionicPopup.alert({
            cssClass: 'text-center',
            buttons: [{
              text: 'Ok',
              type: 'button-assertive'
            }],
            template: 'OTP validation failed'
          });
          $state.go('login');
        }
      });
    };

    //To resend OTP
    $scope.resendOtp = function () {

      var dataObj = {
        _id: userData._id
      }
      MyServices.resendOTP(dataObj, function (data) {
        if (data.data) {
          console.log("OTP resent");
        } else {
          var alertPopup = $ionicPopup.alert({
            cssClass: 'text-center',
            buttons: [{
              text: 'Ok',
              type: 'button-assertive'
            }],
            template: 'Unable to send OTP'
          });
        }
      });
    }
  })


  .controller('TabsCtrl', function ($scope, $state, $ionicScrollDelegate, $ionicPopup, MyServices) {

    //Variable declaration
    $scope.tab = 1; //Default tab will be news tab
  })

  .controller('MylistCtrl', function ($scope, $state, $ionicModal, $ionicPopup, $ionicLoading, MyServices, $timeout,$stateParams) {
    $scope.artistList = {}
    $scope.otprequest = {}
    $scope.artistList = {}
    $scope.otp={}
    $scope.resend = true;
    $scope.artistList.shortList = []
    $scope.getUserDetail = $.jStorage.get('userProfile'); 
    var _id = $scope.getUserDetail._id
    $scope.otp._id = $scope.getUserDetail._id;
    // $scope.otp._id = $scope.getUserDetail._id;
     $scope.artistList._id = _id
   
     var init = function () {
      return $ionicModal.fromTemplateUrl('templates/modal/video.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
  
      });
    };
  

     $scope.video = {};
     $scope.showVideo = function (url) {
       init().then(function () {
         $scope.modal.show();
       });
       $scope.url=url;
       if(url)
       var link = url.split("=");
       if (link) {
         $scope.video.url = link[1] + "?autoplay=1";
       }else{
         console.log(url);
         $scope.video.url = url + "?autoplay=1";
       }
     };
   
     $scope.closeVideo = function () {
       $scope.modal.remove()
         .then(function () {
           $scope.modal = null;
         });
     };
   

    console.log("hellostorage", $scope.getUserDetail)
    $scope.getArtistList = []
    $scope
     $scope.otprequest._id = $scope.getUserDetail._id
    $scope.getArtistList = $scope.getUserDetail.getListOfArtist
    console.log("getartist", $scope.getArtistList)
    $scope.removeWishlist = function (value) {
      console.log("valuemyboy", value)
            var artistObj = _.find($scope.getArtistList, function (o) {
              if (value === o._id) {
                return o;
              }
            });
         
              _.pull($scope.getArtistList, artistObj);
              // console.log("check",$scope.getListOfArtist)
           
          };
    $scope.goBackHandler = function () {
      // console.log("hi");
      window.history.back(); //This works
    }
    $ionicModal.fromTemplateUrl('templates/modal/generateOtp.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.modal.show();
      _.each($scope.getArtistList,function(val){
        console.log("helloids",val)
        $scope.artistList.shortList.push({
          artist:val._id
        })
        console.log("artistid",$scope.artistList)
      })
      MyServices.Otp($scope.otprequest, function (data){
        console.log("otpplease",data)
      });
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
  
    $scope.submitOtp=function(){
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      console.log("almostder",$scope.artistList)
  MyServices.submitOtp($scope.artistList, function (data){
   
  console.log("submitOtp",data)
  if(data.value==true){
    $ionicLoading.hide()
    // $scope.getListOfArtist = []
    $scope.getUserDetail.getListOfArtist = []
    $.jStorage.set('userProfile', $scope.getUserDetail);
    // $.jStorage.userProfile..flush();
    var alertPopup = $ionicPopup.alert({
      cssClass: 'text-center',
      buttons: [{
        text: 'Ok',
        type: 'button-assertive',
        onTap: function (e) {
                           $state.go('app.search-artist')
                            $scope.modal.hide();
                        }
      }],
      template: 'Thank You!!!'
    });
  }else{
    $ionicLoading.hide()
    var alertPopup = $ionicPopup.alert({
      cssClass: 'text-center',
      buttons: [{
        text: 'Ok',
        type: 'button-assertive',
        onTap: function (e) {

                        }
      }],
      template: 'Incorrect Otp!!!'
    });
  }
  })
    }
  
    $scope.resendOtp=function(){
      $scope.resend = false;
      MyServices.Otp($scope.otp, function (data){
        console.log("otpplease",data)
        $timeout(function () {
          $scope.resend = true;
        }, 10000);
      });
    }
  
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {});
