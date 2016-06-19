angular.module('Lozone')
.controller('AuthCtrl',function(Auth, $state){
  var authCtrl = this;
  authCtrl.user = {
    email:'',
    password:''
  };
  authCtrl.login = function(){
    Auth.$signInWithEmailAndPassword(authCtrl.user.email,authCtrl.user.password).then(function(){
      console.log("nah you good to go through man");
      $state.go('closets');
    }, function(error){
      console.log("fuck it man, you got an error");
      authCtrl.error = error;
    });
  };
  authCtrl.register = function(){
    Auth.$createUserWithEmailAndPassword(authCtrl.user.email,authCtrl.user.password).then(function(user){
      authCtrl.login();
    }, function(error){
      authCtrl.error = error;
    });
  }
});
