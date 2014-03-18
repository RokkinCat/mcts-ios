angular.module('mcts.services', ['ngResource'])

.factory('BusService', function($resource) {

  var socket = new WebSocket("ws://localhost:9999");
  var listeners = [];

  socket.onmessage = function(e) {
    _.each(
      _.select(listeners, function(listener) {
        return listener.route == e.data.ROUTE_NUMBER || listener.route == "all"
      }),
      function(listener) {
        listener.callback(JSON.parse(e.data));
      }
    );
  }

  // BusService.listenTo(10, function(event) {})
  // BusService.listenTo([10,15], function(event) {})
  // BusService.listenTo("all", function(event) {})
  return {
    listen: function() {
      var cb = arguments[arguments.length - 1];
      listeners.push({
        route: arguments[0],
        callback: cb
      })
    },
    ignore: function() {

    },
    getSocketFor: function(route) {
      return new WebSocket("ws://localhost:9999",[route])
    }
  }
})
