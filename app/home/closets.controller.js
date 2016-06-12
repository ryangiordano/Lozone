angular.module('Lozone')
.controller('closetController',function($state, Auth, Users, profile, closets,$scope,$fancyModal, clothes){
  var closetCtrl =this;
  $scope.profile = profile;
  $scope.getGravatar = Users.getGravatar;
  closetCtrl.clothes = clothes;
  closetCtrl.closets = closets;
  $scope.navHeader = profile.displayName +"'s Closets";


  closetCtrl.getDisplayName = Users.getDisplayName;
  closetCtrl.newCloset = {
    name:'',
    favorite:false,
    colors:[]
  };

  closetCtrl.clothesInsideCloset = function(closetId){
    var counter = 0, length = (closetCtrl.clothes.length-1),i, counterMessage, color1, color2, colors = [];
    for(i = 0; i <= length; i++){
      if(closetCtrl.clothes[i].closet == closetId){
        counter++;
        colors.push(closetCtrl.clothes[i].colors);
      }
    }
    if(counter == 0){
      counterMessage = "An Empty Closet";
    }else if(counter ==1){
      counterMessage = counter + ' piece';
    }else{
      counterMessage = counter + ' pieces';
    }
    var color_length = colors.length-1;
    if(color_length <=0){
      color1 = '#f7f7f7';
      color2= '#efefef';
    }else{
      color1 = "#F05A88";
      color2 = "#6FB8E6"
    }
    return [counterMessage, color1, color2];
    //return a string x pieces(s)
  }
  closetCtrl.openCreate = function(){
    $fancyModal.open({
      templateUrl:'home/create.html',
      controller:'closetController as closetCtrl',
      resolve: {
        closets: function(Closets, Auth) {
          return Auth.$requireAuth().then(function(auth){
            return Closets.userClosets(auth.uid).$loaded();
            });
        },
        clothes: function(Clothes, Auth){
          return Auth.$requireAuth().then(function(auth){
            return Clothes.userClothes(auth.uid).$loaded();
          });
        },
        profile: function($state, Auth, Users) {
          return Auth.$requireAuth().then(function(auth) {
            return Users.getProfile(auth.uid).$loaded().then(function(profile) {
              if (profile.displayName) {
                return profile;
              } else {
                $state.go('profile');
              }
            });
          }, function(error) {
            $state.go('login');
          });
        }
      }
    });
  }
  closetCtrl.createCloset = function(){
    closetCtrl.closets.$add(closetCtrl.newCloset).then(function(){
      if(closetCtrl.newCloset.name == ''){

      }$fancyModal.close();
      $state.go('closets');
      closetCtrl.newCloset = {
        name:'',
        favorite: false,
        colors:[]
      };
    });
  };
  closetCtrl.deleteCloset = function(closet){
    if(confirm('Are you sure you want to delete this closet?')){
      closetCtrl.closets.$remove(closet);
    };

  }
  closetCtrl.addFavorite = function(closet){
    closet.favorite = !closet.favorite;
    closetCtrl.closets.$save(closet);
  }
})
