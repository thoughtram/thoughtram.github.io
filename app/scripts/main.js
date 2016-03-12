(function(window, navigator) {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' ||
       window.location.hostname === 'localhost' ||
       window.location.hostname.indexOf('127.') === 0)) {
    navigator.serviceWorker.register('/service-worker.js', {
      scope: './'
    }).then(function(registration) {
      // Check to see if there's an updated version of service-worker.js with
      // new files to cache:
      // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-registration-update-method
      if (typeof registration.update === 'function') {
        registration.update();
      }

      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');
            }
          };
        }
      };
    }).catch(function (e) {
      console.error('Error during service worker registration:', e);
    });
  }

  var trigger = document.querySelector('.thtrm-header-menu-wrapper');
  var triggerCL = trigger.classList;
  var activeClass = 'is-active';

  var docListener = function (event) {
    if (event.target.className !== 'thtrm-header-menu-label') {
      triggerCL.remove(activeClass);
      document.removeEventListener('click', docListener);
    }
  };

  trigger.addEventListener('click', function () {
    if (triggerCL.contains(activeClass)) {
      triggerCL.remove(activeClass)
    } else {
      triggerCL.add(activeClass);
      document.addEventListener('click', docListener);
    };
  });

})(window, navigator);
