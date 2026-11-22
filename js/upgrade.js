/* ===== v3 upgrade: wraps R_() so the original files stay untouched ===== */
const THEMED = ['agent', 'ask', 'sent', 'saved', 'match', 'tips', 'chat', 'thread'];
const FULL = ['agent', 'ask'];

/* ---------- Wide scene bands (tonal layers + fine linework) ---------- */
const wv = (y, o) => `<path d="M0 ${y}Q25 ${y - 2} 50 ${y}T100 ${y}T150 ${y}T200 ${y}T250 ${y}T300 ${y}T350 ${y}T400 ${y}" fill="none" stroke="#fff" stroke-width="1" opacity="${o}"/>`;
const SCENE = {
  fish: () => {
    let s = '<rect width="400" height="120" fill="#E9EFEA"/><circle cx="300" cy="46" r="13" fill="#F0D48C"/><circle cx="300" cy="46" r="19" fill="none" stroke="#D9A73A" stroke-width=".7" opacity=".6"/><path d="M0 70Q60 52 130 66Q170 56 220 70V76H0Z" fill="#B7CFDA"/><path d="M250 72Q330 60 400 70V76H250Z" fill="#CBDDE4"/><rect y="70" width="400" height="50" fill="#2E7AA2"/><rect y="70" width="400" height="9" fill="#5B9FBD"/>';
    for (let i = 0; i < 6; i++) s += wv(82 + i * 7, (0.28 - i * 0.03).toFixed(2));
    s += '<path d="M292 74V90M298 74V86M304 74V92M310 74V87" stroke="#F0D48C" stroke-width="1" opacity=".7"/><path d="M190 28q4-5 8 0q4-5 8 0M222 20q3-4 6 0q3-4 6 0" fill="none" stroke="#14303F" stroke-width="1.1"/>';
    s += '<g transform="translate(110,76)"><path d="M0 20Q44 34 98 14L93 22Q46 38 7 28Z" fill="#14303F"/><path d="M6 21Q48 31 94 15" fill="none" stroke="#E0A82E" stroke-width="1"/><path d="M26 22L16 33M70 18L62 31" stroke="#14303F" stroke-width="1.4"/><path d="M4 34Q48 40 92 33" fill="none" stroke="#14303F" stroke-width="3.4" stroke-linecap="round"/><path d="M50 18V8Q50 3 55 3H59Q64 3 64 8V18Z" fill="#14303F"/><circle cx="57" cy="-1" r="3.6" fill="#14303F"/><path d="M48 -1L57 -9L66 -1Z" fill="#14303F"/><path d="M63 8L100 -14" stroke="#14303F" stroke-width="1.1"/><path d="M100 -14Q114 14 112 28" fill="none" stroke="#fff" stroke-width=".7"/><circle cx="112" cy="29" r="1.8" fill="#E0A82E"/><ellipse cx="112" cy="31" rx="5" ry="1.2" fill="none" stroke="#fff" stroke-width=".7" opacity=".8"/><ellipse cx="112" cy="31" rx="9" ry="2.2" fill="none" stroke="#fff" stroke-width=".5" opacity=".5"/></g>';
    return s;
  },
  farm: () => {
    let s = '<rect width="400" height="120" fill="#EEF0DA"/><circle cx="70" cy="30" r="12" fill="#F0D48C"/><circle cx="70" cy="30" r="18" fill="none" stroke="#D9A73A" stroke-width=".7" opacity=".6"/><path d="M0 66L50 42L82 58L130 32L176 60L214 42L270 62L320 40L370 58L400 48V80H0Z" fill="#BCCFAE"/><path d="M0 70L60 54L110 66L170 48L230 66L300 52L360 66L400 58V80H0Z" fill="#CFDDBF"/><path d="M0 72Q100 62 200 70T400 66V92H0Z" fill="#92BC6E"/><path d="M0 88Q120 78 240 86T400 82V108H0Z" fill="#5F9C3D"/><path d="M0 102Q140 94 280 100T400 96V120H0Z" fill="#3F7B2E"/>';
    s += '<g fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="1.5 5" opacity=".4"><path d="M0 80Q100 70 200 78T400 74"/><path d="M0 96Q120 86 240 94T400 90"/><path d="M0 110Q140 102 280 108T400 104"/><path d="M0 116Q140 108 280 114T400 110"/></g>';
    s += '<g transform="translate(285,34)"><path d="M6 30V44M40 30V44M23 30V44" stroke="#6B4A28" stroke-width="2"/><rect x="4" y="22" width="38" height="9" fill="#B98B52"/><path d="M10 22V31M17 22V31M24 22V31M31 22V31M38 22V31" stroke="#8B6B3E" stroke-width=".8"/><path d="M-2 24L23 -2L48 24Z" fill="#C9A55C"/><path d="M6 20L23 4L40 20M12 22L23 10L34 22" fill="none" stroke="#8B6B3E" stroke-width=".9"/><rect x="19" y="24" width="8" height="7" fill="#5B3A1E"/><path d="M42 30L52 44" stroke="#6B4A28" stroke-width="1.2"/></g>';
    s += '<path d="M44 108Q49 84 42 58" fill="none" stroke="#5A3F22" stroke-width="3" stroke-linecap="round"/><path d="M42 58Q31 52 22 60M42 58Q32 46 25 47M42 58Q53 50 61 57M42 58Q52 44 61 45M42 58Q43 48 40 40" fill="none" stroke="#1F4D2B" stroke-width="2.2" stroke-linecap="round"/><circle cx="43" cy="60" r="2.4" fill="#5A3F22"/>';
    s += '<g transform="translate(180,62)" fill="#1B3A22"><path d="M-12 -2L2 -14L16 -2Z"/><circle cx="2" cy="-3" r="3.4"/><path d="M-1 0H6L8 22H-3Z"/><path d="M0 22L-2 36M6 22L10 36" stroke="#1B3A22" stroke-width="2.2"/><path d="M-26 5L30 -1" stroke="#1B3A22" stroke-width="1.4"/><path d="M-24 5V16M-18 5V16" stroke="#1B3A22" stroke-width=".7"/><ellipse cx="-21" cy="18" rx="7" ry="3"/><path d="M26 -1V12M32 -2V12" stroke="#1B3A22" stroke-width=".7"/><ellipse cx="29" cy="14" rx="7" ry="3"/></g>';
    return s;
  }
};

