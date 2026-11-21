/* UI HELPERS: icons, toast, navigation, shared components */

const I = {
  leaf: '<path d="M5 19C5 10 10 5 20 4c0 10-5 15-14 15zM5 19c3-5 6-8 10-10"/>',
  fish: '<path d="M3 12c3-5 8-6 13-3l5-3v12l-5-3c-5 3-10 2-13-3z"/>',
  users:
    '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 3-6 6.5-6s6.5 2.4 6.5 6M16 4.7a3.3 3.3 0 010 6.4M18 14.6c2.2.7 3.5 2.6 3.5 5.4"/>',
  woff: '<path d="M3 3l18 18M5 12.5a10 10 0 015-2.6M8.5 16a5.5 5.5 0 012-1.2M12 20h.01M15 9.8a10 10 0 014 2.7"/>',
  wifi: '<path d="M5 12.5a10 10 0 0114 0M8.5 16a5.5 5.5 0 017 0M12 20h.01"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>',
  send: '<path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  truck:
    '<path d="M2 6h11v10H2zM13 9h5l3 3v4h-8"/><circle cx="6.5" cy="18.5" r="1.8"/><circle cx="17.5" cy="18.5" r="1.8"/>',
  ice: '<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5L4.2 16.5"/>',
  buyer: '<path d="M4 21V9l8-5 8 5v12M9 21v-6h6v6"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  home: '<path d="M3 11l9-8 9 8M5 10v10h14V10"/>',
  spark: '<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
  box: '<path d="M3 8l9-5 9 5v8l-9 5-9-5zM3 8l9 5 9-5M12 13v8"/>',
  drop: '<path d="M12 3c4 5 6 8 6 11a6 6 0 01-12 0c0-3 2-6 6-11z"/>',
};

const ic = (n) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

let tt;

function toast(m) {
  const e = $("#toast");
  e.textContent = m;
  e.style.display = "block";
  clearTimeout(tt);
  tt = setTimeout(() => (e.style.display = "none"), 2600);
}

function nav(to) {
  if (to !== S.scr) {
    S.hist.push(S.scr);
    S.scr = to;
  }
  S.sheet = null;
  R();
}

const rn = () =>
  (S.role === "fish" ? T("Fisherfolk", "Mangingisda") : S.role === "farm" ? T("Farmer", "Magsasaka") : "") +
  (S.helper ? " · " + T("helped by ", "tinutulungan ng ") + S.hw : "");

const netBtn = () =>
  `<button class="chip${S.on ? "" : " off"}" data-a="net">${S.on ? ic("wifi") + "Online" : ic("woff") + "Offline"}</button>`;

const lang = () =>
  `<button class="chip" data-a="lang" aria-label="Language">${S.tl ? "English" : "Filipino"}</button>`;

const rows = (l) => l.map(([a, b]) => `<span>${a}</span><b>${esc(b)}</b>`).join("");

const summary = () => {
  const r = S.req;
  return `<div class="card"><h3>${T("Please check your request", "Pakitingnan ang iyong request")}</h3><div class="kv">${rows(
    [
      [T("Who", "Sino"), rn()],
      [T("Product", "Produkto"), r.crop],
      [T("Quantity", "Dami"), r.qty + " kg"],
      [T("Place", "Lugar"), r.loc],
      [T("Needs", "Kailangan"), r.needs.map((n) => (S.tl ? NL[n] : n)).join(", ")],
      [T("When", "Kailan"), r.when],
    ],
  )}</div>${S.saved ? `<span class="pill a">${T("Saved on device · not sent yet", "Naka-save sa device · hindi pa naipapadala")}</span>` : ""}<div class="two"><button class="btn o s" data-a="edit">${T("Edit", "Baguhin")}</button><button class="btn s" data-a="submit">${S.on ? T("Confirm & send", "Kumpirmahin at ipadala") : T("Save on device", "I-save sa device")}</button></div></div>`;
};
