// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('urlConstant', []).constant('apiUrl', 'http://localhost:3000/')
// angular.module('urlConstant', []).constant('apiUrl', 'http://hikehk.herokuapp.com/')

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'uiGmapgoogle-maps', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDdU1XR6o-UhRaC6US1bkFwNvchLByInPA',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
  })

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })


  // Each tab has its own nav history stack:

  // .state('tab.dash', {
  //   url: '/dash',
  //   views: {
  //     'tab-dash': {
  //       templateUrl: 'templates/tab-dash.html',
  //       controller: 'DashCtrl'
  //     }
  //   }
  // })

  .state('tab.map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('tab.filter', {
    url: '/filter',
    views: {
      'tab-filter': {
        templateUrl: 'templates/tab-filter.html',
        controller: 'FilterCtrl'
      }
    }
  })
  .state('tab.info', {
    url: '/info/:id',
    views: {
      'tab-filter': {
        templateUrl: 'templates/info.html',
        controller: 'InfoCtrl'
      }
    }
  })
  .state('tab.flora', {
    url: '/info/:id/flora',
    views: {
      'tab-filter': {
        templateUrl: 'templates/flora.html',
        controller: 'FloraCtrl'
      }
    }
  })
  .state('tab.fauna', {
    url: '/info/:id/fauna',
    views: {
      'tab-filter': {
        templateUrl: 'templates/fauna.html',
        controller: 'FaunaCtrl'
      }
    }
  })

  // .state('tab.chats', {
  //     url: '/chats',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/tab-chats.html',
  //         controller: 'ChatsCtrl'
  //       }
  //     }
  //   })
  //   .state('tab.chat-detail', {
  //     url: '/chats/:chatId',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/chat-detail.html',
  //         controller: 'ChatDetailCtrl'
  //       }
  //     }
  //   })

  // .state('tab.friends', {
  //     url: '/friends',
  //     views: {
  //       'tab-friends': {
  //         templateUrl: 'templates/tab-friends.html',
  //         controller: 'FriendsCtrl'
  //       }
  //     }
  //   })
  //   .state('tab.friend-detail', {
  //     url: '/friend/:friendId',
  //     views: {
  //       'tab-friends': {
  //         templateUrl: 'templates/friend-detail.html',
  //         controller: 'FriendDetailCtrl'
  //       }
  //     }
  //   })

  // .state('tab.account', {
  //   url: '/account',
  //   views: {
  //     'tab-account': {
  //       templateUrl: 'templates/tab-account.html',
  //       controller: 'AccountCtrl'
  //     }
  //   }
  // });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/map');

});
