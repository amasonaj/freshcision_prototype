/* SCREENS: one function per screen, plus the sheet and render() */

function home() {
  return `<div class="hero"><div class="top"><b>FRESHCISION</b><span class="wrap" style="gap:8px">${lang()}${netBtn()}</span></div><h1>${T("From farm to sea, help reaches you in time.", "Mula bukid hanggang dagat, may tulong na darating.")}</h1><p>${T("Tell us what you harvested or caught. We find providers who can help.", "Sabihin kung ano ang inani o nahuli mo. Hahanapin namin ang makakatulong.")}</p></div>
<div class="main"><div class="h">${T("I am a…", "Ako ay…")}</div>
<button class="btn big" data-a="role" data-v="farm">${ic("leaf")}<span>Magsasaka<small>${T("Farmer", "Farmer")}</small></span></button>
<button class="btn big t" data-a="role" data-v="fish">${ic("fish")}<span>Mangingisda<small>${T("Fisherfolk", "Fisherfolk")}</small></span></button>
<div class="card"><button class="sw${S.helper ? " on" : ""}" data-a="helper" role="switch" aria-checked="${S.helper}"><i></i>${T("Someone is helping me", "May tumutulong sa akin")}</button>
${S.helper ? `<select id="hw" aria-label="Helper">${["Family or friend", "Cooperative", "Barangay coordinator"].map((h) => `<option${S.hw === h ? " selected" : ""}>${h}</option>`).join("")}</select><button class="sw${S.consent ? " on" : ""}" data-a="consent" role="switch" aria-checked="${S.consent}"><i></i>${T("The owner gave permission", "Pumayag ang may-ari")}</button><div class="sm">${T("You can prepare and track the request. Only the owner decides to accept an offer.", "Maaari mong ihanda at subaybayan ang request. Ang may-ari lang ang magpapasya.")}</div>` : ""}</div>
${S.st >= 2 ? `<button class="btn o" data-a="go" data-v="matches">${ic("truck")}${T("View my request", "Tingnan ang request ko")}</button>` : ""}
<button class="lnk" data-a="go" data-v="prov">${T("Service provider? Open FRESHCISION Connect", "Provider? Buksan ang FRESHCISION Connect")}</button>
<div class="sm" style="text-align:center">${T("You decide every step. Providers confirm before anything is final.", "Ikaw ang magpapasya. Kukumpirmahin muna ng provider.")}</div></div>`;
}

function chat() {
  if (!S.chat.length)
    S.chat.push({
      t: T(
        "Kumusta! Tell me what happened with your " +
          (S.role === "fish" ? "catch" : "harvest") +
          ". You can type or speak.",
        "Kumusta! Ikuwento mo ang " + (S.role === "fish" ? "huli" : "ani") + " mo. Mag-type o magsalita.",
      ),
    });
  const done = S.chat.some((m) => m.u) && !nextQ() && S.st < 2;
  return `<div class="main">${S.chat.map((m) => `<div class="bb${m.u ? " u" : ""}">${esc(m.t)}</div>`).join("")}${S.chat.length < 2 ? `<button class="btn o s" data-a="sample" style="text-align:left">${T("Tap to try an example", "I-tap para sa halimbawa")}:<br>“${SAMPLE[S.role]}”</button>` : ""}${done ? summary() : ""}</div>
<div class="bar"><button class="ib f" data-a="mic" aria-label="Speak">${ic("mic")}</button><input id="in" aria-label="Message" placeholder="${T("Type or speak…", "Mag-type o magsalita…")}"><button class="ib f" data-a="send" aria-label="Send">${ic("send")}</button></div>
<div style="padding:0 14px 10px"><button class="btn o s" data-a="go" data-v="guided">${T("Use buttons instead", "Gumamit ng mga button")}</button></div>`;
}

