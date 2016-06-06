angular.module('Lozone')
.controller('ClosetCtrl',function($state, Auth, Users, profile, closets,$scope){
  var closetCtrl =this;
  $scope.profile = profile;
  $scope.getGravatar = Users.getGravatar;
  closetCtrl.closets = closets;
  $scope.navHeader = profile.displayName +"'s Closets";
  closetCtrl.getDisplayName = Users.getDisplayName;

})
