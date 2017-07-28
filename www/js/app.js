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

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
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

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        cache: false,
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

   
      // .state('app.email', {
      //   url: '/email',
      //   views: {
      //     'menuContent': {
      //       templateUrl: 'templates/email.html'
      //     }
      //   }
      // })
      // .state('app.exchange-final', {
      //   url: '/exchange-final',
      //   views: {
      //     'menuContent': {
      //       templateUrl: 'templates/exchange-final.html'
      //     }
      //   }
      // })
      .state('app.change-password', {
        cache: false,
        url: '/change-password/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/change-password.html',
            controller: 'ChangePasswordCtrl'
          }
        }
      })
      .state('app.artist', {
        cache: false,
        url: '/:artist/:search/:city/:talent/:genre/:budget',
        views: {
          'menuContent': {
            templateUrl: 'templates/artist.html',
            controller: 'ArtistCtrl'
          }
        }
      })

      .state('login', {
        cache: false,
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'

      })

      .state('otp', {
        cache: false,
        url: '/otp',
        templateUrl: 'templates/otp.html',
        controller: 'OtpCtrl'
      })
      .state('app.profile', {
        cache: false,
        url: '/profile',
        views: {
          'menuContent': {
            templateUrl: 'templates/profile.html',
            controller: 'ProfileCtrl'
          }
        }
      })
      .state('app.search-artist', {
        cache: false,
        url: '/search-artist',
        views: {
          'menuContent': {
            templateUrl: 'templates/search-artist.html',
            controller: 'SearchArtistCtrl'
          }
        }
      })
       .state('tabs', {
        cache: false,
        url: '/tabs',
        templateUrl: 'templates/tabs.html',
        controller: 'TabsCtrl'
      })

    // .state('app.single', {
    //   url: '/playlists/:playlistId',
    //   views: {
    //     'menuContent': {
    //       templateUrl: 'templates/playlist.html',
    //       controller: 'PlaylistCtrl'
    //     }
    //   }
    // });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
    // $urlRouterProvider.otherwise('/tabs');
  })
  .filter('uploadpath', function () {
    return function (input, width, height, style) {
      // console.log('input', input);
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
