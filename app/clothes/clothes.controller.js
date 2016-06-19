angular.module('Lozone')
.controller('clothesController', function($state, Auth, Users, profile, $scope, $fancyModal, clothes,closets){
  var clothesCtrl = this;
  $scope.profile = profile;
  $scope.getGravatar = Users.getGravatar;
//array of temporary colors
clothesCtrl.types = [
  {
    name: 'shirt',
    img: 'img/shirt.svg',
  },
  {
    name: 'pants',
    img: 'img/pants.svg',
  },
  {
    name: 'skirt',
    img: 'img/skirt.svg',
  },
  {
    name: 'shoes',
    img: 'img/shoes.svg',
  },
  {
    name: 'dress',
    img: 'img/dress.svg',
  },
  {
    name: 'scarf',
    img: 'img/scarf.svg',
  },
  {
    name: 'accessory',
    img: 'img/rings.svg',
  },
  {
    name: 'socks',
    img: 'img/stockings.svg',
  }
]
var storageRef = firebase.storage().ref();
var imagesRef= storageRef.child('images');
var fileName = 'hat.jpg';
var spaceRef = imagesRef.child(fileName);
clothesCtrl.path = spaceRef.fullPath;
console.log(clothesCtrl.path);


  clothesCtrl.clothes = clothes;
  clothesCtrl.closets = closets;
//When a closet id is present in the url bar, the below function is run with that id as the parameter, returning the single closet.
  clothesCtrl.closetGetter = function(stateParams){
    var i,length = clothesCtrl.closets.length-1;
    for(i = 0; i<=length; i++){//search for the closet by parameter id
      if(clothesCtrl.closets[i].$id == stateParams){
        return clothesCtrl.closet = clothesCtrl.closets[i];
      }
    }
  }
  clothesCtrl.clothingGetter = function(stateParams){
    var i,x, clothesLength = clothesCtrl.clothes.length-1,closetLength = clothesCtrl.closets.length-1;
    for(i=0;i<=clothesLength;i++){//search for clothing by parameter id
      if(clothesCtrl.clothes[i].$id == stateParams){
        clothesCtrl.clothing = clothesCtrl.clothes[i];
      }
    }
    for(x=0;x<=closetLength;x++){//loop through closets, if closet isn't found, set to uncloseted
      if(clothesCtrl.closets[x].$id == clothesCtrl.clothing.closet){
        clothesCtrl.closetName = clothesCtrl.closets[x].name;
        clothesCtrl.closetId = clothesCtrl.closets[x].$id;//this is a shitty fix<<<<<<<<
      }
    }
    clothesCtrl.closetName = !clothesCtrl.closetName ? "Uncloseted" : clothesCtrl.closetName;
  }
  if($state.params.closetId){
    clothesCtrl.closetGetter($state.params.closetId);
    $scope.currentClosetId = clothesCtrl.closet.$id;
    $scope.navHeader = clothesCtrl.closet.name;
  }
  if($state.params.clothesId){
    clothesCtrl.clothingGetter($state.params.clothesId);
    $scope.navHeader = clothesCtrl.clothing.name;
  }


  clothesCtrl.clothingPiece = {
    name:'',
    picture: 'img/lozonehead.svg',
    type:'',
    favorite: false,
    colors:[],
    tags: '',
    closet: $scope.currentClosetId
  };

  clothesCtrl.addClothes = function(){
    clothesCtrl.clothingPiece.picture = clothesCtrl.clothingPiece.type.img;
    clothesCtrl.clothes.$add(clothesCtrl.clothingPiece).then(function(){
      clothesCtrl.clothingPiece = {
        name:'',
        picture: '',
        type:'',
        favorite: false,
        colors:[],
        tags: '',
        closet: ''
      }
    });
  };
  clothesCtrl.deleteClothes = function(clothing){
    if(confirm('Are you sure you want to delete this piece of clothing?')){
      clothesCtrl.clothes.$remove(clothing);
    }
  };
  clothesCtrl.addFavorite = function(clothing){
    clothing.favorite = !clothing.favorite;
    clothesCtrl.clothes.$save(clothing);
  }
});
