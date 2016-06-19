angular.module('Lozone')
.factory('Auth', function($firebaseAuth, FirebaseUrl){
  var ref = new Firebase(FirebaseUrl);
  var auth = $firebaseAuth();
  return auth;
});
