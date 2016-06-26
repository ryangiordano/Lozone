angular.module('Lozone')
.controller('AuthCtrl',function(Auth, $state){
  var authCtrl = this;
  authCtrl.user = {
    email:'',
    password:''
  };
  authCtrl.login = function(){
    Auth.$signInWithEmailAndPassword(authCtrl.user.email,authCtrl.user.password).then(function(){
      
      $state.go('closets');
    }, function(error){
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
