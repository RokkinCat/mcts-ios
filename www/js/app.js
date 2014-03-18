angular.module('mcts', ['ionic', 'mcts.services', 'mcts.controllers'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('route-index', {
    url: "/all",
    templateUrl: "templates/route-index.html",
    controller: "RouteIndexCtrl"
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/all');

})

.directive('map', function () {
  return {
    restrict: 'A',
    scope: {
      latitude: "@",
      longitude: "@",
      markers: "="
    },
    link: function (scope, elem, attrs) {
      var map = new OpenLayers.Map(elem[0], {controls: []});
      map.addLayer(new OpenLayers.Layer.OSM());
      map.zoomToMaxExtent();
      map.addControl(new OpenLayers.Control.Navigation())

      var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
      var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection

      scope.updateMapPosition = function(latitude, longitude, zoom) {
        var position = new OpenLayers.LonLat(longitude, latitude).transform(fromProjection, toProjection);
        map.setCenter(position, zoom);
      }

      var vectorLayer = new OpenLayers.Layer.Vector("Overlay");
      var feature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(0, 0), {some:'data'});
      vectorLayer.addFeatures(feature);
      map.addLayer(vectorLayer);

      scope.$watch("latitude", function(val) {
        scope.updateMapPosition(scope.latitude, scope.longitude, 15);
      });
      scope.$watch("longitude", function(val) {
        scope.updateMapPosition(scope.latitude, scope.longitude, 15);
      });


    }
  }
})
