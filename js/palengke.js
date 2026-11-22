/* ===== Palengke receipt look: small hooks on top of upgrade.js ===== */
const _R_pk = R_;
R_ = function () { _R_pk(); pk() };

function pk() {
  /* tells the CSS whether the scene band is showing */
  P.classList.toggle('has-scene', !!document.querySelector('#scene.on'));

  /* Sent / saved: show the filled slip with a stamp instead of the big check */
  const sc = S.scr, w = $('.fin .ckwrap');
  if (w && !w.classList.contains('pl') && (sc === 'sent' || sc === 'saved')) {
    const r = S.r, tl = S.tl, now = new Date();
    const rows = [
      [T('Product', 'Produkto'), r.crop],
      [T('Weight', 'Bigat'), r.qty ? r.qty + ' kg' : ''],
      [T('Town', 'Bayan'), r.loc],
      [T('Help', 'Tulong'), (r.needs || []).map(x => (tl ? NL[x] : x)).join(', ')],
      [T('When', 'Kailan'), r.when ? (tl ? WL[r.when] : r.when) : '']
    ];
    const hh = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    w.classList.add('pl');
    w.innerHTML = '<div class="pk-rc"><div class="h"><span style="color:inherit;font-weight:700">' + T('Request slip', 'Slip ng request') + '</span><span>No. 0147</span></div>'
      + rows.map(([k, v]) => '<div class="l"><i>' + k + '</i><u></u><b>' + esc(v || '') + '</b></div>').join('')
      + '<div class="h" style="border:0;border-top:2px solid var(--ink);margin:6px 0 0;padding-top:6px"><span>' + T('Filled 5/5', 'Napunan 5/5') + '</span><span>' + hh + (r.loc ? ' · ' + esc(r.loc).toUpperCase() : '') + '</span></div>'
      + '<div class="pk-stamp hd' + (sc === 'saved' ? ' amber' : '') + '">' + (sc === 'saved' ? T('Saved', 'Naka-save') : T('Sent', 'Naipadala')) + '</div></div>';
  }
}
pk();
