angular.module('Lozone')
.factory('UploadPicture', function($firebaseArray,$firebaseObject){
  var storage = firebase.storage();
  var storageRef = storage.ref();
//get pictures


//create unique path to your own pictures

  return {
    userPictures : function(userId){
      return storageRef.child(userId);
    }

  }
});
