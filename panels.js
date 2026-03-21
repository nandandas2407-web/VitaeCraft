function openOvl(id){document.getElementById(id).classList.add('open');}
function closeOvl(id){document.getElementById(id).classList.remove('open');}
function openAtsPanel(){openOvl('ovlAts');}
function openJdPanel(){openOvl('ovlJd');}
function openSnapPanel(){openOvl('ovlSnap');renderSnaps();}
function openImprovePanel(){openOvl('ovlImprove');}

document.addEventListener('click',e=>{
  ['ovlAts','ovlJd','ovlSnap','ovlImprove'].forEach(id=>{
    const el=document.getElementById(id);
    if(el&&e.target===el)closeOvl(id);
  });
});

function runAts(){
  const name=gv('f-name'),email=gv('f-email'),summary=gv('f-summary');
  const totalSkills=Object.values(S.skCats).reduce((a,c)=>a+(c.tags?c.tags.length:0),0);
  const hasExp=S.exps.length>0,hasEdu=S.edus.length>0;
  const allBullets=S.exps.map(id=>gv('eb_'+id)).join('\n');
  const bulletLines=allBullets.split('\n').filter(l=>l.trim()).length;
  const hasMetrics=/\d+%|\$\d+|\d+x|\d+\s*(users|stars|people|engineers|months|years|ms|req)/i.test(allBullets+gv('f-summary'));
  const hasCerts=S.certs.length>0,hasAch=S.achs.length>0;

  const gateNote=document.getElementById('atsGateNote');
  if(!name||!email){gateNote.textContent='⚠ Add your name and email before analyzing.';gateNote.classList.add('show');return;}
  gateNote.classList.remove('show');

  const cats=[
    {name:'Contact Info',pts:name&&email?15:name||email?8:0,max:15},
    {name:'Summary / Profile',pts:summary?(summary.split(/\s+/).length>=30?15:10):0,max:15},
    {name:'Skills Section',pts:totalSkills>=8?15:totalSkills>=4?10:totalSkills>=1?5:0,max:15},
    {name:'Work Experience',pts:hasExp?bulletLines>=4?20:bulletLines>=2?14:8:0,max:20},
    {name:'Quantified Metrics',pts:hasMetrics?10:0,max:10},
    {name:'Education',pts:hasEdu?10:2,max:10},
    {name:'Certifications',pts:hasCerts?5:0,max:5},
    {name:'Achievements',pts:hasAch?5:2,max:5},
    {name:'Format Safety',pts:S.atsMode?5:3,max:5},
  ];

  const total=cats.reduce((a,c)=>a+c.pts,0);
  const max=cats.reduce((a,c)=>a+c.max,0);
  const pct=Math.round((total/max)*100);

  const numEl=document.getElementById('atsBigNum');
  const subEl=document.getElementById('atsBigSub');
  numEl.textContent=pct;
  numEl.style.color=pct>=80?'var(--lime)':pct>=60?'var(--amber)':'var(--rose)';
  subEl.textContent=pct>=80?'Excellent — ATS-ready':pct>=60?'Good — a few improvements needed':'Needs work — follow suggestions below';

  const catsEl=document.getElementById('atsCats');
  catsEl.innerHTML=cats.map(c=>{
    const p=Math.round((c.pts/c.max)*100);
    const color=p>=80?'var(--lime)':p>=50?'var(--amber)':'var(--rose)';
    return`<div class="ats-cat-row"><span class="ats-cat-name">${c.name}</span><div class="ats-cat-bar"><div class="ats-cat-fill" style="width:${p}%;background:${color}"></div></div><span class="ats-cat-pts" style="color:${color}">${c.pts}/${c.max}</span></div>`;
  }).join('');

  const sugs=[];
  if(!name||!email)sugs.push({t:'crit',msg:'Missing name or email — critical for ATS parsing'});
  if(!summary)sugs.push({t:'warn',msg:'Add a 2–4 sentence professional summary to improve by up to 15 points'});
  else if(summary.split(/\s+/).length<30)sugs.push({t:'warn',msg:'Your summary is short. Aim for 40–70 words with key qualifications'});
  if(totalSkills<8)sugs.push({t:'warn',msg:`Add more skills (${totalSkills}/8+). Target 8–16 relevant skills across categories`});
  if(!hasExp)sugs.push({t:'crit',msg:'No work experience found — add at least one role'});
  else if(bulletLines<3)sugs.push({t:'warn',msg:'Add more bullet points with specific results (aim for 3+ per role)'});
  if(!hasMetrics)sugs.push({t:'warn',msg:'Include quantified metrics: %, $, number of users, time saved, etc.'});
  if(!hasEdu)sugs.push({t:'info',msg:'Add your education — most ATS systems require it'});
  if(!hasCerts)sugs.push({t:'info',msg:'Certifications boost your score. Add any relevant ones'});
  if(!S.atsMode)sugs.push({t:'info',msg:'Enable ATS Mode (top bar) for the cleanest text output when submitting'});
  if(pct>=80)sugs.push({t:'ok',msg:'Your resume is well-structured and ATS-ready. Keep tailoring for each role.'});

  const icons={ok:'✅',warn:'⚠️',info:'ℹ️',crit:'🚨'};
  document.getElementById('sugList').innerHTML=sugs.map(s=>`<div class="sug sug-${s.t}">${icons[s.t]} ${s.msg}</div>`).join('');
}

