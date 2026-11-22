/* ===== v3 upgrade: wraps R_() so the original files stay untouched ===== */
const EM = { Tilapia: '🐟', Bangus: '🐟', Tuna: '🐟', 'Other fish': '🐠', Pineapple: '🍍', Tomato: '🍅', Banana: '🍌', Vegetables: '🥬' };
const TE = { fish: ['🌤️', '🧊', '📦', '💧'], farm: ['🌅', '🧺', '🍅', '☔'] };
const THEMED = ['agent', 'ask', 'sent', 'saved', 'match', 'tips', 'chat', 'thread'];

/* Hand-drawn scene strips */
const STRIP = {
  fish: `<svg viewBox="0 0 400 62" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="fk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B3F66"/><stop offset="1" stop-color="#F7D774"/></linearGradient></defs><rect width="400" height="30" fill="url(#fk)"/><circle cx="330" cy="30" r="16" fill="#FFE9A8"/><rect y="30" width="400" height="32" fill="#0E4F7A"/><path d="M0 40Q50 32 100 40T200 40T300 40T400 40" fill="none" stroke="#7DBBD6" stroke-width="3" opacity=".6"/><path d="M0 52Q50 44 100 52T200 52T300 52T400 52" fill="none" stroke="#7DBBD6" stroke-width="3" opacity=".45"/><g fill="#08202D"><path d="M230 36Q265 46 305 36L298 43Q265 50 238 43Z"/><rect x="266" y="16" width="3" height="22"/><rect x="214" y="39" width="110" height="2.5"/></g><circle cx="267" cy="15" r="5" fill="#F7C948"/></svg>`,
  farm: `<svg viewBox="0 0 400 62" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="400" height="62" fill="#9ED3E6"/><circle cx="60" cy="16" r="11" fill="#FFE9A8"/><path d="M0 32Q100 20 200 31T400 22V62H0Z" fill="#86B93A"/><path d="M0 44Q110 32 220 43T400 35V62H0Z" fill="#62A02F"/><path d="M0 54Q130 44 260 53T400 48V62H0Z" fill="#478A2A"/><g fill="none" stroke="#B7DB6A" stroke-width="2" stroke-dasharray="2 7"><path d="M0 38Q110 26 220 37T400 29"/><path d="M0 49Q130 38 260 48T400 42"/></g><path d="M350 58Q356 40 346 24" fill="none" stroke="#3A2A14" stroke-width="4" stroke-linecap="round"/><g fill="none" stroke="#1E4D1B" stroke-width="3.5" stroke-linecap="round"><path d="M346 24Q330 16 316 22"/><path d="M346 24Q362 14 378 22"/><path d="M346 24Q347 12 342 4"/></g></svg>`
};

/* Chat: provider answers are canned so the prototype works offline */
const CH = { open: null, msgs: {}, seen: {} };
const PNAME = n => (S.tl ? NL[n] : { Ice: 'Ice', Transport: 'Truck', Buyer: 'Buyer', Processing: 'Processing' }[n]) + ' · ' + PV[n][0];
const seedMsg = n => T('Yes, we can help. We arrive ' + PV[n][2] + '. Price: ' + PV[n][1] + '.', 'Kaya po namin. Darating kami ' + (PV[n][2] === 'Tomorrow' ? 'bukas' : PV[n][2]) + '. Presyo: ' + PV[n][1] + '.');
const QS = [
  [T('How much in total?', 'Magkano lahat?'), n => T('About ' + PV[n][1] + '. Pay on arrival.', 'Nasa ' + PV[n][1] + ' po. Bayad pagdating.')],
  [T('Where do I meet you?', 'Saan tayo magkikita?'), () => T('At the town market, near the pier or gate.', 'Sa palengke po, malapit sa pantalan o gate.')],
  [T('Can it be later?', 'Puwede mamaya?'), () => T('Yes, tell us the time you want.', 'Puwede po, sabihin lang ang oras.')],
  [T('Please call me', 'Tawagan mo ako'), () => T('Okay, we will call you soon.', 'Sige po, tatawagan ka namin.')]
];
const thread = n => CH.msgs[n] || (CH.msgs[n] = [{ r: 'bot', t: seedMsg(n) }]);

