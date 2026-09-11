/* ============================================================
   Form handling for aiforla.org

   ONE THING TO CONFIGURE. Paste your form endpoint below and
   every form on the site starts posting to it.

   Works with anything that accepts a POST of form fields —
   Formspree, Basin, Getform, Netlify Forms, a Google Apps
   Script web app, your own endpoint.

   Until you set it, forms fall back to opening a pre-filled
   email to hello@aiforla.org with every answer in the body.
   Nothing is ever silently lost.
   ============================================================ */

var FORM_ENDPOINT = ''; // <-- paste your endpoint URL here

var FALLBACK_EMAIL = 'hello@aiforla.org';

(function () {
  'use strict';

  function fields(form) {
    var out = [];
    new FormData(form).forEach(function (v, k) {
      if (String(v).trim()) out.push([k, String(v).trim()]);
    });
    return out;
  }

  function mailtoFallback(form) {
    var subject = form.getAttribute('data-subject') || 'Message from aiforla.org';
    var body = fields(form).map(function (p) {
      return p[0] + ':\n' + p[1];
    }).join('\n\n');
    window.location.href = 'mailto:' + FALLBACK_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  }

  function setStatus(form, msg, kind) {
    var el = form.querySelector('.form-status');
    if (!el) return;
    el.textContent = msg;
    el.className = 'form-status' + (kind ? ' is-' + kind : '');
    el.hidden = !msg;
  }

  function submitButton(form) {
    return form.querySelector('button[type=submit],input[type=submit]');
  }

  function handle(e) {
    var form = e.target;
    e.preventDefault();

    if (!FORM_ENDPOINT) { mailtoFallback(form); return; }

    var btn = submitButton(form);
    var label = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    setStatus(form, '', '');

    var data = new FormData(form);
    data.append('_page', window.location.pathname);

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      form.reset();
      setStatus(form, form.getAttribute('data-thanks') ||
        'Thank you — we’ll be in touch.', 'ok');
    }).catch(function () {
      setStatus(form, 'That didn’t send. Opening an email instead…', 'warn');
      setTimeout(function () { mailtoFallback(form); }, 900);
    }).then(function () {
      if (btn) { btn.disabled = false; btn.textContent = label; }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var forms = document.querySelectorAll('form[data-aiforla]');
    for (var i = 0; i < forms.length; i++) forms[i].addEventListener('submit', handle);
  });
})();
