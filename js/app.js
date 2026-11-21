function R_(){
 R.dataset.ts=S.ts;P.dataset.hc=S.hc?'1':'0';R.lang=S.tl?'fil':'en';
 const m=$('#m'),sc=S.scr,ac=$('#act');let act='',dk='';
 const wait=S.prov.filter(p=>p.s==='ok').length;
 $('#top').innerHTML=`<b class="hd logo">FRESHCISION</b><span><button class="mini${S.on?'':' off'}" data-a="sig">${ic('sig')}<span class="lb">${S.on?T('Signal on','May signal'):T('Signal off','Walang signal')}</span></button><button class="mini" data-a="cfg" aria-label="${T('Settings','Mga setting')}">${ic('cfg')}</button></span>`;
 $('#hatch').style.display=S.on?'none':'flex';
 const nv=$('#nav');nv.style.display=['ask','agent','saved','match','tips'].includes(sc)?'flex':'none';
 const cur=sc==='saved'||sc==='agent'?'ask':sc;nv.innerHTML=[['ask',T('Request','Humingi')],['match',T('Replies','Sagot')+(wait?' ('+wait+')':'')],['tips','Tips']].map(([k,l])=>`<button data-a="nav" data-v="${k}"${cur===k?' aria-current="page"':''}>${ic({ask:'req',match:'match',tips:'tips'}[k])}<span>${l}</span></button>`).join('');
 m.className='main'+(sc==='home'?' home':'');
 if(sc==='home'){m.innerHTML=`<div class="hrow"><h1 class="hd">${T('What are you holding today?','Ano ang hawak mo ngayon?')}</h1><button class="mini hlp" data-a="guide">${ic('help')}${T('How do I use this?','Paano ito gamitin?')}</button><button class="chk" role="switch" aria-checked="${S.helper}" data-a="help"><span class="bx">${S.helper?'✓':''}</span>${T('Someone is helping me','May tumutulong sa akin')}</button>${S.helper?`<select id="hw" aria-label="Helper" class="t" style="min-height:52px;border:2px solid var(--ink);border-radius:8px;background:var(--cell);font-size:calc(18px*var(--fs));padding:0 10px">${['Family or friend','Cooperative','Barangay coordinator'].map(h=>`<option${S.hw===h?' selected':''}>${h}</option>`).join('')}</select><button class="chk" role="switch" aria-checked="${S.consent}" data-a="cons"><span class="bx">${S.consent?'✓':''}</span>${T('The owner gave permission','Pumayag ang may-ari')}</button>`:''}<p class="st" style="margin:0">${S.msg}</p></div><div class="split"><button class="half sea" data-a="role" data-v="fish">${SEA}<span class="hd">${T('Sea','Dagat')}</span><small>${T('I catch fish','Mangingisda ako')}</small></button><div class="shore"></div><button class="half land" data-a="role" data-v="farm">${LAND}<span class="hd">${T('Land','Bukid')}</span><small>${T('I grow crops','Magsasaka ako')}</small></button></div>`}
 else if(sc==='ask'){const q=S.edit||nq(),n=[S.r.crop,S.r.qty,S.r.loc,S.need,S.r.when].filter(Boolean).length;
  let h=`<div class="srow"><button class="back" data-a="home">${ic('back')}${T('Back','Bumalik')}</button><div class="step"><span>${q?(['crop','qty','loc','needs','when'].indexOf(q)+1)+'/5':T('Check your slip','Tingnan ang slip')}</span></div></div><div class="rope">${[0,1,2,3,4].map(i=>`<i class="${i<n?'d':''}"></i>`).join('')}</div>${q?'':tags()}`;
  if(q){dk=mkdk();h+=`<div class="q hd">${T(...QT[q])}</div>`;
   if(q==='crop')h+=`<div class="g2">${(S.role==='fish'?['Tilapia','Bangus','Tuna','Other fish']:['Pineapple','Tomato','Banana','Vegetables']).map(c=>`<button class="opt" data-a="set" data-k="crop" data-v="${c}">${c}</button>`).join('')}</div>`;
   if(q==='qty'){h+=`<div class="kv hd" id="kv">${S.r.qty||50} kg</div><input type="range" id="rg" min="5" max="200" step="5" value="${S.r.qty||50}" aria-label="Kilos">`;act=`<button class="go" data-a="qty">${T('Set weight','Itakda ang bigat')}</button>`}
   if(q==='loc')h+=LOCUI();
   if(q==='needs'){h+=`<div class="g1">${['Ice','Transport','Buyer','Processing'].map(c=>`<button class="opt" aria-pressed="${S.r.needs.includes(c)}" data-a="need" data-v="${c}"><span class="bx">${S.r.needs.includes(c)?'✓':''}</span>${S.tl?NL[c]:c}</button>`).join('')}</div>`;act=`<button class="go" data-a="needdone" ${S.r.needs.length?'':'disabled'}>${T('Done','Tapos na')}</button>`}
   if(q==='when')h+=`<div class="g1">${['Today','Tomorrow','This week'].map(c=>`<button class="opt" data-a="set" data-k="when" data-v="${c}">${S.tl?WL[c]:c}</button>`).join('')}</div>`;
   h+=S.on?'':`<p class="fine">${T('No signal. Buttons only. Your request saves on this phone.','Walang signal. Buttons lang. Maiimbak sa phone ang request.')}</p>`;
  }else{h+=`<div class="q hd">${T('Ready to send?','Handa nang ipadala?')}</div><p>${T('Tap any tag above to change it.','I-tap ang alinmang tag sa itaas para baguhin.')}</p>${S.photo?`<p class="fine">${T('A photo is not a freshness check.','Hindi ito pagsusuri kung sariwa.')}</p>`:''}`;act=`<div class="ag"><button class="ghost" data-a="${S.photo?'rmphoto':'cam'}" style="justify-self:start">${ic('cam')}${S.photo?T('Photo added · Remove','May larawan · Alisin'):T('Add a photo (optional)','Magdagdag ng larawan (opsyonal)')}</button><button class="go" data-a="fin">${S.on?T('Send to providers','Ipadala sa providers'):T('Save on this phone','I-save sa phone')}</button></div>`}
  m.innerHTML=h}
 else if(sc==='agent'){
  const bub=(c,t)=>`<div class="bub ${c}">${t}</div>`,EX={fish:'May 50 kilos akong tilapia sa Mercedes. Kailangan ko ng yelo at transport ngayon.',farm:'May 20 kilos akong kamatis sa Daet. Kailangan ko ng mamimili at transport bukas.'}[S.role||'fish'],ready=!nq();
  m.innerHTML=`<div class="srow"><button class="back" data-a="home">${ic('back')}${T('Back','Bumalik')}</button><span class="ahd">${ic('spark')}${T('Assistant','Katulong')}</span></div><div class="chat">${bub('b',T('Hello! Tell me what you have. Tap the big button and speak.','Kumusta! Sabihin mo kung ano ang hawak mo. Pindutin ang malaking button at magsalita.'))}${S.chat.length?'':`<button class="exm" data-a="ex" data-v="${EX}"><small>${T('Tap to try an example','I-tap para subukan')}</small>“${EX}”</button>`}${S.chat.map(c=>bub(c.r==='me'?'me':'b',esc(c.t))).join('')}${S.heard?heardUI():''}</div>`;
  m.scrollTop=m.scrollHeight;
  act=`<div class="ag">${S.typing?`<div class="ti"><input class="t" id="tx" aria-label="${T('Type your request','I-type ang request')}" placeholder="${T('Type here','I-type dito')}"><button class="sendb" data-a="send" aria-label="${T('Send','Ipadala')}">${ic('send')}</button></div>`:''}${ready?`<button class="go" data-a="review">${ic('match')}${T('Check your slip','Tingnan ang slip')}</button>`:`<button class="go mic${S.listening?' live':''}" data-a="voice">${ic('mic')}<span>${S.listening?T('Listening… tap to stop','Nakikinig… pindutin para itigil'):T('Tap and speak','Pindutin at magsalita')}</span></button>`}<div class="ag2"><button class="ghost" data-a="type">${ic('kb')}${T('Type instead','Mag-type na lang')}</button><button class="ghost" data-a="buttons">${T('Use buttons','Gamitin ang buttons')}${ic('arrow')}</button></div></div>`;
  dk=S.chat.length?mkdk():''}
 else if(sc==='sent'){const r=S.r;m.innerHTML=`<div class="fin" role="status">${BIGCK('var(--land)','#fff')}<h1 class="hd">${T('Sent.','Naipadala na.')}</h1><p class="lead">${T('Wait for replies.','Hintayin ang sagot.')}</p><p class="fine">${[r.crop,r.qty&&r.qty+' kg',r.loc].filter(Boolean).join(' · ')}</p><p class="fine">${T('Sent to '+S.prov.length+' provider'+(S.prov.length>1?'s':''),'Ipinadala sa '+S.prov.length+' provider')}</p></div>`;act=`<button class="go" data-a="nav" data-v="match">${ic('match')}${T('See replies','Tingnan ang sagot')}</button>`}
 else if(sc==='saved'){const r=S.r;m.innerHTML=`<div class="fin" role="status">${BIGCK('var(--gold)','var(--ongold)')}<h1 class="hd">${T('Saved.','Naka-save.')}</h1><p class="lead">${T('Will send when there is signal.','Ipapadala kapag may signal.')}</p><span class="sb sw">${ic('clock')}${T('Not sent yet','Hindi pa naipadala')}</span><p class="fine">${[r.crop,r.qty&&r.qty+' kg',r.loc].filter(Boolean).join(' · ')}</p><p class="fine">${T('It sends by itself when signal returns. You can close the app.','Awtomatikong ipapadala kapag may signal. Puwede mong isara ang app.')}</p></div>`;act=`<button class="go o" data-a="sig">${T('Turn signal on (demo)','I-on ang signal (demo)')}</button>`}
 else if(sc==='match'){const r=S.r;if(!S.prov.length){m.innerHTML=`<h1 class="hd" style="font-size:calc(42px*var(--fs))">${T('No request yet.','Wala pang request.')}</h1>`;act=`<button class="go" data-a="nav" data-v="ask">${T('Start a request','Magsimula')}</button>`}
  else{const L={Ice:T('Ice','Yelo'),Transport:'Truck',Buyer:T('Buyer','Mamimili'),Processing:T('Processing','Proseso')},ok=S.prov.filter(p=>p.s!=='w').length,AR=n=>PV[n][2]==='Tomorrow'?T('Arrives tomorrow','Darating bukas'):T('Arrives ','Darating ')+PV[n][2];
  m.innerHTML=`<h1 class="hd" style="font-size:calc(34px*var(--fs))">${r.crop}, ${r.qty} kg, ${r.loc}</h1><p class="lead">${ok?T(ok+' replied. Tap Accept.',ok+' ang sumagot. Pindutin ang Tanggapin.'):T('Waiting for replies…','Hinihintay ang sagot…')}</p>`+S.prov.map((p,i)=>card(p,i,L,AR)).join('')+(S.prov.some(p=>p.s==='acc')?OUT():'')+`<p class="fine">${T('Nothing is final until you tap Accept.','Hindi pa final hangga’t hindi mo pinipindot ang Tanggapin.')}</p><button class="back lk" data-a="prov">${ic('store')}<span>${T('Service provider? Open Connect','Provider? Buksan ang Connect')}</span>${ic('arrow')}</button>`}}
 else if(sc==='tips'){m.innerHTML=`<h1 class="hd" style="font-size:calc(42px*var(--fs))">${T('While you wait','Habang naghihintay')}</h1>`+TIPS[S.role||'fish'].map(t=>`<div class="tip"><b>${S.tl?t[1]:t[0]}</b><span>${S.tl?t[0]:t[1]}</span></div>`).join('')}
 else if(sc==='prov'){m.innerHTML=`<button class="back" data-a="nav" data-v="match">${ic('back')}${T('Back','Bumalik')}</button><h1 class="hd" style="font-size:calc(40px*var(--fs))">FRESHCISION Connect</h1><p class="fine">${T('Incoming request near Mercedes','May request malapit sa Mercedes')}</p><div class="slip"><div class="sh"><b class="hd">${T('Request slip','Slip ng request')}</b><span>No. 0147</span></div>${rc([[T('Product','Produkto'),'Tilapia'],[T('Weight','Bigat'),'50 kg'],[T('Help','Tulong'),T('Ice','Yelo')],[T('When','Kailan'),T('Today afternoon','Ngayong hapon')]])}${S.photo?`<img class="pth" src="${S.photo}" alt=""><p class="fine">${T('Photo is not a freshness check.','Hindi ito pagsusuri kung sariwa.')}</p>`:''}${WM}</div>${S.pv?`<span class="stamp hd" style="align-self:flex-start">${S.pv==='y'?T('Can supply','Kaya ko'):T('Declined','Hindi kaya')}</span>`:''}`;act=S.pv?'':`<button class="go" data-a="pv" data-v="y">${T('I can supply','Kaya ko')}</button><button class="go o" data-a="pv" data-v="n">${T('I can’t','Hindi kaya')}</button>`}
 $('#dock').innerHTML=dk;$('#dock').className=dk?'on':'';ac.innerHTML=act;ac.className='act'+(act?' on':'');RU();ROV()}