function guided() {
  const r = S.req,
    K =
      S.role === "farm"
        ? ["Pineapple", "Tomato", "Banana", "Vegetables"]
        : ["Tilapia", "Bangus", "Tuna", "Fish"];
  const N = [
    ["Buyer", "Find a buyer", "Maghanap ng mamimili", "buyer"],
    ["Transport", "Request transport", "Humingi ng transport", "truck"],
    ["Ice", "Ice or storage", "Yelo o imbakan", "ice"],
    ["Processing", "Processing", "Proseso", "gear"],
  ];
  return `<div class="main"><div class="h">1. ${T("What do you have?", "Ano ang mayroon ka?")}</div><div class="wrap">${K.map((c) => `<button class="tab${r.crop === c ? " on" : ""}" data-a="crop" data-v="${c}">${c}</button>`).join("")}</div>
<div class="h">2. ${T("What help do you need?", "Anong tulong ang kailangan?")}</div><div class="tiles">${N.map(([k, a, b, i]) => `<button class="tile${r.needs.includes(k) ? " on" : ""}" data-a="need" data-v="${k}" aria-pressed="${r.needs.includes(k)}">${ic(i)}${T(a, b)}</button>`).join("")}</div>
<div class="h">3. ${T("How many kilos?", "Ilang kilo?")}</div><div class="stp"><button class="ib" data-a="qty" data-v="-5" aria-label="Less">${ic("minus")}</button><b>${r.qty} kg</b><button class="ib f" data-a="qty" data-v="5" aria-label="More">${ic("plus")}</button></div>
<div class="h">4. ${T("Where are you?", "Nasaan ka?")}</div><select id="loc" aria-label="Place"><option value="">${T("Choose place", "Pumili ng lugar")}</option>${PL.map((p) => `<option${r.loc === p ? " selected" : ""}>${p}</option>`).join("")}</select>
<div class="h">5. ${T("When?", "Kailan?")}</div><div class="two">${[
    ["Today", "Ngayon"],
    ["Tomorrow", "Bukas"],
    ["This week", "Linggong ito"],
  ]
    .map(
      ([v, l]) =>
        `<button class="tab${r.when === v ? " on" : ""}" data-a="when" data-v="${v}">${T(v, l)}</button>`,
    )
    .join("")}</div>
<button class="btn" data-a="review">${ic("check")}${T("Check my request", "Tingnan ang request")}</button>
${S.on ? `<button class="btn o s" data-a="go" data-v="chat">${T("Talk to the assistant instead", "Kausapin ang assistant")}</button>` : `<div class="sm" style="text-align:center">${T("No internet needed. Your request is saved on this phone.", "Hindi kailangan ng internet. Naka-save sa phone mo.")}</div>`}</div>`;
}

const review = () =>
  `<div class="main">${nextQ() ? `<div class="call"><b>${T("Something is missing", "May kulang pa")}</b>${nextQ()[1]}</div><button class="btn" data-a="go" data-v="guided">${T("Go back and fill in", "Bumalik at kumpletuhin")}</button>` : summary()}</div>`;

function prog() {
  const a = S.prov.some((p) => p.s === "acc"),
    c = S.st === 4,
    L = [T("Sent", "Naipadala"), T("Matched", "Na-match"), T("Confirmed", "Kumpirmado"), T("Done", "Tapos")],
    D = [1, 1, a, c];
  return `<div class="card"><h3>${T("Progress", "Takbo")}</h3><div class="two">${L.map((l, i) => `<div class="step ${D[i] ? "d" : i === 0 || D[i - 1] ? "c" : ""}"><i>${D[i] ? ic("check") : i + 1}</i>${l}</div>`).join("")}</div></div>`;
}