/* ---------- Line icons (48x48, stroke follows text color) ---------- */
const ICON = i => `<svg class="ico" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${i}</svg>`;
const CROP_ICO = {
  Tilapia: ICON('<path d="M5 24Q14 9 30 18Q35 21 36 24Q35 27 30 30Q14 39 5 24Z" fill="#8FB6C8"/><path d="M36 24L45 16V32Z" fill="#8FB6C8"/><path d="M14 13Q20 8 28 15" fill="#8FB6C8"/><path d="M19 15V33M24 16V32M28 18V30" opacity=".5"/><path d="M16 19Q14 24 16 29"/><circle cx="11" cy="22" r="1.3" fill="currentColor"/>'),
  Bangus: ICON('<path d="M4 24Q16 15 30 20L33 24L30 28Q16 33 4 24Z" fill="#C9D6DC"/><path d="M33 24L45 14L41 24L45 34Z" fill="#C9D6DC"/><path d="M16 17L20 12L25 18" fill="#C9D6DC"/><path d="M6 25Q18 27 30 25" opacity=".5"/><path d="M13 20Q11 24 13 28"/><circle cx="9" cy="23" r="1.2" fill="currentColor"/>'),
  Tuna: ICON('<path d="M4 24Q12 14 28 18L34 22V26L28 30Q12 34 4 24Z" fill="#4F86A6"/><path d="M34 24L44 12Q41 24 44 36Z" fill="#4F86A6"/><path d="M14 17L18 9L24 17" fill="#4F86A6"/><path d="M26 21L29 18V22Z M26 27L29 30V26Z" fill="#E0A82E"/><path d="M10 25Q20 28 30 24" opacity=".5"/><circle cx="9" cy="23" r="1.2" fill="currentColor"/>'),
  'Other fish': ICON('<path d="M6 24Q12 12 24 14Q32 16 33 24Q32 32 24 34Q12 36 6 24Z" fill="#E3A84A"/><path d="M33 24L43 16V32Z" fill="#E3A84A"/><path d="M16 15Q13 24 16 33M22 14Q20 24 22 34" opacity=".5"/><circle cx="11" cy="22" r="1.3" fill="currentColor"/>'),
  Pineapple: ICON('<ellipse cx="24" cy="30" rx="10" ry="13" fill="#E3A92A"/><path d="M16 24L32 38M18 20L33 33M16 33L30 20M20 40L33 27" opacity=".45"/><path d="M24 17L19 6M24 17V4M24 17L29 6M24 17L16 10M24 17L32 10" stroke="#3F7B2E" stroke-width="2"/>'),
  Tomato: ICON('<circle cx="24" cy="27" r="14" fill="#D5502F"/><path d="M24 14L20 19M24 14L28 19M24 14V20M24 14Q21 11 17 13M24 14Q27 11 31 13" stroke="#3F7B2E" stroke-width="2"/><path d="M15 22Q16 18 19 17" opacity=".6"/>'),
  Banana: ICON('<path d="M10 12Q14 38 39 34Q41 33 39 31Q22 30 17 11Z" fill="#F0D24A"/><path d="M10 12L8 8L13 9L17 11" fill="#8A7A2A"/><path d="M14 16Q19 30 36 33" opacity=".5"/>'),
  Vegetables: ICON('<path d="M24 40Q7 32 11 11Q26 14 24 40Z" fill="#78B24A"/><path d="M24 40Q41 32 37 11Q22 14 24 40Z" fill="#78B24A"/><path d="M24 40Q15 22 24 5Q33 22 24 40Z" fill="#8EC45C"/><path d="M24 38V12M24 34L17 24M24 34L31 24" opacity=".5"/><path d="M18 40H30" stroke-width="2.4"/>')
};
const TIP_ICO = {
  fish: [
    ICON('<path d="M8 25A16 14 0 0 1 40 25Z" fill="#8FB6C8"/><path d="M24 25V41"/><circle cx="39" cy="9" r="4" fill="#F0D48C"/>'),
    ICON('<path d="M8 30L22 24L36 30L22 36Z" fill="#DCEBF3"/><path d="M8 30V38L22 44V36M36 30V38L22 44" fill="#DCEBF3"/><path d="M14 16L26 11L38 16L26 21Z" fill="#DCEBF3"/><path d="M14 16V22L26 27V21" fill="#DCEBF3"/>'),
    ICON('<rect x="7" y="26" width="34" height="15" rx="2" fill="#E6D3A8"/><path d="M7 33H41M16 26V41M32 26V41"/><path d="M24 7V20M18 15L24 21L30 15"/>'),
    ICON('<path d="M24 7Q37 24 37 30A13 13 0 0 1 11 30Q11 24 24 7Z" fill="#8FB6C8"/><path d="M18 31Q18 36 23 38" opacity=".6"/>')
  ],
  farm: [
    ICON('<path d="M10 33A14 14 0 0 1 38 33Z" fill="#F0D48C"/><path d="M5 33H43M24 12V7M12 17L9 14M36 17L39 14"/><path d="M12 39H36" opacity=".5"/>'),
    ICON('<rect x="7" y="22" width="34" height="19" rx="2" fill="#E6D3A8"/><path d="M7 29H41M7 35H41M16 22V41M24 22V41M32 22V41" opacity=".5"/><path d="M12 17Q16 8 22 14M28 14Q34 8 38 17" stroke="#3F7B2E"/>'),
    ICON('<circle cx="24" cy="26" r="14" fill="#D5502F"/><path d="M24 13L20 18M24 13L28 18M24 13V19" stroke="#3F7B2E" stroke-width="2"/><path d="M28 24Q33 26 31 31Q27 33 25 29Z" fill="#6B3A20"/>'),
    ICON('<path d="M12 27Q5 27 5 21Q5 15 12 15Q15 8 23 9Q30 10 31 16Q38 16 38 22Q38 27 33 27Z" fill="#DCE4E8"/><path d="M14 33L12 39M22 33L20 39M30 33L28 39" stroke="#2E7AA2"/>')
  ]
};
const EMPTY = {
  chat: ICON('<path d="M7 9H41V32H21L12 40V32H7Z" fill="#DCE4E8"/><path d="M14 17H34M14 24H27" opacity=".6"/>'),
  fish: ICON('<path d="M26 6V24A8 8 0 1 1 18 30" fill="none"/><path d="M18 30L14 26M18 30L22 27" /><path d="M4 42Q12 38 20 42T36 42T44 42" opacity=".6"/><circle cx="26" cy="6" r="2" fill="#E0A82E"/>'),
  farm: ICON('<path d="M24 42V22"/><path d="M24 26Q10 26 10 12Q24 12 24 26Z" fill="#8EC45C"/><path d="M24 30Q38 30 38 17Q24 17 24 30Z" fill="#78B24A"/><path d="M8 42H40" opacity=".6"/>')
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

  /* Scene band (no chip, no header) */
  let st = $('#scene');
  if (!st) { st = document.createElement('div'); st.id = 'scene'; $('#hatch').after(st) }
  const show = role && THEMED.includes(sc), full = FULL.includes(sc);
  st.className = show ? 'on' + (full ? '' : ' compact') : '';
  if (show) {
    const key = role + full;
    if (st.dataset.k !== key) {
      st.dataset.k = key;
      st.innerHTML = `<svg viewBox="0 0 400 120" preserveAspectRatio="${full ? 'xMidYMid' : 'xMidYMax'} slice" role="img" aria-label="${role === 'fish' ? 'Fishing boat at sea' : 'Rice terraces and nipa hut'}">${SCENE[role]()}</svg>`;
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
  m.querySelectorAll('.opt[data-k="crop"]').forEach(b => { const e = CROP_ICO[b.dataset.v]; if (e) b.insertAdjacentHTML('afterbegin', e) });

  /* Tips with emoji */
  m.querySelectorAll('.tip').forEach((t, i) => {
    const e = (TIP_ICO[role || 'fish'] || [])[i]; if (!e) return;
    const body = t.innerHTML; t.innerHTML = `<span class="tic">${e}</span><div>${body}</div>`;
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
      : `<div class="empty">${EMPTY.chat}<b>${T('No chats yet', 'Wala pang usapan')}</b><span>${T('When a provider replies, you can ask them questions here.', 'Kapag may sumagot na provider, puwede kang magtanong dito.')}</span></div>`);
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
    m.insertAdjacentHTML('beforeend', `<div class="empty">${role === 'farm' ? EMPTY.farm : EMPTY.fish}<span>${T('Your replies will show up here.', 'Dito lalabas ang mga sagot.')}</span></div>`);
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
