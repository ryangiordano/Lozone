'use strict';

/**
 * @ngdoc overview
 * @name Lozone
 * @description
 * # Lozone
 *
 * Main module of the application.
 */
angular.module('Lozone', ['firebase','ui.bootstrap', 'angular-md5', 'ui.router','vesparny.fancyModal','colorpicker.module','ngFileUpload','ngAnimate'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'auth/register.html',
        controller: 'AuthCtrl as authCtrl',
        resolve: {
          requireNoAuth: function($state, Auth) {
            return Auth.$requireSignIn().then(function(auth) {
              $state.go('login');
            }, function(error) {
              return;
            });
          }
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'auth/login.html',
        controller: 'AuthCtrl as authCtrl',
        resolve: {
          requireNoAuth: function($state, Auth) {
            return Auth.$requireSignIn().then(function(auth) {
              $state.go('closets');
            }, function(error) {
              return;
            });
          }
        }
      })
      .state('lz',{
        url:'/lz',
        templateUrl:'home/home.html',
        controller: 'profileController as profileCtrl',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireSignIn().catch(function(){
              $state.go('login');
            });
          },
          closets: function(Closets, Auth) {
            return Auth.$requireSignIn().then(function(auth){
              return Closets.userClosets(auth.uid).$loaded();
              });
          },
          clothes: function(Clothes, Auth){
            return Auth.$requireSignIn().then(function(auth){
              return Clothes.userClothes(auth.uid).$loaded();
            });
          },
          profile: function($state, Auth, Users) {
            return Auth.$requireSignIn().then(function(auth) {
              return Users.getProfile(auth.uid).$loaded().then(function(profile) {
                if (profile.displayName) {
                  return profile;
                } else {
                  $state.go('home');
                }
              });
            }, function(error) {
              $state.go('login');
            });
          }
        }
      })
      .state('closets', {
        parent:'lz',
        url: '/closets',
        templateUrl: 'home/closets.html',
        controller: 'closetController as closetCtrl',
        resolve: {
          auth: function($state, Users, Auth){
            return Auth.$requireSignIn().catch(function(){
              $state.go('login');
            });
          },
          closets: function(Closets, Auth) {
            return Auth.$requireSignIn().then(function(auth){
              return Closets.userClosets(auth.uid).$loaded();
              });
          },
          clothes: function(Clothes, Auth){
            return Auth.$requireSignIn().then(function(auth){
              return Clothes.userClothes(auth.uid).$loaded();
            });
          },
          profile: function($state, Auth, Users) {
            return Auth.$requireSignIn().then(function(auth) {
              return Users.getProfile(auth.uid).$loaded().then(function(profile) {
                if (profile.displayName) {
                  return profile;
                } else {
                  $state.go('profile');
                }
              });
            }, function(error) {
              $state.go('login');
            });
          }
        }
      })
      .state('metacloset',{
        parent:'lz',
        url: '/metacloset',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireSignIn().catch(function() {
              $state.go('login');
            });
          },
          closets: function(Closets, Auth){
            return Auth.$requireSignIn().then(function(auth){
              return Closets.userClosets(auth.uid).$loaded();
            });
          },
          clothes: function(Clothes, Auth){
            return Auth.$requireSignIn().then(function(auth){
              return Clothes.userClothes(auth.uid).$loaded();
            })
          },
          profile: function(Users, Auth) {
            return Auth.$requireSignIn().then(function(auth) {
              return Users.getProfile(auth.uid).$loaded();
            })
          }
        },
        templateUrl:'metacloset/metacloset.html',
        controller: 'MetaClosetController as metaClosetCtrl'
      })
      .state('wishlist',{
        parent:'lz',
        url:'/wishlist',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireSignIn().catch(function() {
              $state.go('login');
            });
          },
          profile: function(Users, Auth) {
            return Auth.$requireSignIn().then(function(auth) {
              return Users.getProfile(auth.uid).$loaded();
            })
          }
        },
        templateUrl: 'wishlist/wishlist.html',
        controller: 'wishListController as wishListCtrl'
      })
      .state('closet-explore',{
        parent:'lz',
        url:'/closet/{closetId}',
        templateUrl: 'home/closet-explore.html',
        controller: 'clothesController as clothesCtrl',
        resolve:{
          auth: function($state, Users, Auth){
            return Auth.$requireSignIn().catch(function(){
              $state.go('login');
            });
          },
          profile: function(Users, Auth){
            return Auth.$requireSignIn().then(function(auth){
              return Users.getProfile(auth.uid).$loaded();
            });
          },
          closets: function(Closets, Auth){
            return Auth.$requireSignIn().then(function(auth){
              return Closets.userClosets(auth.uid).$loaded();
            });
          },
          clothes: function($stateParams, Closets, Auth, Clothes){
            return Auth.$requireSignIn().then(function(auth){
              return Clothes.userClothes(auth.uid);
            })
          },
          uploader: function(Auth,UploadPicture){
            return Auth.$requireSignIn().then(function(auth){
              return UploadPicture.userPictures(auth.uid);
            })
          }
        }
      })
      .state('clothes-info',{
        parent:'lz',
          url:'/clothes-info/{clothesId}',
          controller:'clothesController as clothesCtrl',
          templateUrl:'clothes/clothes-info.html',
          resolve:{
            auth: function($state, Users, Auth){
              return Auth.$requireSignIn().catch(function(){
                $state.go('login');
              });
            },
            profile: function(Users, Auth){
              return Auth.$requireSignIn().then(function(auth){
                return Users.getProfile(auth.uid).$loaded();
              });
            },
            clothes: function($stateParams, Closets, Auth, Clothes){
              return Auth.$requireSignIn().then(function(auth){
                return Clothes.userClothes(auth.uid);
              });
            },
            closets: function(Closets, Auth){
              return Auth.$requireSignIn().then(function(auth){
                return Closets.userClosets(auth.uid).$loaded();
              });
            },
            uploader: function(Auth,UploadPicture){
              return Auth.$requireSignIn().then(function(auth){
                return UploadPicture.userPictures(auth.uid);
              })
            }
          },
          redirectTo: 'general'
      })
      .state('general',{
        parent: 'clothes-info',
        url:'/general',
        templateUrl:'clothes/general.html'
      })
      .state('photos',{
        parent:'clothes-info',
        url:'/photos',
        templateUrl:'clothes/photos.html'
      })
      .state('social',{
        parent:'clothes-info',
        url:'/social',
        templateUrl:'clothes/social.html'
      })
      .state('closet-manage',{
        parent:'clothes-info',
        url:'/closet-manage',
        templateUrl:'clothes/closet-manage.html'

      });

    $urlRouterProvider.otherwise('/login');
  })
  .constant('FirebaseUrl', 'https://lozone-2dc89.firebaseio.com')
  .run(['$rootScope','$state', function($rootScope,$state){
    //adds a 'redirectTo' property to state that redirects to the value supplied
    $rootScope.$on('$stateChangeStart',function(evt,to,params){
      if(to.redirectTo){
        evt.preventDefault();
        $state.go(to.redirectTo, params,{location:'replace'})
      }
    });
  }]);
