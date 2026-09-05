/* Google Analytics 4.
   Paste the property's Measurement ID (Admin > Data streams > Web) below.
   While it is left as the placeholder, nothing is loaded and no request is made. */
(function () {
  var MEASUREMENT_ID = 'G-XXXXXXXXXX';

  var isPlaceholder = MEASUREMENT_ID === 'G-XXXXXXXXXX';
  var isLocal = location.protocol === 'file:' ||
                location.hostname === 'localhost' ||
                location.hostname === '127.0.0.1';
  if (isPlaceholder || isLocal) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID);

  var tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
  document.head.appendChild(tag);
})();
