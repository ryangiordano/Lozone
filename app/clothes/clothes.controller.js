angular.module('Lozone')
.controller('clothesController', function($state, Auth, Users, profile, $scope, $fancyModal, clothes, closet){
  var clothesCtrl = this;
  $scope.profile = profile;
  $scope.getGravatar = Users.getGravatar;

  //show the add clothing box
  clothesCtrl.clothingCreate =true;
  clothesCtrl.showClothingAdder = function(){
    clothesCtrl.clothingCreate = ! clothesCtrl.clothingCreate;
  };

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
  clothesCtrl.colors = [
    {
      name: 'red',
      hex: '#e03d3d'
    },
    {
      name: 'blue',
      hex: '#4f50e4'
    },
    {
      name: 'yellow',
      hex: '#e4e74d'
    },
    {
      name: 'green',
      hex: '#66b123'
    },
    {
      name: 'orange',
      hex: '#db952c'
    },
    {
      name: 'purple',
      hex: '#a151d2'
    },
    {
      name: 'white',
      hex: '#ffffff'
    },
    {
      name: 'black',
      hex: '#000000'
    },
    {
      name: 'brown',
      hex: '#876741'
    },


  ]
  clothesCtrl.clothes = clothes;
  clothesCtrl.closet = closet;
  clothesCtrl.currentClosetId = closet.$id;
  $scope.navHeader = clothesCtrl.closet.name;


  clothesCtrl.clothingPiece = {
    name:'',
    picture: 'img/lozonehead.svg',
    type:'',
    favorite: false,
    colors:[],
    tags: '',
    closet: [clothesCtrl.currentClosetId]
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
        closet: []
      }
    });
  };
  clothesCtrl.deleteClothes = function(clothing){
    if(confirm('Are you sure you want to delete this piece of clothing?')){
      clothesCtrl.clothes.$remove(clothing)
    }
  }
});