function matches() {
  if (S.st < 2)
    return `<div class="main"><div class="card" style="text-align:center"><h3>${T("No request yet", "Wala pang request")}</h3><div class="sm">${T("Start a request and matches will show here.", "Magsimula ng request para makita ang mga match.")}</div><button class="btn" data-a="req">${T("Start a request", "Magsimula")}</button></div></div>`;
  const r = S.req,
    B = {
      ok: `<span class="pill">${ic("check")}${T("Confirmed available", "Kumpirmadong available")}</span>`,
      wait: `<span class="pill a">${T("Awaiting reply", "Naghihintay ng sagot")}</span>`,
      acc: `<span class="pill b">${ic("check")}${T("You accepted", "Tinanggap mo")}</span>`,
    };
  return `<div class="main"><div class="sm">${r.qty} kg ${esc(r.crop)} · ${esc(r.loc)}. ${T("Matches are suggestions. A provider is available only after they confirm.", "Mungkahi lang ang mga match. Available lang ang provider kapag nagkumpirma.")}</div>
${S.prov
  .map((p, i) => {
    const d = PROV[p.n];
    return `<div class="card"><div class="two" style="align-items:center"><div class="ib" style="width:48px;height:48px;border:0;background:var(--soft)">${ic(d[3])}</div><div style="flex:3"><h3>${d[0]}</h3><div class="sm">${S.tl ? NL[p.n] : p.n} · ${T("covers", "sakop ang")} ${esc(r.loc)}</div></div></div>${B[p.s]}
${p.s !== "wait" ? `<div class="kv" style="grid-template-columns:1fr 1fr"><span>${T("Rate", "Presyo")}</span><b>${d[1]}</b><span>${T("Ready by", "Handa sa")}</span><b>${d[2]}</b></div>` : ""}
${p.s === "ok" ? `<div class="two"><button class="btn s" data-a="accept" data-v="${i}">${T("Accept", "Tanggapin")}</button><button class="btn o s" data-a="ask" data-v="${i}">${T("Ask a question", "Magtanong")}</button></div>` : ""}
${p.s === "wait" ? `<button class="btn o s" data-a="remind">${T("Send reminder", "Magpadala ng paalala")}</button>` : ""}</div>`;
  })
  .join("")}
${S.role === "farm" && r.needs.includes("Buyer") ? `<div class="card"><span class="pill b">${T("Shared option found", "May shared option")}</span><div>${T("3 farmers have 20 + 15 + 25 = 60 kg of tomatoes. A buyer needs 50 kg and one truck fits 60 kg. Your share of transport: about ₱180.", "3 magsasaka: 20 + 15 + 25 = 60 kg kamatis. 50 kg ang kailangan ng buyer; kasya ang 60 kg sa isang truck. Bahagi mo sa transport: mga ₱180.")}</div>${S.shared === 2 ? `<span class="pill">${ic("check")}${T("You joined. Waiting for others.", "Sumali ka. Hinihintay ang iba.")}</span>` : `<div class="two"><button class="btn s" data-a="join">${T("Join", "Sumali")}</button><button class="btn gr s" data-a="nojoin">${T("No thanks", "Hindi muna")}</button></div><div class="sm">${T("Nothing is combined without everyone’s agreement.", "Walang pagsasamahin kung hindi pumayag lahat.")}</div>`}</div>` : ""}
${prog()}<button class="btn o" data-a="go" data-v="ai">${ic("spark")}${T("Why these matches?", "Bakit ito ang mga match?")}</button><button class="btn t" data-a="go" data-v="outcome">${ic("check")}${T("Record outcome", "Itala ang resulta")}</button></div>`;
}

function ai() {
  const r = S.req;
  return `<div class="main"><div class="card"><h3>${T("What the AI understood", "Naintindihan ng AI")}</h3>${r.crop ? `<div class="wrap">${[r.crop, r.qty + " kg", r.loc, r.when, ...r.needs].map((x) => `<span class="pill">${esc(x)}</span>`).join("")}</div>` : `<div class="sm">${T("No request yet.", "Wala pang request.")}</div>`}<div class="sm">${T("AI never guesses missing details. It asks, then you confirm.", "Hindi hinuhulaan ng AI ang kulang. Magtatanong ito, at ikaw ang kukumpirma.")}</div></div>
<div class="card"><h3>${T("Why these providers", "Bakit ang mga provider na ito")}</h3>${S.prov.length ? S.prov.map((p) => `<b>${PROV[p.n][0]}</b><div>✓ ${T("Offers this service", "May ganitong serbisyo")}</div><div>✓ ${T("Covers", "Sakop ang")} ${esc(r.loc)}</div><div>${p.s === "wait" ? "○ " + T("Availability: waiting for provider", "Availability: naghihintay sa provider") : "✓ " + T("Availability: confirmed", "Availability: kumpirmado")}</div>`).join("<hr>") : `<div class="sm">${T("Send a request first.", "Magpadala muna ng request.")}</div>`}</div>
<div class="sm" style="text-align:center">${T("AI suggests. Providers confirm. You decide. This prototype uses simple rules; a real build would use a language model.", "Nagmumungkahi ang AI. Kinukumpirma ng provider. Ikaw ang magpapasya. Simpleng rules lang ito sa prototype.")}</div></div>`;
}

