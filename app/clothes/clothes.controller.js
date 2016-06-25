angular.module('Lozone')
.controller('clothesController', function($state, Auth, Users, profile, $scope, $fancyModal, clothes,closets,Upload, uploader){
  var clothesCtrl = this;
  $scope.uploader = uploader;
  console.log($scope.uploader)


$scope.doClick = function(event){
  var x = event.clientX;
  var y = event.clientY;
  var offsetX = event.offsetX;
  var offsetY = event.offsetY;
  console.log(x,y,offsetX,offsetY);
  var pixelData = context.getImageData(x,y,offsetX,offsetY).data;
  console.log(pixelData);
};


















clothesCtrl.types = [
    {name: 'Shirt'},
    {name: 'Pants'},
    {name: 'Skirt'},
    {name: 'Shoes'},
    {name: 'Dress'},
    {name: 'Scarf'},
    {name: 'Accessory'},
    {name: 'Socks'},
    {name: 'Hat'}
]
randomString = function(length){
  var text = "";
  var textPool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for(var i = 0;i<length;i++){
    text+= textPool.charAt(Math.floor(Math.random()*textPool.length))
  }
  return text;
}
//Firebase Storage//
//regular upload
$scope.uploadPic = function(file) {
  var pictureName = randomString(15);
  var uploadTask = $scope.uploader.child('/images/'+pictureName).put(file);
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  function(snapshot){
    $scope.progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
    console.log('Upload is '+$scope.progress+ '% done');

  }, function(error){
    switch(error.code){
      case 'storage/unauthorized':
      //no permission
      break;
      case 'storage/canceled':
      //canceled upload
      break;
      case 'storage/unknown':
      //unknown error
      break;
    }
  }, function(){
    //after the file is uploaded successfully, we get a snapshot of the download file
    var downloadURL = uploadTask.snapshot.downloadURL;
    //run clothing upload code
    clothesCtrl.addClothes(downloadURL,pictureName,$scope.currentClosetId);
  });
}
clothesCtrl.clothingPiece = {
  picture: 'img/lozonehead.svg',
  pictureName: '',
  type:'',
  favorite: false,
  colors:[],
  tags: '',
  closet: $scope.currentClosetId
};
clothesCtrl.addClothes = function(downloadURL,pictureName,closetId){
  clothesCtrl.clothingPiece.picture = downloadURL;
  clothesCtrl.clothingPiece.closet = closetId;
  clothesCtrl.clothingPiece.pictureName = pictureName;
  clothesCtrl.clothes.$add(clothesCtrl.clothingPiece).then(function(){
    clothesCtrl.clothingPiece = {
      picture: 'img/lozonehead.svg',
      pictureName:'',
      type:'',
      favorite: false,
      colors:[],
      tags: '',
      closet: ''
    }
    downloadURL ='';
    $scope.picFile = null;
    pictureName = '';
  },function(error){
    //handle us some errors
    console.log(error);
  });
};
$scope.handleFiles = function(event){
  console.log($scope.picFile);
}
//Firebase Storage End//
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



  clothesCtrl.deleteClothes = function(clothing){
    if(confirm('Are you sure you want to delete this piece of clothing?')){
      $scope.uploader.child('/images/'+clothing.pictureName).delete().then(function(){
        //file deleted successfully, let's kill the data too;
          clothesCtrl.clothes.$remove(clothing);
      },function(error){
        console.log(error);
      });

    }
  };
  clothesCtrl.addFavorite = function(clothing){
    clothing.favorite = !clothing.favorite;
    clothesCtrl.clothes.$save(clothing);
  }
});
