// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
// var firstapp = angular.module('firstapp', [
//  'ui.router',
//  'phonecatControllers',
//  'starter.controllers',
//  'starter.services',
//  'templateservicemod',
//  'navigationservice',
//  'pascalprecht.translate',
//  'angulartics',
//  'angulartics.google.analytics'
// ]);

angular.module('starter', ['ionic', 'starter.controllers','starter.services','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })
  .state('app.change-password', {
    url: '/change-password/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/change-password.html',
          controller: 'ChangePasswordCtrl'
      }
    }
  })
  .state('app.artist', {
    url: '/artist/:search/:city/:talent/:genre/:budget',
    views: {
      'menuContent': {
        templateUrl: 'templates/artist.html',
          controller: 'ArtishCtrl'
      }
    }
  })

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'

    })
  .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignupCtrl'

    })
    .state('app.profile', {
      url: '/profile/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })
    .state('app.search-artist', {
      url: '/search-artist',
      views: {
        'menuContent': {
          templateUrl: 'templates/search-artist.html',
          controller: 'SearchArtistCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
})
.filter('uploadpath', function() {
    return function(input, width, height, style) {
        var other = "";
        if (width && width != "") {
            other += "&width=" + width;
        }
        if (height && height != "") {
            other += "&height=" + height;
        }
        if (style && style != "") {
            other += "&style=" + style;
        }
        if (input) {
            if (input.indexOf('https://') == -1) {
                return imgpath + "?file=" + input + other;
            } else {
                return input;
            }
        }
    };
});
