angular.module('Lozone')
.controller('ProfileCtrl', function($state, auth, profile, md5, Users){
  var profileCtrl = this;
  profileCtrl.profile = profile;
  profileCtrl.getGravatar = Users.getGravatar;
  profileCtrl.updateProfile = function(){
    profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
    profileCtrl.profile.$save();
  }
})