function go(skip){S.saved=false;S.prov=S.r.needs.map(n=>({n,s:'w'}));S.scr=skip?'match':'sent';tm.forEach(clearTimeout);S.prov.forEach((p,i)=>tm.push(setTimeout(()=>{p.s='ok';if(S.scr==='match'||S.scr==='tips')R_()},1100*(i+1))));R_()}
function say(text,voice){text=(text||'').trim();if(!text)return;S.heard=null;const bf=JSON.stringify(S.r);S.chat.push({r:'me',t:text});interpret(text);S.edit='';const ch=bf!==JSON.stringify(S.r),q=nq();let t;
 if(!ch)t=(voice?T('I heard: “','Narinig ko: “'):T('I read: “','Nabasa ko: “'))+text+T('”, but I could not find the details. Say it again, or use buttons.','”, pero hindi ko makuha ang detalye. Ulitin mo, o gamitin ang buttons.');
 else{const r=S.r,got=[r.crop,r.qty&&r.qty+' kg',r.loc,S.need&&r.needs.map(n=>S.tl?NL[n]:n).join(', '),r.when&&(S.tl?WL[r.when]:r.when)].filter(Boolean).join(', ');t=T('Got it: ','Nakuha ko: ')+got+'. '+(q?T(...QT[q]):T('That is everything. Check your slip.','Iyan na lahat. Tingnan ang slip.'))}
 S.chat.push({r:'bot',t});R_()}
