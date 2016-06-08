angular.module('Lozone')
.controller('clothesController', function($state, Auth, Users, profile, $scope, $fancyModal, clothes, closet){
  var clothesCtrl = this;
  clothesCtrl.clothes = clothes;
  clothesCtrl.closet = closet;
  console.log(clothesCtrl.clothes+'wizeckshy');
  $scope.profile = profile;
  $scope.getGravatar = Users.getGravatar;
  $scope.navHeader = clothesCtrl.closet.name;
});
