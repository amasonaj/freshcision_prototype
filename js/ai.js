/* AI (simulated): reads Filipino/English text and asks the next question */

function interpret(t) {
  const r = S.req,
    x = t.toLowerCase();
  let m = x.match(/(\d+(?:[.,]\d+)?)\s*(kg|kilo|kilos|kilogram)/);
  if (m) r.qty = parseFloat(m[1].replace(",", "."));
  else if (S.ask === "qty" && (m = x.match(/\d+(?:\.\d+)?/))) r.qty = parseFloat(m[0]);
  PL.forEach((p) => {
    if (x.includes(p.toLowerCase())) r.loc = p;
  });
  for (const [k, v] of CR)
    if (new RegExp(k).test(x)) {
      r.crop = v;
      break;
    }
  ND.forEach(([k, v]) => {
    if (new RegExp(k).test(x) && !r.needs.includes(v)) r.needs.push(v);
  });
  if (/bukas|tomorrow/.test(x)) r.when = "Tomorrow";
  else if (/ngayon|today|now|hapon/.test(x)) r.when = "Today";
}

function nextQ() {
  const r = S.req;
  if (!r.crop)
    return [
      "crop",
      T(
        "What product do you have? For example tilapia or tomatoes.",
        "Anong produkto ang mayroon ka? Halimbawa: tilapia o kamatis.",
      ),
    ];
  if (!r.qty) return ["qty", T("About how many kilos?", "Mga ilang kilo?")];
  if (!r.loc) return ["loc", T("Which municipality are you in?", "Saang bayan ka ngayon?")];
  if (!r.needs.length)
    return [
      "needs",
      T(
        "What help do you need: buyer, transport, ice or storage?",
        "Anong tulong ang kailangan: mamimili, transport, yelo o imbakan?",
      ),
    ];
  if (!r.when) return ["when", T("Today or tomorrow?", "Ngayon o bukas?")];
  return null;
}

function send(txt) {
  txt = (txt || "").trim();
  if (!txt) return;
  const b = JSON.stringify(S.req);
  S.chat.push({ u: 1, t: txt });
  interpret(txt);
  const q = nextQ();
  S.ask = q ? q[0] : "";
  S.chat.push({
    t:
      (b === JSON.stringify(S.req) ? T("I did not catch that. ", "Hindi ko naintindihan. ") : "") +
      (q
        ? q[1]
        : T("Got it. Please check your request below.", "Sige. Pakitingnan ang iyong request sa ibaba.")),
  });
  R();
  const i = $("#in");
  i && i.focus();
}

function sendNow() {
  S.saved = false;
  try {
    localStorage.removeItem("fresh-draft");
  } catch (e) {}
  mkProv();
  toast(T("Request sent. Providers were notified.", "Naipadala na. Naabisuhan ang mga provider."));
  S.sheet = null;
  nav("matches");
}
