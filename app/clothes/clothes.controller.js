angular.module('Lozone')
.controller('clothesController', function($state, Auth, Users, profile, $scope, $fancyModal, clothes, closet){
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


  clothesCtrl.clothes = clothes;
  clothesCtrl.closet = closet;
  $scope.currentClosetId = closet.$id;
  $scope.navHeader = clothesCtrl.closet.name;

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
