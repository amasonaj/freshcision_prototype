/* STATE: helpers, app state, saved draft, language */

const $ = (s) => document.querySelector(s),
  esc = (s) =>
    String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const E = () => ({ crop: "", qty: 0, loc: "", needs: [], when: "" });

const S = {
  scr: "home",
  hist: [],
  on: true,
  tl: false,
  role: "",
  helper: false,
  hw: "Family or friend",
  consent: false,
  req: E(),
  chat: [],
  ask: "",
  saved: false,
  st: 0,
  prov: [],
  shared: 0,
  sheet: null,
  res: "",
  oq: 0,
  sp: "none",
  tips: {},
  tr: "",
  pv: "ok",
  pvDone: 0,
};

try {
  const d = localStorage.getItem("fresh-draft");
  if (d) {
    S.req = JSON.parse(d);
    S.saved = true;
  }
} catch (e) {}

const T = (a, b) => (S.tl ? b : a);
