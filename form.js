function togAcc(id){
  const hd=document.querySelector(`#acc-${id} .acc-hd`);
  const bd=document.getElementById(`acbd-${id}`);
  if(!hd||!bd)return;
  const o=hd.classList.contains('open');
  hd.classList.toggle('open',!o);
  bd.classList.toggle('open',!o);
}

function onFld(el,section){
  el.classList.remove('field-error');
  render();
  if(section)validateSection(section);
}

function updateWordCount(el,outId){
  const words=el.value.trim()?el.value.trim().split(/\s+/).length:0;
  const out=document.getElementById(outId);
  if(out){out.textContent=words+' words';out.style.color=words<20?'var(--rose)':words>100?'var(--amber)':'var(--lime)';}
}

function handlePhoto(input){
  const file=input.files[0];
  if(!file)return;
  if(file.size>2097152){toast('Photo must be under 2MB','warn');return;}
  const reader=new FileReader();
  reader.onload=e=>{
    S.photoData=e.target.result;
    const av=document.getElementById('photoAvatar');
    if(av)av.innerHTML=`<img class="photo-av-img" src="${e.target.result}" alt="Photo"/>`;
    document.getElementById('photoName').textContent=file.name;
    render();toast('Photo uploaded','success');
  };
  reader.readAsDataURL(file);
}

function buildSkCatEl(id,label,tags=[]){
  S.skCats[id]={label,tags:[...tags]};
  const wrap=document.createElement('div');
  wrap.className='sk-cat';wrap.id='skcat_'+id;
  wrap.innerHTML=`<div class="sk-cat-hd"><span class="sk-cat-lbl" contenteditable="true" spellcheck="false" oninput="S.skCats['${id}'].label=this.textContent.trim();render()">${esc(label)}</span><button class="tbtn tbtn-rose tbtn-xs" onclick="removeSkCat('${id}')">✕ Remove</button></div><div class="sk-cat-body"><div class="sk-tags" id="sktags_${id}">${tags.map(t=>`<span class="sk-tag">${esc(t)}<button class="sk-tag-rm" onclick="removeSkTag('${id}','${t.replace(/'/g,"\\'")}')">×</button></span>`).join('')}<input class="sk-inp" placeholder="Type skill + Enter" onkeydown="skInpKey(event,'${id}')" id="skinp_${id}"/></div></div>`;
  return wrap;
}

function addSkCat(){
  const id='cat_'+Date.now();
  const el=buildSkCatEl(id,'New Category',[]);
  document.getElementById('skillWrap').appendChild(el);
  setTimeout(()=>{const lbl=el.querySelector('.sk-cat-lbl');if(lbl){lbl.focus();const r=document.createRange();const s=window.getSelection();r.selectNodeContents(lbl);s.removeAllRanges();s.addRange(r);}},50);
  render();
}

function removeSkCat(id){
  delete S.skCats[id];
  const el=document.getElementById('skcat_'+id);
  if(el)el.remove();
  render();
}

function skInpKey(e,catId){
  if(e.key==='Enter'||e.key===','){
    e.preventDefault();
    const v=e.target.value.replace(/,/g,'').trim();
    if(!v)return;
    if(!S.skCats[catId])S.skCats[catId]={label:'',tags:[]};
    if(!S.skCats[catId].tags.includes(v)){
      S.skCats[catId].tags.push(v);
      const tagsEl=document.getElementById('sktags_'+catId);
      const inp=document.getElementById('skinp_'+catId);
      const tag=document.createElement('span');
      tag.className='sk-tag';
      tag.innerHTML=`${esc(v)}<button class="sk-tag-rm" onclick="removeSkTag('${catId}','${v.replace(/'/g,"\\'")}')">×</button>`;
      tagsEl.insertBefore(tag,inp);
      inp.value='';
      render();updateCounts();
    }else{e.target.value='';}
  }
  if(e.key==='Backspace'&&!e.target.value){
    if(S.skCats[catId]&&S.skCats[catId].tags.length){
      const last=S.skCats[catId].tags.pop();
      const tagsEl=document.getElementById('sktags_'+catId);
      const tags=tagsEl.querySelectorAll('.sk-tag');
      if(tags.length)tags[tags.length-1].remove();
      render();updateCounts();
    }
  }
}

function removeSkTag(catId,tag){
  if(!S.skCats[catId])return;
  S.skCats[catId].tags=S.skCats[catId].tags.filter(t=>t!==tag);
  const tagsEl=document.getElementById('sktags_'+catId);
  if(tagsEl){
    tagsEl.querySelectorAll('.sk-tag').forEach(el=>{if(el.textContent.replace('×','').trim()===tag)el.remove();});
  }
  render();updateCounts();
}

