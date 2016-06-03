angular.module('Lozone')
.factory('Closets', function($firebaseArray, FirebaseUrl){
  var ref = new Firebase(FirebaseUrl + "closets");
  var closets = $firebaseArray(ref);

  return closets;
});
