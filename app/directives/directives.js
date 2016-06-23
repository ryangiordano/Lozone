angular.module('Lozone')
.directive('slideable',function(){
  return{
    restrict: 'C',
    compile: function(element, attrs){
      //wrap tag = pick up the content, and then wrap it in a div.
      var contents = element.html();
      element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents+ '</div>');
      return function postLink(scope, element, attrs){
        //default properties
        attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
        attrs.easing = (!attrs.easing)? 'ease-in-out': attrs.easing;
        element.css({
          'overflow': 'hidden',
          'height' : '0px',
          'transitionProperty': 'height',
          'transitionDuration': attrs.duration,
          'transitionTimingFunction':attrs.easing
        });
      };
    }
  };
})
.directive('slideToggle', function(){
  return{
    restrict: 'A',
    link: function(scope, element, attrs){
      var target = document.querySelector(attrs.slideToggle);
      attrs.expanded = false;
      element.bind('click', function(){
        var content = target.querySelector('.slideable_content');
        if(!attrs.expanded){
          content.style.border ='1px solid rgba(0,0,0,0)';
          var y = content.clientHeight;
          content.style.border = 0;
          target.style.height = y +'px';
        }else{
          target.style.height = '0px';
        }
        attrs.expanded = !attrs.expanded;
      });
    }
  }
})
.directive('clothingPiece', function(){
  return{
    restrict:'E',
    templateUrl:'clothes/clothing-piece.html'
  }
})
.directive('mclothingPiece', function(){
  return{
    restrict:'E',
    templateUrl:'metacloset/mclothing-piece.html'
  }
})
.directive('mclothingPieceForm', function(){
  return{
    restrict:'E',
    templateUrl:'metacloset/mclothing-piece-form.html'
  }

})
.directive('customOnChange', function(){
    return{
      restrict:'A',
      link:function(scope, element, attrs){
        var onChangeHandler = scope.$eval(attrs.customOnChange);
        element.bind('change',onChangeHandler);
      }
    }
  })
  .directive('fileModel', ['$parse', function ($parse) {
      return {
          restrict: 'A',
          link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;

              element.bind('change', function(){
                  scope.$apply(function(){
                      modelSetter(scope, element[0].files[0]);
                  });
              });
          }
      };
  }]);