function addExp(){
  C.ex++;const id=C.ex;S.exps.push(id);
  const list=document.getElementById('expList');
  const el=document.createElement('div');
  el.className='entry-card';el.id='exp_'+id;
  el.innerHTML=`<div class="entry-card-head"><span class="entry-num">EXP #${id}</span><button class="tbtn tbtn-rose tbtn-xs" onclick="removeEntry('exp',${id},S.exps)">✕ Remove</button></div><div class="fr"><div class="fg"><label class="fl">Company / Organization</label><input id="ec_${id}" placeholder="Stripe" oninput="render()"/></div><div class="fg"><label class="fl">Role / Title</label><input id="er_${id}" placeholder="Software Engineer" oninput="render()"/></div></div><div class="fr"><div class="fg"><label class="fl">Duration</label><input id="ed_${id}" placeholder="Jan 2023 – Present" oninput="render()"/></div><div class="fg"><label class="fl">Location <span class="fl-opt">(opt)</span></label><input id="el_${id}" placeholder="Remote" oninput="render()"/></div></div><div class="fg"><label class="fl">Bullet Points</label><textarea id="eb_${id}" placeholder="• Led a team of 5 engineers to ship…&#10;• Reduced load time by 40% via…" oninput="render()"></textarea><div class="hint">Start each line with • for bullets. Use metrics (%, $, time, scale).</div></div>`;
  list.appendChild(el);updateCounts();
}

function addProj(){
  C.pr++;const id=C.pr;S.projs.push(id);
  const list=document.getElementById('projList');
  const el=document.createElement('div');
  el.className='entry-card';el.id='proj_'+id;
  el.innerHTML=`<div class="entry-card-head"><span class="entry-num">PROJECT #${id}</span><button class="tbtn tbtn-rose tbtn-xs" onclick="removeEntry('proj',${id},S.projs)">✕ Remove</button></div><div class="fr"><div class="fg"><label class="fl">Project Name</label><input id="pn_${id}" placeholder="MyApp Dashboard" oninput="render()"/></div><div class="fg"><label class="fl">Tech Stack</label><input id="ps_${id}" placeholder="React, Node.js, PostgreSQL" oninput="render()"/></div></div><div class="fg"><label class="fl">URL / GitHub <span class="fl-opt">(opt)</span></label><input id="pu_${id}" placeholder="https://github.com/..." oninput="render()"/></div><div class="fg"><label class="fl">Description</label><textarea id="pd_${id}" placeholder="• Built a real-time dashboard with…&#10;• 500+ GitHub stars, 200 monthly users" oninput="render()"></textarea></div>`;
  list.appendChild(el);updateCounts();
}

function addEdu(){
  C.ed++;const id=C.ed;S.edus.push(id);
  const list=document.getElementById('eduList');
  const el=document.createElement('div');
  el.className='entry-card';el.id='edu_'+id;
  el.innerHTML=`<div class="entry-card-head"><span class="entry-num">EDUCATION #${id}</span><button class="tbtn tbtn-rose tbtn-xs" onclick="removeEntry('edu',${id},S.edus)">✕ Remove</button></div><div class="fr"><div class="fg"><label class="fl">School / University</label><input id="es_${id}" placeholder="MIT" oninput="onFld(this,'edu')"/></div><div class="fg"><label class="fl">Degree</label><input id="eg_${id}" placeholder="B.S. Computer Science" oninput="render()"/></div></div><div class="fr"><div class="fg"><label class="fl">Year</label><input id="ey_${id}" placeholder="2019–2023" oninput="render()"/></div><div class="fg"><label class="fl">Grade / GPA <span class="fl-opt">(opt)</span></label><input id="egd_${id}" placeholder="3.9 GPA / First Class" oninput="render()"/></div></div><div class="fg"><label class="fl">Relevant Coursework <span class="fl-opt">(opt)</span></label><input id="eco_${id}" placeholder="Algorithms, OS, Databases" oninput="render()"/></div>`;
  list.appendChild(el);updateCounts();
}

