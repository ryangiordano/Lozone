angular.module('Lozone')
.controller('MetaClosetController', function($scope, Auth, profile,Users, clothes, closets){
  var metaClosetCtrl = this;
  $scope.profile = profile;
  $scope.getGravatar = Users.getGravatar;
  $scope.navHeader = profile.displayName +"'s Metacloset";
  metaClosetCtrl.closets = closets;
  metaClosetCtrl.clothes = clothes;
  metaClosetCtrl.view = 'form';
  metaClosetCtrl.viewChange = function(){
    metaClosetCtrl.view = metaClosetCtrl.view == 'tile' ? 'form' : 'tile';
  }
  var i,length = metaClosetCtrl.closets.length;
  metaClosetCtrl.deleteClothes = function(clothing){
    if(confirm('Are you sure you want to delete this piece of clothing?')){
      metaClosetCtrl.clothes.$remove(clothing);
    }
  };
  metaClosetCtrl.addFavorite = function(clothing){
    clothing.favorite = !clothing.favorite;
    metaClosetCtrl.clothes.$save(clothing);
  }
  metaClosetCtrl.getClosetName = function(closetId, clothes){
    for(i=0;i<length;i++){
      if(metaClosetCtrl.closets[i].$id == clothes.closet){
        return metaClosetCtrl.closets[i].name;
      }
    }
    return 'uncloseted';
  }
});
