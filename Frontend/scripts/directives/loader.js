app.directive('loader', function() {
  return {
  	restrict: 'E',
    template: '<i class="fa fa-refresh fa-spin" style="position:absolute;top:50%;left:50%;font-size:50px;z-index:10000;color:#1a1a1a;"></i>'
  };
});