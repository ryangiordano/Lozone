angular.module('Lozone')
.controller('profileController', function($state, auth, profile, md5, Users, $scope,closets,clothes){
  var profileCtrl = this;
  $scope.profile = profile;
  $scope.getGravatar = Users.getGravatar;
  profileCtrl.clothes = clothes;
  profileCtrl.closets = closets;
  $scope.navHeader = profile.displayName +"'s Closet";
  profileCtrl.updateProfile = function(){
    $scope.profile.emailHash = md5.createHash(auth.email);
    $scope.profile.$save();
    $state.go('closets');
  }
})
