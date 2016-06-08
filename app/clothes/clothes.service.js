angular.module('Lozone')
.factory('Clothes', function($firebaseArray, FirebaseUrl){
  var clothesRef = new Firebase(FirebaseUrl + "clothes");
  return {
    userClothes : function(userId){
      return $firebaseArray(clothesRef.child(userId));
    }
  }
});
