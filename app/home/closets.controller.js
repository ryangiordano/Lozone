angular.module('Lozone')
.controller('closetController',function($state, Auth, Users, profile, closets,$scope,$fancyModal){
  var closetCtrl =this;
  $scope.profile = profile;
  $scope.getGravatar = Users.getGravatar;
  closetCtrl.closets = closets;
  $scope.navHeader = profile.displayName +"'s Closets";
  closetCtrl.getDisplayName = Users.getDisplayName;
  closetCtrl.newCloset = {
    name:'',
    favorite:false
  };
  closetCtrl.openCreate = function(){
    console.log('modal opened');
    $fancyModal.open({
      templateUrl:'home/create.html',
      controller:'closetController as closetCtrl',
      resolve: {
        closets: function(Closets) {
          return Closets.$loaded();
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
    console.log('closetCreated');
    closetCtrl.closets.$add(closetCtrl.newCloset).then(function(){
      $fancyModal.close();
      $state.go('closets');
      closetCtrl.newCloset = {
        name:'',
        favorite: false
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
