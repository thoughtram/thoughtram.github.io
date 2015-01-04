angular.module('thtrmEvents', [])

.value('eventsData', EVENTSDATA)

.controller('EventsController', ['eventsData', function (eventsData) {
  this.events = eventsData;

  this.isPastEvent = function (date) {
    return new Date(date) < new Date();
  };
}]);
