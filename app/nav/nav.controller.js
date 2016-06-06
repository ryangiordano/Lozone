angular.module('Lozone')
.controller('navController', function($state,Auth, Users){
  var navCtrl = this;

  navCtrl.logout = function(){
    Auth.$unauth();
    $state.go('login');
  }
})


.directive('navbar', function(){
  return{
    restrict:'E',
    templateUrl: 'nav/nav.html',
    controller: 'navController as navCtrl'
  }
})
