/* Google Analytics 4.
   The property's Measurement ID (Admin > Data streams > Web) lives here only.
   Nothing is loaded on localhost or from the filesystem, so local previews
   stay out of the reports. */
(function () {
  var MEASUREMENT_ID = 'G-H67P0N346H';

  var isLocal = location.protocol === 'file:' ||
                location.hostname === 'localhost' ||
                location.hostname === '127.0.0.1';
  if (isLocal) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID);

  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
  document.head.appendChild(tag);
})();
