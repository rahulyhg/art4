// var adminurl = "http://192.168.100.108/api/";
// var adminurl = "http://192.168.100.104/api/";
// var adminurl = "http://192.168.0.114/api/";
// var adminurl = "http://192.168.0.110/api/";
var adminurl = "http://exchange.wohlig.co.in/api/";
// var adminurl = "http://localhost:80/api/";
var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile";
var uploadurl = imgurl;
// var adminurl = adminbase + "/index.php/json/";
// var imgpath = adminbase + "/uploads/";


var foods = [];

angular.module('starter.services', [])
  .factory('MyServices', function ($http) {
    return {
      all: function () {
        return chats;
      },
      remove: function (chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function (chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      },
      signup: function (signup, callback) {
        return $http({
          // url: adminurl + 'AppUser/save', 
          url: adminurl + 'AppUser/UserSignUp',
          method: "POST",
          data: signup
        }).success(callback);
      },
      updateProfile: function (signup, callback) {
        return $http({
          url: adminurl + 'AppUser/save',
          method: "POST",
          data: signup
        }).success(callback);
      },
      getChangePassword: function (input, callback) {
        return $http({
          url: adminurl + 'AppUser/changePassword',
          method: "POST",
          data: input
        }).success(callback);
      },
      login: function (input, callback) {
        return $http({
          url: adminurl + 'AppUser/login',
          method: "POST",
          data: input
        }).success(callback);
      },
      forgotPassword: function (input, callback) {
        return $http({
          url: adminurl + 'AppUser/forgotPassword',
          method: "POST",
          data: input
        }).success(callback);
      },
      getUserDetails: function (callback) {
        return $http({
          url: adminurl + 'AppUser/getUserDetails',
          method: "POST",
        }).success(callback);
      },
      filterResult: function (input, callback) {
        return $http({
          url: adminurl + 'AppUser/filterResult',
          method: "POST",
          data: input
        }).success(callback);
      },
      getprofile: function (id, callback) {
        return $http({
          url: adminurl + 'AppUser/getOne',
          method: "POST",
          data: {
            _id: id
          }
        }).success(callback);
      },
      removeFromList: function (id, callback) {
        return $http({
          url: adminurl + 'AppUser/removeFromList',
          method: "POST",
          data: {
            _id: id
          }
        }).success(callback);
      },
      emptyList: function (id, callback) {
        return $http({
          url: adminurl + 'AppUser/emptyList',
          method: "POST",
          data: {
            _id: id
          }
        }).success(callback);
      },
      sendProfileToBackend: function (id, callback) {
        return $http({
          url: adminurl + 'AppUser/sendProfile',
          method: "POST",
          data: {
            _id: id
          }
        }).success(callback);
      },
      addedList: function (id, callback) {
        return $http({
          url: adminurl + 'AppUser/getShortlist',
          method: "POST",
          data: {
            _id: id
          }
        }).success(callback);
      },

      //To verfiy OTP
      verifyOTP: function (data, callback) {
        return $http({
          url: adminurl + 'AppUser/verifyOTP',
          method: "POST",
          data: data
        }).success(callback);
      },

      //To resend OTP
      resendOTP: function (data, callback) {
        return $http({
          url: adminurl + 'AppUser/resendOTP',
          method: "POST",
          data: data
        }).success(callback);
      }

    };
  });
