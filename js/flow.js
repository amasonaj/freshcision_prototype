/* FLOW: creating providers, submitting and sending requests, voice */

function mkProv() {
  S.prov = S.req.needs.map((n, i) => ({ n, s: i ? "wait" : "ok" }));
  S.st = 2;
  S.shared = 0;
  S.acc = 0;
}

function submit() {
  if (nextQ()) {
    toast(T("Please complete all details first.", "Kumpletuhin muna ang lahat ng detalye."));
    return;
  }
  if (!S.on) {
    S.saved = true;
    try {
      localStorage.setItem("fresh-draft", JSON.stringify(S.req));
    } catch (e) {}
    toast(T("Saved on this device. Not sent yet.", "Naka-save sa device. Hindi pa naipapadala."));
    R();
    return;
  }
  sendNow();
}

function mic() {
  const C = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!C) {
    toast(T("Voice not supported here. Please type.", "Hindi gumagana ang boses dito. Mag-type na lang."));
    return;
  }
  const r = new C();
  r.lang = "fil-PH";
  r.onresult = (e) => send(e.results[0][0].transcript);
  r.onerror = () => toast(T("Could not hear you. Try again.", "Hindi narinig. Subukan ulit."));
  r.start();
  toast(T("Listening…", "Nakikinig…"));
}
