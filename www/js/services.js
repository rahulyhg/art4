// var adminurl = "http://192.168.100.108/api/";
// var adminurl = "http://192.168.0.114/api/";
var adminurl = "http://192.168.0.113/api/";
var imgurl = adminurl + "upload/";
var imgpath = imgurl + "readFile";
var uploadurl = imgurl;
// var adminurl = "http://localhost:80/api/";
// var adminurl = adminbase + "/index.php/json/";
// var imgpath = adminbase + "/uploads/";


var foods = [];

angular.module('starter.services', [])
  .factory('MyServices', function($http) {
    return {
      all: function() {
        return chats;
      },
      remove: function(chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function(chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      },
      signup: function(signup, callback) {
        return $http({
          url: adminurl + 'AppUser/save',
          method: "POST",
          data: signup
        }).success(callback);
      },
      getChangePassword: function(input, callback) {
        return $http({
          url: adminurl + 'AppUser/changePassword',
          method: "POST",
          data: input
        }).success(callback);
      },
      login: function(input, callback) {
        return $http({
          url: adminurl + 'AppUser/login',
          method: "POST",
          data: input
        }).success(callback);
      },
      forgotPassword: function(input, callback) {
        return $http({
          url: adminurl + 'AppUser/forgotPassword',
          method: "POST",
          data: input
        }).success(callback);
      },
      getUserDetails: function(callback) {
        return $http({
          url: adminurl + 'AppUser/getUserDetails',
          method: "POST",
        }).success(callback);
      },
      filterResult: function(input, callback) {
        return $http({
          url: adminurl + 'AppUser/filterResult',
          method: "POST",
          data: input
        }).success(callback);
      },
      getprofile: function(id, callback) {
        return $http({
          url: adminurl + 'AppUser/getOne',
          method: "POST",
          data: {
            _id: id
          }
        }).success(callback);
      },

    };
  });
