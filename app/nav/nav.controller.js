angular.module('Lozone')
.controller('navController', function($state,Auth, Users,$scope){
  var navCtrl = this;


    $scope.status = {
      isopen: false
    };


    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };

    $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
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
