angular.module('Lozone')
.factory('Closets', function($firebaseArray, FirebaseUrl, $firebaseObject){
    var closetRef = firebase.database().ref("closets");
  // return{
  //   forCloset: function(closetId){
  //     return $firebaseArray(ref.child(closetId))
  //   }
  // }
  return {
    userClosets: function(userId){
      return $firebaseArray(closetRef.child(userId));
    },
    userExploreCloset: function(userId, closetId){
      return $firebaseObject(closetRef.child(userId).child(closetId));
    }
  };
});
