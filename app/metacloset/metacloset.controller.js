angular.module('Lozone')
.controller('MetaClosetController', function($scope, Auth, profile,Users, clothes, closets){
  var metaClosetCtrl = this;
  $scope.profile = profile;
  $scope.getGravatar = Users.getGravatar;
  $scope.navHeader = profile.displayName +"'s Metacloset";
  $scope.closets = closets;

  metaClosetCtrl.clothes = clothes;
});
