angular.module('Lozone')
.controller('wishListController', function($scope, Auth, profile,Users){
  $scope.profile = profile;
  $scope.getGravatar = Users.getGravatar;
  $scope.navHeader = profile.displayName +"'s Wishlist";
});
