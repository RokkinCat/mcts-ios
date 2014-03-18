angular.module('mcts.controllers', [])

.run(function($rootScope) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $rootScope.$apply(function() {
        $rootScope.latitude = position.coords.latitude;
        $rootScope.longitude = position.coords.longitude;
      });
    });
  }
})

.controller('RouteIndexCtrl', function($scope, $rootScope, BusService) {
  $scope.busses = [];

  BusService.listen("all", function(event) {
    $scope.$apply(function() {
      var bus = _.findWhere($scope.busses, {VEHICLE_NUMBER: event.VEHICLE_NUMBER});
      if(bus == null) {
        $scope.busses.push(event);
      } else {
        _.extend(bus, event);
      }
      console.log(event);
    })
  });

  // TODO: Garbage collect

})


.controller('RouteDetailCtrl', function($scope, $stateParams) {
  console.log("OIENOIW");
});
