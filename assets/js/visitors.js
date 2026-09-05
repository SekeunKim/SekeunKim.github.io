/* Visitor count in the footer, served by GoatCounter.
   SITE_CODE is the subdomain chosen at goatcounter.com (<code>.goatcounter.com).
   Two things happen here: count.js records the pageview, and the public
   counter endpoint gives back the running total to show.
   Nothing runs on localhost or from the filesystem, and the footer line
   stays hidden unless a count actually comes back. */
(function () {
  var SITE_CODE = 'sekeunkim';

  if (location.protocol === 'file:' ||
      location.hostname === 'localhost' ||
      location.hostname === '127.0.0.1') return;

  var base = 'https://' + SITE_CODE + '.goatcounter.com';

  var tag = document.createElement('script');
  tag.async = true;
  tag.dataset.goatcounter = base + '/count';
  tag.src = '//gc.zgo.at/count.js';
  document.head.appendChild(tag);

  fetch(base + '/counter/TOTAL.json')
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) {
      if (!d || !d.count) return;
      var el = document.getElementById('visitor-count');
      if (!el) return;
      el.textContent = d.count + ' visits';
      el.hidden = false;
    })
    .catch(function () { /* counter is decoration; stay quiet on failure */ });
})();
