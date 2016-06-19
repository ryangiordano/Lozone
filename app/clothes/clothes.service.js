angular.module('Lozone')
.factory('Clothes', function($firebaseArray, FirebaseUrl){
    var clothesRef = firebase.database().ref("clothes");
  return {
    userClothes : function(userId){
      return $firebaseArray(clothesRef.child(userId));
    }
  }
});