function voice(){const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SR){S.chat.push({r:'bot',t:T('Voice is not available here. Type or use buttons.','Walang boses dito. Mag-type o gamitin ang buttons.')});return R_()}
 if(S.listening){try{S.rec.stop()}catch(e){}return}
 try{const r=new SR();S.rec=r;r.lang='fil-PH';r.onresult=e=>heard(e.results[0][0]);r.onerror=verr;r.onend=()=>{S.listening=false;R_()};r.start();S.listening=true}catch(e){S.chat.push({r:'bot',t:T('Voice is not available here.','Walang boses dito.')})}R_()}
P.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,v=b.dataset.v;if(!KEEP.includes(a))clrU();
 if(a==='lang'){S.tl=!S.tl;savePrefs()}
 else if(a==='sig'){S.on=!S.on;if(!S.on){if(S.rec)try{S.rec.stop()}catch(e){}if(S.scr==='agent')S.scr='ask'}if(S.on&&S.saved)return go()}
 else if(a==='help'){S.helper=!S.helper;if(!S.helper)S.consent=false;S.msg=''}
 else if(a==='cons'){S.consent=!S.consent;S.msg=''}
 else if(a==='role'){if(S.helper&&!S.consent){S.msg=T('Ask the owner for permission first.','Hingin muna ang pahintulot ng may-ari.');return R_()}S.role=v;S.msg='';S.btn=false;S.chat=[];S.scr=S.on?'agent':'ask'}
 else if(a==='home'){S.scr='home';S.r=E();S.need=false;S.edit='';S.typing=false;S.dock=false;S.chat=[];S.btn=false;S.photo='';S.contact={name:'',phone:'',addr:'',shared:false};S.cf=-1;S.out={res:'',kg:0,saved:false};S.q='';S.near=null;S.nst='';S.heard=null;S.warn=[]}
 else if(a==='nav')S.scr=v==='ask'?(S.saved?'saved':(S.on&&!S.btn?'agent':'ask')):v;
 else if(a==='buttons'||a==='review'){S.btn=true;S.scr='ask'}
 else if(a==='ex')return say(v);
 else if(a==='dock')S.dock=!S.dock;
 else if(a==='cam'){$('#cam').click();return}
 else if(a==='rmphoto')S.photo='';
 else if(a==='cf')S.cf=+b.dataset.i;
 else if(a==='cshare'){const c=S.contact;if(c.name||c.phone||c.addr)c.shared=true;S.cf=-1}
 else if(a==='cskip')S.cf=-1;
 else if(a==='res')S.out.res=v;
 else if(a==='kg')S.out.kg=Math.max(0,S.out.kg+ +v);
 else if(a==='saveout'){if(S.out.res)S.out.saved=true}
 else if(a==='edit'){S.edit=b.dataset.k;S.scr='ask';S.dock=false}
 else if(a==='set'){const sn=snap(),k=b.dataset.k;U(T('Set: ','Naitakda: ')+(k==='when'&&S.tl?WL[v]:v),()=>restore(sn));S.r[k]=v;S.edit='';if(k==='loc'){S.q='';S.near=null;S.nst=''}}
 else if(a==='qty'){const sn=snap();U(T('Weight set: ','Bigat: ')+$('#rg').value+' kg',()=>restore(sn));S.r.qty=+$('#rg').value;S.edit=''}
 else if(a==='need'){const n=S.r.needs,i=n.indexOf(v);i<0?n.push(v):n.splice(i,1)}
 else if(a==='needdone'){const sn=snap();U(T('Help: ','Tulong: ')+S.r.needs.map(x=>S.tl?NL[x]:x).join(', '),()=>restore(sn));S.need=true;S.edit=''}
 else if(a==='type')S.typing=!S.typing;
 else if(a==='voice')return voice();
 else if(a==='send'){const x=$('#tx');return say(x&&x.value)}
 else if(a==='fin'){const w=checks();if(w.length){S.warn=w;S.ov='warn';return R_()}return fin()}
 else if(a==='acc'){const i=+b.dataset.i,n=S.prov[i].n;U(T('Accepted: ','Tinanggap: ')+(S.tl?NL[n]:n),()=>{S.prov[i].s='ok'});S.prov[i].s='acc'}
 else if(a==='prov'){S.pv='';S.scr='prov'}
 else if(a==='pv')S.pv=v;
 else if(a==='undo')doUndo();
 else if(a==='cfg')S.ov='cfg';
 else if(a==='ovx')closeOv();
 else if(a==='guide'){S.ov='guide';S.gs=0}
 else if(a==='gnext'){if(S.gs>=2)closeOv();else S.gs++}
 else if(a==='gback')S.gs=Math.max(0,S.gs-1);
 else if(a==='gskip')closeOv();
 else if(a==='setlang'){S.tl=v==='fil';savePrefs()}
 else if(a==='ts'){S.ts=v;savePrefs()}
 else if(a==='hc'){S.hc=v==='1';savePrefs()}
 else if(a==='near')return locate();
 else if(a==='allt')S.near=null;
 else if(a==='wgo'){S.ov='';S.warn=[];return fin()}
 else if(a==='wfix'){S.edit=S.warn[0].k;S.ov='';S.warn=[]}
 else if(a==='hyes'){const h=S.heard;S.heard=null;if(h&&h.ch)return say(h.t,true);S.chat.push({r:'me',t:h?h.t:''},{r:'bot',t:T('Thanks. I could not find the details, so let us use the buttons.','Salamat. Hindi ko makuha ang detalye, kaya gamitin natin ang buttons.')})}
 else if(a==='hno'){S.heard=null;S.chat.push({r:'bot',t:T('Okay, say it again. Speak slowly and close to the phone.','Sige, ulitin mo. Dahan-dahan at lapit sa phone.')})}
 R_();if(a==='type'&&S.typing){const t=$('#tx');t&&t.focus()}});
