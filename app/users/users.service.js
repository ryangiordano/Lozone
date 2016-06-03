angular.module('Lozone')
.factory('Users', function($firebaseArray, $firebaseObject, FirebaseUrl){

  var usersRef = new Firebase(FirebaseUrl + "users");
  var users = $firebaseArray(usersRef);
  var Users = {
    getProfile: function(uid){
      return $firebaseObject(usersRef.child(uid));
    },
    getDisplayName: function(uid){
      return $firebaseObject(usersRef.child(uid));
    },
    getGravatar: function(uid){
      return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
    },
    all: users
  };
  return Users;
})