function ext() {
  const sc = S.scr, role = S.role || '';
  P.dataset.role = role;

  /* Scene strip */
  let st = $('#scene');
  if (!st) { st = document.createElement('div'); st.id = 'scene'; $('#hatch').after(st) }
  const show = role && THEMED.includes(sc);
  st.className = show ? 'on' : '';
  if (show) {
    const key = role + S.tl;
    if (st.dataset.k !== key) {
      st.dataset.k = key;
      st.innerHTML = STRIP[role] + `<span class="chip"><span class="em">${role === 'fish' ? '🐟' : '🌾'}</span>${role === 'fish' ? T('Fishing', 'Pangingisda') : T('Farming', 'Pagsasaka')}</span>`;
    }
  }

  /* Language toggle in the top bar (handler 'lang' already exists) */
  $('#top span').insertAdjacentHTML('afterbegin', `<button class="mini" data-a="lang" aria-label="${T('Switch to English', 'Gawing Filipino')}">${S.tl ? 'EN' : 'FIL'}</button>`);

  /* 4-tab nav: Request, Replies, Chat, Tips */
  const nv = $('#nav'), wait = S.prov.filter(p => p.s === 'ok').length;
  nv.style.display = ['ask', 'agent', 'saved', 'match', 'tips', 'chat', 'thread'].includes(sc) ? 'flex' : 'none';
  const cur = sc === 'saved' || sc === 'agent' ? 'ask' : sc === 'thread' ? 'chat' : sc;
  nv.innerHTML = [['ask', 'req', T('Request', 'Humingi')], ['match', 'match', T('Replies', 'Sagot') + (wait ? ' (' + wait + ')' : '')], ['chat', 'msg', T('Chat', 'Usap')], ['tips', 'tips', 'Tips']]
    .map(([k, i, l]) => `<button data-a="nav" data-v="${k}"${cur === k ? ' aria-current="page"' : ''}${k === 'match' && S.nf ? ' class="flash"' : ''}>${ic(i)}<span>${l}</span></button>`).join('');

  const m = $('#m');

  /* Home: tap pills */
  if (sc === 'home') {
    m.querySelectorAll('.half').forEach(h => h.insertAdjacentHTML('beforeend', `<span class="pick">${T('Tap here', 'Pindutin')}${ic('arrow')}</span>`));
  }

  /* Picture tiles for products */
  m.querySelectorAll('.opt[data-k="crop"]').forEach(b => { const e = EM[b.dataset.v]; if (e) b.insertAdjacentHTML('afterbegin', `<span class="em" aria-hidden="true">${e}</span>`) });

  /* Tips with emoji */
  m.querySelectorAll('.tip').forEach((t, i) => {
    const e = (TE[role || 'fish'] || [])[i]; if (!e) return;
    const body = t.innerHTML; t.innerHTML = `<span class="em" aria-hidden="true">${e}</span><div>${body}</div>`;
  });

  /* "Ask" button on replied cards */
  m.querySelectorAll('.pc[data-s="ok"],.pc[data-s="acc"]').forEach((c, i) => {
    const n = S.prov.filter(p => p.s !== 'w')[i] && S.prov.filter(p => p.s !== 'w')[i].n; if (!n) return;
    c.querySelector('.pb').insertAdjacentHTML('beforeend', `<button class="opt chatq" data-a="chatq" data-n="${n}">${ic('msg')}${T('Ask a question', 'Magtanong')}</button>`);
  });

  /* Chat list */
  if (sc === 'chat') {
    const ok = S.prov.filter(p => p.s !== 'w');
    m.innerHTML = `<h1 class="hd" style="font-size:calc(40px*var(--fs))">${T('Chat', 'Usap')}</h1>` + (ok.length
      ? `<p class="lead">${T('Ask a provider before you accept.', 'Magtanong sa provider bago tanggapin.')}</p>` + ok.map(p => { const th = thread(p.n), last = th[th.length - 1]; return `<button class="cl" data-a="chatq" data-n="${p.n}"><span class="pi">${ic(PI[p.n])}</span><span><b>${PNAME(p.n)}</b><small>${esc(last.t)}</small></span>${CH.seen[p.n] ? '' : '<span class="dot" aria-label="new"></span>'}</button>` }).join('')
      : `<div class="empty"><span class="em">💬</span><b>${T('No chats yet', 'Wala pang usapan')}</b><span>${T('When a provider replies, you can ask them questions here.', 'Kapag may sumagot na provider, puwede kang magtanong dito.')}</span></div>`);
    $('#act').className = 'act'; $('#act').innerHTML = '';
  }

  /* Chat thread: tap-to-ask chips, no typing needed */
  if (sc === 'thread' && CH.open) {
    const n = CH.open;
    m.innerHTML = `<div class="srow"><button class="back" data-a="nav" data-v="chat">${ic('back')}${T('Back', 'Bumalik')}</button><span class="ahd">${ic(PI[n])}${PNAME(n)}</span></div><div class="chat">${thread(n).map(c => `<div class="bub ${c.r === 'me' ? 'me' : 'b'}">${esc(c.t)}</div>`).join('')}</div>`;
    m.scrollTop = m.scrollHeight;
    const a = $('#act'); a.className = 'act on';
    a.innerHTML = `<div class="ag"><div class="qr">${QS.map((q, i) => `<button class="opt" data-a="qr" data-q="${i}">${q[0]}</button>`).join('')}</div></div>`;
  }

  /* Empty state when there is no request yet */
  if (sc === 'match' && !S.prov.length) {
    m.insertAdjacentHTML('beforeend', `<div class="empty"><span class="em">${role === 'farm' ? '🧺' : '🎣'}</span><span>${T('Your replies will show up here.', 'Dito lalabas ang mga sagot.')}</span></div>`);
  }
}

const _R = R_;
R_ = function () { _R(); ext() };

P.addEventListener('click', e => {
  const b = e.target.closest('[data-a]'); if (!b) return;
  const a = b.dataset.a;
  if (a === 'chatq') { CH.open = b.dataset.n; CH.seen[CH.open] = true; S.scr = 'thread'; R_() }
  else if (a === 'qr' && CH.open) {
    const n = CH.open, q = QS[+b.dataset.q];
    thread(n).push({ r: 'me', t: q[0] }); R_();
    setTimeout(() => { thread(n).push({ r: 'bot', t: q[1](n) }); if (S.scr === 'thread' && CH.open === n) R_() }, 800);
  }
});

R_();
