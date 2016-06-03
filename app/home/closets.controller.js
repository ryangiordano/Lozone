angular.module('Lozone')
.controller('ClosetCtrl',function($state, Auth, Users, profile, closets){
  var closetCtrl =this;
  closetCtrl.profile = profile;
  closetCtrl.closets = closets;
  closetCtrl.getGravatar = Users.getGravatar;
  closetCtrl.getDisplayName = Users.getDisplayName;
  closetCtrl.logout = function(){
    Auth.$unauth();
    $state.go('login');
  }
})