P.addEventListener('keydown',e=>{if(e.key==='Escape'&&S.ov){e.preventDefault();closeOv();R_();return}if(e.key==='Enter'&&e.target.id==='tx'){e.preventDefault();say(e.target.value)}});
P.addEventListener('input',e=>{const id=e.target.id,v=e.target.value;if(id==='rg')$('#kv').textContent=v+' kg';else if(id==='cn')S.contact.name=v;else if(id==='cp')S.contact.phone=v;else if(id==='ca')S.contact.addr=v;else if(id==='ok')S.out.kg=Math.max(0,+v||0);else if(id==='ts'){S.q=v;$('#tl').innerHTML=TWN()}});
P.addEventListener('change',e=>{if(e.target.id==='hw')S.hw=e.target.value;if(e.target.id==='cam'&&e.target.files[0]){S.photo=URL.createObjectURL(e.target.files[0]);e.target.value='';R_()}});
function demo(k){S.role='fish';tm.forEach(clearTimeout);if(k==='agent'){S.r=E();S.need=false;S.edit='';S.prov=[];S.chat=[];S.btn=false;S.on=true;S.scr='agent';return R_()}if(k==='home'){S.scr='home';S.r=E();S.need=false;S.edit='';S.prov=[]}else{S.r={crop:'Tilapia',qty:50,loc:'Mercedes',needs:['Ice','Transport','Buyer'],when:'Today'};S.need=true;if(k==='ask'){S.edit='qty';S.scr='ask'}else{S.edit='';go(true);return}}R_()}
$('.tg').addEventListener('click',e=>{const b=e.target.closest('[data-s]');if(!b)return;if(b.dataset.s==='guide'){S.scr='home';S.ov='guide';S.gs=0;return R_()}demo(b.dataset.s)});
if(!S.seen){S.ov='guide';S.gs=0}
R_();