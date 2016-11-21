var adminurl = "http://192.168.0.114/api/";
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
      login: function(input, callback) {
        return $http({
          url: adminurl + 'AppUser/login',
          method: "POST",
          data: input
        }).success(callback);
      },
      getprofile: function(id, callback) {
        return $http({
          url: adminurl + 'AppUser/save',
          method: "POST",
          data: {
            id: id
          }
        }).success(callback);
      },

    };
  });