function outcome() {
  if (S.st === 4)
    return `<div class="main"><div class="card" style="text-align:center"><h3>${T("Outcome saved. Thank you!", "Naitala na. Salamat!")}</h3><div class="sm">${T("This helps the community learn where help is needed.", "Nakakatulong ito para malaman kung saan kailangan ng tulong.")}</div><button class="btn" data-a="newreq">${T("Start a new request", "Bagong request")}</button></div></div>`;
  const O = [
    ["Sold", "Naibenta", "check"],
    ["Stored", "Naimbak", "buyer"],
    ["Delivered", "Naihatid", "truck"],
    ["Failed", "Hindi nagtagumpay", ""],
  ];
  return `<div class="main"><div class="h">${T("How did it go?", "Kumusta ang resulta?")}</div><div class="tiles">${O.map(([k, l, i]) => `<button class="tile${k === "Failed" ? " warn" : ""}${S.res === k ? " on" : ""}" data-a="res" data-v="${k}" aria-pressed="${S.res === k}">${i ? ic(i) : ""}${T(k === "Failed" ? "Did not work" : k, l)}</button>`).join("")}</div>
<div class="h">${T("How many kilos were saved?", "Ilang kilo ang nailigtas?")}</div><div class="stp"><button class="ib" data-a="oq" data-v="-1" aria-label="Less">${ic("minus")}</button><b>${S.oq} kg</b><button class="ib f" data-a="oq" data-v="1" aria-label="More">${ic("plus")}</button></div>
<div class="h">${T("Any spoiled?", "May nasira ba?")}</div><div class="two">${[
    ["none", "None", "Wala"],
    ["some", "Some", "Ilan"],
    ["many", "Many", "Marami"],
  ]
    .map(
      ([k, a, b]) =>
        `<button class="tab${S.sp === k ? " on" : ""}" data-a="sp" data-v="${k}">${T(a, b)}</button>`,
    )
    .join("")}</div>
<button class="btn" data-a="saveout">${ic("check")}${T("Save outcome", "I-save ang resulta")}</button></div>`;
}

function tips() {
  const k = S.tr || S.role || "fish",
    L = TIPS[k];
  return `<div class="main"><div class="two"><button class="tab${k === "fish" ? " on" : ""}" data-a="tr" data-v="fish">${T("Fisherfolk", "Mangingisda")}</button><button class="tab${k === "farm" ? " on" : ""}" data-a="tr" data-v="farm">${T("Farmer", "Magsasaka")}</button></div><span class="pill a">${T("Sample reminders · expert review needed", "Halimbawang paalala · kailangan ng expert review")}</span>
${L.map(([i, a, b], j) => `<div class="card"><div class="two" style="align-items:center"><div class="ib" style="border:0;background:var(--soft)">${ic(i)}</div><div style="flex:4"><b>${a}</b><div class="sm">${b}</div></div></div><button class="btn s${S.tips[k + j] ? " t" : ""}" data-a="tip" data-v="${k + j}">${S.tips[k + j] ? "✓ " : ""}${T("Done", "Nagawa na")}</button></div>`).join("")}
<button class="btn" data-a="req">${ic("truck")}${T("Need ice or transport now?", "Kailangan ng yelo o transport?")}</button><div class="sm" style="text-align:center">${T("General reminders only. Not food-safety advice.", "Pangkalahatang paalala lang. Hindi food-safety advice.")}</div></div>`;
}

