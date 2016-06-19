angular.module('Lozone')
.factory('Pictures', function($firebaseArray, $firebaseObject, FirebaseUrl){

  var storageRef = firebase.storage.ref();
  console.log(storageRef+"!");
  return{
    userPictures: function(userId){

      return storageRef;
    }
  }
})
