angular.module('Lozone')
// .directive('closetStriper', function(){
//   return{
//     restrict: 'E',
//     replace:true,
//     template: '<div style="width: 100%;position: absolute;height:25px;background: linear-gradient(to right, #cc9dda 0%,#7EB9E8 100%);"></div>',
//     compile: function(scope, element, attrs){
//       attrs.color1 = (!attrs.color1) ? '#cc9dda' : attrs.color1;
//       attrs.color2 = (!attrs.color2) ? '#7EB9E8' : attrs.color2;
//     }
//   }
// })
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
});
