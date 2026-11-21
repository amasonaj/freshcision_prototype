/* ACTIONS: button handlers, event listeners, start-up */

const A = {
  lang() {
    S.tl = !S.tl;
    R();
  },
  role(v) {
    if (S.helper && !S.consent) {
      toast(T("Ask the owner’s permission first.", "Magtanong muna ng pahintulot sa may-ari."));
      return;
    }
    S.role = v;
    S.chat = [];
    S.req = E();
    S.ask = "";
    S.st = 0;
    nav(S.on ? "chat" : "guided");
  },
  helper() {
    S.helper = !S.helper;
    S.consent = false;
    R();
  },
  consent() {
    S.consent = !S.consent;
    R();
  },
  go(v) {
    nav(v);
  },
  back() {
    S.scr = S.hist.pop() || "home";
    S.sheet = null;
    R();
  },
  req() {
    if (!S.role) {
      toast(T("Choose Farmer or Fisherfolk first.", "Piliin muna kung Magsasaka o Mangingisda."));
      nav("home");
    } else nav(S.on ? "chat" : "guided");
  },
  net() {
    S.on = !S.on;
    if (S.on && S.saved && !nextQ()) {
      sendNow();
      return;
    }
    toast(
      S.on
        ? T("Back online.", "Online na.")
        : T("Offline. Requests are saved on this phone.", "Offline. Naka-save sa phone ang request."),
    );
    if (!S.on && S.scr === "chat") S.scr = "guided";
    R();
  },
  send() {
    send($("#in").value);
  },
  sample() {
    send(SAMPLE[S.role]);
  },
  mic,
  submit,
  review() {
    nav("review");
  },
  edit() {
    S.req = E();
    S.ask = "";
    S.saved = false;
    S.chat.push({ t: T("Okay. Tell me the correct details.", "Sige. Sabihin ang tamang detalye.") });
    nav(S.on ? "chat" : "guided");
  },
  crop(v) {
    S.req.crop = v;
    R();
  },
  need(v) {
    const n = S.req.needs,
      i = n.indexOf(v);
    i < 0 ? n.push(v) : n.splice(i, 1);
    R();
  },
  qty(v) {
    S.req.qty = Math.max(0, S.req.qty + +v);
    R();
  },
  when(v) {
    S.req.when = v;
    R();
  },
  accept(v) {
    S.sheet = { t: "acc", i: +v };
    R();
  },
  yes(v) {
    S.prov[+v].s = "acc";
    S.sheet = null;
    toast(T("Accepted. The provider was told.", "Tinanggap. Naabisuhan ang provider."));
    R();
  },
  ask() {
    S.sheet = { t: "ask" };
    R();
  },
  sq() {
    S.sheet = null;
    R();
    toast(T("Question sent. The reply will appear here.", "Naipadala ang tanong. Lalabas dito ang sagot."));
  },
  close() {
    S.sheet = null;
    R();
  },
  remind() {
    toast(T("Reminder sent.", "Naipadala ang paalala."));
  },
  join() {
    S.shared = 2;
    toast(T("You joined the shared option.", "Sumali ka sa shared option."));
    R();
  },
  nojoin() {
    S.shared = 0;
    toast(T("Nothing was shared.", "Walang ibinahagi."));
    R();
  },
  res(v) {
    S.res = v;
    R();
  },
  oq(v) {
    S.oq = Math.max(0, S.oq + +v);
    R();
  },
  sp(v) {
    S.sp = v;
    R();
  },
  saveout() {
    if (!S.res) {
      toast(T("Choose how it went first.", "Piliin muna ang resulta."));
      return;
    }
    S.st = 4;
    R();
  },
  newreq() {
    Object.assign(S, {
      req: E(),
      chat: [],
      prov: [],
      st: 0,
      res: "",
      ask: "",
      saved: false,
      shared: 0,
      hist: [],
      scr: "home",
      oq: 0,
      sp: "none",
      pvDone: 0,
    });
    R();
  },
  tip(v) {
    S.tips[v] = !S.tips[v];
    R();
  },
  tr(v) {
    S.tr = v;
    R();
  },
  pv(v) {
    S.pv = v;
    R();
  },
  pconf() {
    S.pvDone = 1;
    const w = S.prov.find((p) => p.s === "wait");
    if (w) w.s = "ok";
    toast(T("Confirmed. The member is notified.", "Kumpirmado. Naabisuhan ang member."));
    R();
  },
  pdec() {
    S.pvDone = 2;
    R();
  },
};

document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-a]");
  if (!b) return;
  if (b.classList.contains("sheet") && e.target.closest("[data-stop]") && e.target.closest("[data-a]") === b)
    return;
  A[b.dataset.a] && A[b.dataset.a](b.dataset.v);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.id === "in") {
    e.preventDefault();
    send(e.target.value);
  }
});

document.addEventListener("change", (e) => {
  if (e.target.id === "loc") S.req.loc = e.target.value;
  if (e.target.id === "hw") S.hw = e.target.value;
});

R();
