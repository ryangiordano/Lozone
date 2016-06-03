'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular.module('Lozone', ['firebase', 'angular-md5', 'ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('closets', {
        url: '/closets',
        templateUrl: 'home/closets.html',
        controller: 'ClosetCtrl as closetCtrl',
        resolve:{
          closets: function(Closets){
            return Closets.$loaded();
          },
          profile: function($state, Auth, Users){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded().then(function(profile){
                if(profile.displayName){
                  return profile;
                }else{
                  $state.go('profile');
                }
              });
            }, function(error){
              $state.go('login');
            });
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'auth/login.html',
        controller: 'AuthCtrl as authCtrl',
        resolve:{
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('closets');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/register.html',
        controller: 'AuthCtrl as authCtrl',
        resolve:{
          requireNoAuth: function($state, Auth){
            return Auth.$requireAuth().then(function(auth){
              $state.go('login');
            }, function(error){
              return;
            });
          }
        }
      })
      .state('profile', {
        url: '/profile',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireAuth().catch(function(){
              $state.go('login');
            });
          },
          profile: function(Users, Auth){
            return Auth.$requireAuth().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            })
          }
        },
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html'
      });

    $urlRouterProvider.otherwise('/login');
  })
  .constant('FirebaseUrl', 'https://lozone.firebaseio.com/');