function addCert(){
  C.ce++;const id=C.ce;S.certs.push(id);
  const list=document.getElementById('certList');
  const el=document.createElement('div');
  el.className='entry-card';el.id='cert_'+id;
  el.innerHTML=`<div class="entry-card-head"><span class="entry-num">CERT #${id}</span><button class="tbtn tbtn-rose tbtn-xs" onclick="removeEntry('cert',${id},S.certs)">✕ Remove</button></div><div class="fr"><div class="fg"><label class="fl">Certification Name</label><input id="cn_${id}" placeholder="AWS Solutions Architect" oninput="render()"/></div><div class="fg"><label class="fl">Issuing Organization</label><input id="ci_${id}" placeholder="Amazon Web Services" oninput="render()"/></div></div><div class="fr"><div class="fg"><label class="fl">Date</label><input id="cd_${id}" placeholder="Nov 2024" oninput="render()"/></div><div class="fg"><label class="fl">Credential ID <span class="fl-opt">(opt)</span></label><input id="cid_${id}" placeholder="AWS-12345" oninput="render()"/></div></div>`;
  list.appendChild(el);updateCounts();
}

function addAch(){
  C.ac++;const id=C.ac;S.achs.push(id);
  const list=document.getElementById('achList');
  const el=document.createElement('div');
  el.className='entry-card';el.id='ach_'+id;
  el.innerHTML=`<div class="entry-card-head"><span class="entry-num">ACHIEVEMENT #${id}</span><button class="tbtn tbtn-rose tbtn-xs" onclick="removeEntry('ach',${id},S.achs)">✕ Remove</button></div><div class="fr"><div class="fg"><label class="fl">Title</label><input id="at_${id}" placeholder="1st Place — Hackathon 2024" oninput="render()"/></div><div class="fg"><label class="fl">Date</label><input id="ad_${id}" placeholder="Oct 2024" oninput="render()"/></div></div><div class="fg"><label class="fl">Description <span class="fl-opt">(opt)</span></label><textarea id="ab_${id}" rows="2" placeholder="Brief description of the achievement and its impact" oninput="render()"></textarea></div>`;
  list.appendChild(el);updateCounts();
}

function addLang(){
  C.la++;const id=C.la;S.langs.push(id);
  const list=document.getElementById('langList');
  const el=document.createElement('div');
  el.className='entry-card';el.id='lang_'+id;
  el.innerHTML=`<div class="entry-card-head"><span class="entry-num">LANGUAGE #${id}</span><button class="tbtn tbtn-rose tbtn-xs" onclick="removeEntry('lang',${id},S.langs)">✕ Remove</button></div><div class="fr"><div class="fg"><label class="fl">Language</label><input id="ln_${id}" placeholder="Spanish" oninput="render()"/></div><div class="fg"><label class="fl">Proficiency</label><select id="ll_${id}" onchange="render()"><option value="">Select level</option><option>Native</option><option>Fluent</option><option>Professional</option><option>Conversational</option><option>Basic</option></select></div></div>`;
  list.appendChild(el);updateCounts();
}

function removeEntry(type,id,arr){
  const idx=arr.indexOf(id);
  if(idx>-1)arr.splice(idx,1);
  const el=document.getElementById(type+'_'+id);
  if(el){el.style.opacity='0';el.style.transform='translateY(-6px)';setTimeout(()=>el.remove(),150);}
  updateCounts();render();
}

function updateCounts(){
  const badges={exp:S.exps.length,proj:S.projs.length,edu:S.edus.length,cert:S.certs.length,ach:S.achs.length,lang:S.langs.length};
  Object.entries(badges).forEach(([k,v])=>{const el=document.getElementById(k+'CountBadge');if(el)el.textContent=v>0?`(${v})`:'';});
  const total=Object.values(S.skCats).reduce((acc,c)=>acc+(c.tags?c.tags.length:0),0);
  const sb=document.getElementById('skillCountBadge');
  if(sb)sb.textContent=total>0?`(${total})`:'';
}

function validateSection(id){
  const checks={
    basics:()=>{const n=gv('f-name'),e=gv('f-email');if(!n||!e)return'fail';return'pass';},
    summary:()=>{const s=gv('f-summary');if(!s)return'fail';const w=s.trim().split(/\s+/).length;return w<20?'warn':'pass';},
    skills:()=>{const total=Object.values(S.skCats).reduce((a,c)=>a+(c.tags?c.tags.length:0),0);return total<3?'warn':total>=5?'pass':'warn';},
    exp:()=>S.exps.length===0?'warn':S.exps.length>=1?'pass':'warn',
    edu:()=>S.edus.length===0?'warn':'pass',
  };
  const fn=checks[id];if(!fn)return;
  const result=fn();
  const badge=document.getElementById('vbadge-'+id);
  if(!badge)return;
  const labels={pass:'✓ Complete',warn:'⚠ Incomplete',fail:'✕ Required'};
  badge.className='acc-valid '+result;
  badge.textContent=labels[result]||'';
}

function validateAll(){['basics','summary','skills','exp','edu'].forEach(validateSection);}