function prov() {
  const r = S.req.crop
      ? S.req
      : { crop: "Tilapia", qty: 50, loc: "Mercedes", needs: ["Ice", "Transport"], when: "Today" },
    ok = S.pv === "ok";
  return `<div class="main"><div class="card"><b>${T("Your status", "Status mo")}</b><div class="two"><button class="tab${ok ? " on" : ""}" data-a="pv" data-v="ok">${T("Available", "Available")}</button><button class="tab${!ok ? " on" : ""}" data-a="pv" data-v="lim">${T("Limited", "Limitado")}</button></div></div>
<div class="card"><span class="pill a">${T("New request", "Bagong request")}</span><div class="kv">${rows([
    [T("Product", "Produkto"), r.crop],
    [T("Quantity", "Dami"), r.qty + " kg"],
    [T("Place", "Lugar"), r.loc],
    [T("Needs", "Kailangan"), r.needs.join(", ")],
    [T("When", "Kailan"), r.when],
  ])}</div></div>
${S.pvDone === 1 ? `<span class="pill">${ic("check")}${T("Sent. The member can now accept.", "Naipadala. Maaari nang tumanggap ang member.")}</span>` : S.pvDone === 2 ? `<div class="call"><b>${T("Declined", "Tinanggihan")}</b></div>` : `<div class="sm">${T("Confirm only what you can really provide.", "Kumpirmahin lang ang kaya mong ibigay.")}</div><button class="btn" data-a="pconf">${ic("check")}${ok ? T("Confirm available", "Kumpirmahin") : T("Confirm limited supply", "Kumpirmahin (limitado)")}</button><button class="btn gr s" data-a="pdec">${T("Decline", "Tanggihan")}</button>`}
<button class="lnk" data-a="go" data-v="home">${T("Back to member view", "Bumalik sa member view")}</button></div>`;
}

function sheet() {
  const s = S.sheet;
  if (!s) return "";
  let h;
  if (s.t === "acc") {
    const d = PROV[S.prov[s.i].n];
    h = `<h3>${T("Accept this match?", "Tanggapin ito?")}</h3><div class="kv">${rows([
      [T("Provider", "Provider"), d[0]],
      [T("Rate", "Presyo"), d[1]],
      [T("Ready by", "Handa sa"), d[2]],
    ])}</div><button class="btn" data-a="yes" data-v="${s.i}">${ic("check")}${T("Yes, accept", "Oo, tanggapin")}</button><button class="btn gr" data-a="close">${T("Not now", "Hindi muna")}</button><div class="sm">${T("The provider is told. You can still message them.", "Maaabisuhan ang provider. Maaari ka pa ring magmensahe.")}</div>`;
  } else
    h = `<h3>${T("Ask a question", "Magtanong")}</h3>${["Is this still available?", "Can the rate be lower?", "Can you wait a little later?"].map((q) => `<button class="btn o s" data-a="sq">${q}</button>`).join("")}<button class="btn gr s" data-a="close">${T("Cancel", "Kanselahin")}</button>`;
  return `<div class="sheet" data-a="close"><div role="dialog" aria-modal="true" data-stop>${h}</div></div>`;
}

const TT = {
  chat: ["Adaptive Assist", 0],
  guided: ["Guided request", "No internet needed"],
  review: ["Check request", 0],
  matches: ["Your matches", "Providers who can help"],
  ai: ["AI Coordination Engine", "How it was handled"],
  tips: ["Protect your goods", "While you wait"],
  outcome: ["Record outcome", "Tell us how it went"],
  prov: ["FRESHCISION Connect", "For providers"],
};

function R() {
  const s = S.scr,
    F = { home, chat, guided, review, matches, ai, tips, outcome, prov }[s],
    t = TT[s];
  const N = [
    ["home", "Home", "Simula", "home", s === "home"],
    ["req", "Request", "Request", "spark", s === "chat" || s === "guided" || s === "review"],
    ["matches", "Matches", "Mga Match", "truck", ["matches", "ai", "outcome"].includes(s)],
    ["tips", "Tips", "Payo", "leaf", s === "tips"],
  ];
  $("#app").innerHTML =
    (s === "home"
      ? ""
      : `<div class="hdr"><button class="ib" data-a="back" aria-label="Back" style="width:48px;height:48px">${ic("back")}</button><div class="t"><h2>${t[0]}</h2><small>${t[1] || rn()}</small></div>${netBtn()}</div>`) +
    F() +
    `<nav class="nav" aria-label="Main">${N.map(([a, e, f, i, o]) => `<button data-a="${a === "req" ? "req" : "go"}" data-v="${a}"${o ? ' class="on" aria-current="page"' : ""}>${ic(i)}${T(e, f)}</button>`).join("")}</nav>` +
    sheet();
  const m = $(".main");
  if (m && s === "chat") m.scrollTop = m.scrollHeight;
}
