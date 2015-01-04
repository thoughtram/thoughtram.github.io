angular.module('thtrmEvents', [])

.value('eventsData', EVENTSDATA)

.controller('EventsController', ['eventsData', function (eventsData) {
  'use strict';

  this.upcomingEvents = [];
  this.pastEvents = [];

  this.isPastEvent = function (date) {
    return new Date(date) < new Date();
  };

  eventsData.forEach(function (e) {
    if (!this.isPastEvent(e.date)) {
      this.upcomingEvents.push(e);
    } else {
      this.pastEvents.push(e);
    }
  }.bind(this));

}])

.directive('thtrmEventsApp', function () {
  'use strict';
  return {
    scope: {},
    restrict: 'E',
    controller: 'EventsController',
    controllerAs: 'ctrl',
    template: [
      '<h2 class="thtrm-m-section__sub-headline">Upcoming Events</h2>',
      '<thtrm-events-list events="ctrl.upcomingEvents"></thtrm-events-list>',
      '<h2 class="thtrm-m-section__sub-headline">Past Events</h2>',
      '<thtrm-events-list events="ctrl.pastEvents"></thtrm-events-list>',
    ].join('')
  };
})

.directive('thtrmEventsList', function () {
  'use strict';
  return {
    scope: {
      events: '='
    },
    restrict: 'E',
    replace: true,
    controller: function () {},
    controllerAs: 'ctrl',
    bindToController: true,
    template: [
      '<ul class="thtrm-m-events">',
        '<li ng-repeat="event in ctrl.events">',
          '<div class="thtrm-m-event">',
            '<span class="thtrm-m-event__date">',
              '<i class="fa fa-calendar"></i>',
              '<span ng-bind="event.date | date"></span>',
            '</span>',

            '<h3 class="thtrm-m-event__name"><a ng-href="{{event.websiteUrl}}" title="{{event.name}}" ng-bind="event.name"></a></h3>',

            '<span class="thtrm-m-event__talk-name" ng-if="event.talkName" ng-bind="event.talkName"></span>',
            '<p class="thtrm-m-event__summary" ng-bind="event.summary"></p>',

            '<p class="thtrm-m-event__info"><a ng-href="{{event.websiteUrl}}" title="{{event.name}}">More info</a></p>',
            '<p class="thtrm-m-event__info" ng-if="event.slideUrl || event.videoUrl"><a ng-if="event.slidesUrl" ng-href="{{event.slidesUrl}}">View Slides</a> <span ng-if="event.slidesUrl && event.videoUrl">or</span> <a ng-href="{{event.videoUrl}}">Watch Video</a></p>',
          '</div>',
        '</li>',
      '</ul>'
    ].join('')
  };
});