function runJdMatch(){
  const jd=document.getElementById('jdTa').value.trim().toLowerCase();
  if(!jd){toast('Paste a job description first','warn');return;}
  const resumeText=[gv('f-name'),gv('f-title'),gv('f-summary'),
    ...Object.values(S.skCats).flatMap(c=>c.tags||[]),
    ...S.exps.map(id=>gv('ec_'+id)+' '+gv('er_'+id)+' '+gv('eb_'+id)),
    ...S.projs.map(id=>gv('pn_'+id)+' '+gv('ps_'+id)+' '+gv('pd_'+id)),
  ].join(' ').toLowerCase();

  const stopWords=new Set(['the','a','an','and','or','but','in','on','at','to','for','of','with','is','are','was','were','be','been','that','this','it','as','by','from','have','has','will','can','we','you','our','your','their','which','who']);
  const jdWords=[...new Set(jd.split(/\W+/).filter(w=>w.length>3&&!stopWords.has(w)))];
  const found=[],missing=[];
  jdWords.forEach(w=>{if(resumeText.includes(w))found.push(w);else missing.push(w);});

  const pct=jdWords.length?Math.round((found.length/jdWords.length)*100):0;
  const color=pct>=70?'var(--lime)':pct>=45?'var(--amber)':'var(--rose)';

  document.getElementById('jdResults').innerHTML=`<div class="match-row"><div class="match-pct" style="color:${color}">${pct}%</div><div><div style="font-size:13px;font-weight:700;color:var(--fg)">Keyword Match</div><div style="font-size:11px;color:var(--fg3)">Based on ${jdWords.length} unique keywords</div></div></div><div style="font-size:11px;font-weight:700;color:var(--fg3);margin-bottom:6px;text-transform:uppercase;letter-spacing:1px">Present in your resume</div><div class="kw-row">${found.slice(0,30).map(w=>`<span class="kw kw-y">✓ ${w}</span>`).join('')}</div><div style="font-size:11px;font-weight:700;color:var(--fg3);margin:12px 0 6px;text-transform:uppercase;letter-spacing:1px">Missing keywords</div><div class="kw-row">${missing.slice(0,30).map(w=>`<span class="kw kw-n">✕ ${w}</span>`).join('')}</div>`;
}

function saveSnap(){
  const name=document.getElementById('snapNameInp').value.trim();
  if(!name){toast('Enter a snapshot name','warn');return;}
  try{
    const snaps=JSON.parse(localStorage.getItem(SNAP_KEY)||'[]');
    const state=localStorage.getItem(STATE_KEY)||'{}';
    snaps.unshift({name,date:new Date().toLocaleString(),state});
    if(snaps.length>20)snaps.pop();
    localStorage.setItem(SNAP_KEY,JSON.stringify(snaps));
    document.getElementById('snapNameInp').value='';
    renderSnaps();
    toast('Snapshot saved: '+name,'success');
  }catch(e){toast('Save failed','error');}
}

function renderSnaps(){
  const snaps=JSON.parse(localStorage.getItem(SNAP_KEY)||'[]');
  const list=document.getElementById('snapList');
  if(!snaps.length){list.innerHTML='<div style="font-size:12px;color:var(--fg3);text-align:center;padding:20px">No snapshots yet. Save one above.</div>';return;}
  list.innerHTML=snaps.map((s,i)=>`<div class="snap-item"><div><div class="snap-name">${esc(s.name)}</div><div class="snap-date">${s.date}</div></div><div class="snap-btns"><button class="tbtn tbtn-dark tbtn-xs" onclick="loadSnap(${i})">Restore</button><button class="tbtn tbtn-rose tbtn-xs" onclick="deleteSnap(${i})">✕</button></div></div>`).join('');
}

function loadSnap(i){
  if(!confirm('Restore this snapshot? Current work will be replaced.'))return;
  try{
    const snaps=JSON.parse(localStorage.getItem(SNAP_KEY)||'[]');
    if(!snaps[i])return;
    localStorage.setItem(STATE_KEY,snaps[i].state);
    closeOvl('ovlSnap');
    location.reload();
  }catch(e){toast('Restore failed','error');}
}

function deleteSnap(i){
  if(!confirm('Delete this snapshot?'))return;
  try{
    const snaps=JSON.parse(localStorage.getItem(SNAP_KEY)||'[]');
    snaps.splice(i,1);
    localStorage.setItem(SNAP_KEY,JSON.stringify(snaps));
    renderSnaps();
    toast('Snapshot deleted','success');
  }catch(e){}
}

async function runImprove(){
  const bullet=document.getElementById('bulletInp').value.trim();
  if(!bullet){toast('Paste a bullet point first','warn');return;}
  const out=document.getElementById('improveOut');
  out.innerHTML='<div style="color:var(--fg3);font-size:12px;text-align:center;padding:16px">✨ Generating improvements…</div>';
  out.classList.add('show');
  try{
    const resp=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:`You are a professional resume coach. Rewrite the following resume bullet point into 3 improved versions. Each version should be stronger, more specific, and ideally include quantified metrics or results. Return ONLY a JSON array of 3 strings with no other text, preamble, or markdown:\n\n"${bullet}"`}]})});
    const data=await resp.json();
    const txt=data.content?.[0]?.text||'[]';
    const cleaned=txt.replace(/```json|```/g,'').trim();
    const versions=JSON.parse(cleaned);
    out.innerHTML='<div style="font-size:11px;font-weight:700;color:var(--violet);text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px;font-family:var(--f)">✨ Improved Versions</div><div class="bv-list">'+versions.map((v,i)=>`<div class="bv" onclick="copyBullet(this)"><div class="bvl">Version ${i+1}</div>${esc(v)}</div>`).join('')+'</div>';
  }catch(e){out.innerHTML='<div style="color:var(--rose);font-size:12px;padding:12px">Failed to generate improvements. Please try again.</div>';}
}

function copyBullet(el){
  const txt=el.textContent.replace(/^Version \d+/,'').trim();
  navigator.clipboard.writeText(txt).then(()=>toast('Copied to clipboard!','success')).catch(()=>{});
}
