/* Footer visitor count, plus a best-effort look at which organisation the
   visitor is browsing from.

   SITE_CODE is the subdomain chosen at goatcounter.com. IPINFO_TOKEN is
   optional: without one, ipinfo.io still answers at a low daily rate, which
   is plenty for a personal site.

   The IP is looked up in the visitor's own browser and never stored here;
   only the resulting organisation and city are recorded, as a GA4 event and
   as a GoatCounter event. Nothing runs on localhost or from the filesystem. */
(function () {
  var SITE_CODE = 'sekeunkim';
  var IPINFO_TOKEN = '';

  if (location.protocol === 'file:' ||
      location.hostname === 'localhost' ||
      location.hostname === '127.0.0.1') return;

  var base = 'https://' + SITE_CODE + '.goatcounter.com';

  var tag = document.createElement('script');
  tag.async = true;
  tag.dataset.goatcounter = base + '/count';
  tag.src = '//gc.zgo.at/count.js';
  tag.onload = lookUpOrganisation;
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

  function lookUpOrganisation() {
    var url = 'https://ipinfo.io/json' +
              (IPINFO_TOKEN ? '?token=' + IPINFO_TOKEN : '');

    fetch(url)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || !d.org) return;

        /* ipinfo returns "AS1742 Harvard University"; the number adds nothing. */
        var org = d.org.replace(/^AS\d+\s+/, '');
        var place = [d.city, d.region, d.country].filter(Boolean).join(', ');

        if (window.gtag) {
          window.gtag('event', 'visitor_org', {
            organisation: org,
            place: place
          });
        }
        if (window.goatcounter && window.goatcounter.count) {
          window.goatcounter.count({
            path: 'org: ' + org,
            title: place,
            event: true
          });
        }
      })
      .catch(function () { /* lookup is optional; a failure changes nothing */ });
  }
})();
