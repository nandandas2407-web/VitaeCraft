function esc(s){return(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function fmtBullets(text){
  if(!text)return'';
  const lines=text.split('\n').filter(l=>l.trim());
  if(lines.length===0)return'';
  const hasBullets=lines.some(l=>/^[•\-\*]/.test(l.trim()));
  if(hasBullets){
    return'<ul class="rv-bullets">'+lines.map(l=>{const t=l.replace(/^[•\-\*]\s*/,'').trim();return t?`<li>${esc(t)}</li>`:''}).join('')+'</ul>';
  }
  return'<ul class="rv-bullets">'+lines.map(l=>`<li>${esc(l.trim())}</li>`).join('')+'</ul>';
}

function contactLine(tpl){
  const parts=[];
  const e=gv('f-email'),p=gv('f-phone'),li=gv('f-li'),gh=gv('f-gh'),loc=gv('f-loc'),web=gv('f-web');
  if(e)parts.push(`<a href="mailto:${esc(e)}">${esc(e)}</a>`);
  if(p)parts.push(esc(p));
  if(li)parts.push(`<a href="https://${esc(li)}" target="_blank">${esc(li)}</a>`);
  if(gh)parts.push(`<a href="https://${esc(gh)}" target="_blank">${esc(gh)}</a>`);
  if(loc)parts.push(esc(loc));
  if(web)parts.push(`<a href="https://${esc(web)}" target="_blank">${esc(web)}</a>`);
  return parts.join('<span style="margin:0 3px;opacity:.4">·</span>');
}

function renderSkillsInline(){
  return Object.values(S.skCats).filter(c=>c.tags&&c.tags.length).map(c=>`<div class="rv-sk-cat"><b>${esc(c.label)}:</b> ${esc(c.tags.join(', '))}</div>`).join('');
}

function renderExps(){
  return S.exps.map(id=>{
    const co=gv('ec_'+id),role=gv('er_'+id),dur=gv('ed_'+id),loc=gv('el_'+id),desc=gv('eb_'+id);
    if(!co&&!role)return'';
    return`<div class="rv-item"><div class="rv-item-head"><span><span class="rv-org">${esc(co)}</span>${loc?` <span class="rv-loc" style="font-size:9pt;color:#888">· ${esc(loc)}</span>`:''}</span><span class="rv-date">${esc(dur)}</span></div><div class="rv-role">${esc(role)}</div>${fmtBullets(desc)}</div>`;
  }).join('');
}

function renderProjs(){
  return S.projs.map(id=>{
    const name=gv('pn_'+id),stack=gv('ps_'+id),url=gv('pu_'+id),desc=gv('pd_'+id);
    if(!name)return'';
    return`<div class="rv-item"><div class="rv-item-head"><span class="rv-org">${url?`<a href="${esc(url)}" class="rv-proj-link" target="_blank">${esc(name)}</a>`:esc(name)}</span>${stack?`<span class="rv-proj-stack">${esc(stack)}</span>`:''}</div>${fmtBullets(desc)}</div>`;
  }).join('');
}

function renderEdus(){
  return S.edus.map(id=>{
    const school=gv('es_'+id),deg=gv('eg_'+id),yr=gv('ey_'+id),grade=gv('egd_'+id),course=gv('eco_'+id);
    if(!school)return'';
    return`<div class="rv-item"><div class="rv-item-head"><span class="rv-org">${esc(school)}</span><span class="rv-date">${esc(yr)}</span></div><div class="rv-role">${esc(deg)}</div>${grade?`<div style="font-size:9.5pt;color:#888;margin-top:1px">${esc(grade)}</div>`:''}${course?`<div style="font-size:9.5pt;color:#888;font-style:italic;margin-top:1px">${esc(course)}</div>`:''}</div>`;
  }).join('');
}

function renderCerts(){
  return S.certs.map(id=>{
    const name=gv('cn_'+id),issuer=gv('ci_'+id),date=gv('cd_'+id),cid=gv('cid_'+id);
    if(!name)return'';
    return`<div class="rv-item"><div class="rv-item-head"><span class="rv-org">${esc(name)}</span><span class="rv-date">${esc(date)}</span></div><div class="rv-role">${esc(issuer)}${cid?` · <span style="font-family:monospace;font-size:9pt">${esc(cid)}</span>`:''}</div></div>`;
  }).join('');
}

function renderAchs(){
  return S.achs.map(id=>{
    const title=gv('at_'+id),date=gv('ad_'+id),desc=gv('ab_'+id);
    if(!title)return'';
    return`<div class="rv-item"><div class="rv-item-head"><span class="rv-org">${esc(title)}</span><span class="rv-date">${esc(date)}</span></div>${desc?`<div style="font-size:10pt;color:#555;margin-top:2px">${esc(desc)}</div>`:''}</div>`;
  }).join('');
}

function renderLangs(){
  const items=S.langs.map(id=>{const n=gv('ln_'+id),l=gv('ll_'+id);return n?`${esc(n)}${l?' ('+esc(l)+')':''}`:''}).filter(Boolean);
  return items.length?`<div style="font-size:10pt">${items.join(' &nbsp;·&nbsp; ')}</div>`:'';
}

function buildResumeHTML(){
  const name=gv('f-name'),title=gv('f-title'),summary=gv('f-summary'),refs=gv('f-refs');
  if(!name&&!title)return`<div class="empty-rv"><div style="font-size:32px">📄</div><div>Fill in your details to see a live preview</div></div>`;
  const showPhoto=document.getElementById('showPhoto')?.checked&&S.photoData;
  const photoTag=showPhoto?`<img class="rv-photo" src="${S.photoData}" alt="Photo"/>` :'';
  const expHTML=renderExps(),projHTML=renderProjs(),eduHTML=renderEdus(),certHTML=renderCerts(),achHTML=renderAchs(),langHTML=renderLangs(),skillHTML=renderSkillsInline();
  const tpl=S.tpl;

  if(tpl==='executive'){
    const sbSkills=Object.values(S.skCats).filter(c=>c.tags&&c.tags.length).map(c=>`<div class="rv-sk-cat"><b>${esc(c.label)}</b>${esc(c.tags.join(', '))}</div>`).join('');
    const sbLangs=S.langs.map(id=>{const n=gv('ln_'+id),l=gv('ll_'+id);return n?`<div style="font-size:9pt;color:rgba(255,255,255,.8)">${esc(n)}${l?' — '+esc(l):''}</div>`:''}).join('');
    const contact=['f-email','f-phone','f-li','f-gh','f-loc','f-web'].map(id=>{const v=gv(id);return v?`<div>${esc(v)}</div>`:''}).join('');
    return`<div class="rv-sidebar">${showPhoto?`<img class="rv-photo" src="${S.photoData}" style="display:block;margin:0 auto 14px;width:72px;height:72px;border-radius:8px;object-fit:cover" alt="Photo"/>`:''}<div style="font-family:Syne,serif;font-size:19pt;font-weight:800;color:#fff;line-height:1.1;margin-bottom:4px;letter-spacing:-.5px">${esc(name)}</div><div style="font-size:9pt;color:#c8f538;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px">${esc(title)}</div><div class="rv-contact" style="font-size:9pt;color:rgba(255,255,255,.65);display:flex;flex-direction:column;gap:4px">${contact}</div>${sbSkills?`<div class="rv-sb-sh">Skills</div>${sbSkills}`:''} ${sbLangs?`<div class="rv-sb-sh">Languages</div>${sbLangs}`:''}</div><div class="rv-main">${summary?`<section class="rv-section"><h2 class="rv-sh">Profile</h2><p style="font-size:10pt;line-height:1.6;color:#333">${esc(summary)}</p></section>`:''} ${expHTML?`<section class="rv-section"><h2 class="rv-sh">Experience</h2>${expHTML}</section>`:''} ${projHTML?`<section class="rv-section"><h2 class="rv-sh">Projects</h2>${projHTML}</section>`:''} ${eduHTML?`<section class="rv-section"><h2 class="rv-sh">Education</h2>${eduHTML}</section>`:''} ${certHTML?`<section class="rv-section"><h2 class="rv-sh">Certifications</h2>${certHTML}</section>`:''} ${achHTML?`<section class="rv-section"><h2 class="rv-sh">Achievements</h2>${achHTML}</section>`:''} ${refs?`<section class="rv-section"><h2 class="rv-sh">References</h2><p style="font-size:10pt;color:#555">${esc(refs)}</p></section>`:''}</div>`;
  }

  const headerClass=(['modern','creative'].includes(tpl))?'rv-header':'';
  const bodyClass=(['modern','creative'].includes(tpl))?'rv-body':'';
  const contactHtml=`<div class="rv-contact">${contactLine(tpl)}</div>`;

  let headerBlock='',bodyBlock='';
  if(tpl==='classic'){
    headerBlock=`${photoTag}<h1 class="rv-name">${esc(name)}</h1><div class="rv-title">${esc(title)}</div>${contactHtml}<div class="rv-divider"></div>`;
  }else if(tpl==='minimal'){
    headerBlock=`${photoTag}<h1 class="rv-name">${esc(name)}</h1><div class="rv-title">${esc(title)}</div>${contactHtml}`;
  }else if(tpl==='compact'){
    headerBlock=`${photoTag}<h1 class="rv-name">${esc(name)}</h1><div class="rv-title">${esc(title)}</div>${contactHtml}`;
  }else{
    headerBlock=`${photoTag}<h1 class="rv-name">${esc(name)}</h1><div class="rv-title">${esc(title)}</div>${contactHtml}`;
  }

  const sections=`${summary?`<section class="rv-section"><h2 class="rv-sh">Summary</h2>${tpl==='modern'?`<div class="rv-summary">${esc(summary)}</div>`:`<p style="font-size:10.5pt;line-height:1.6;color:#444">${esc(summary)}</p>`}</section>`:''} ${skillHTML?`<section class="rv-section"><h2 class="rv-sh">Skills</h2>${skillHTML}</section>`:''} ${expHTML?`<section class="rv-section"><h2 class="rv-sh">Experience</h2>${expHTML}</section>`:''} ${projHTML?`<section class="rv-section"><h2 class="rv-sh">Projects</h2>${projHTML}</section>`:''} ${eduHTML?`<section class="rv-section"><h2 class="rv-sh">Education</h2>${eduHTML}</section>`:''} ${certHTML?`<section class="rv-section"><h2 class="rv-sh">Certifications</h2>${certHTML}</section>`:''} ${achHTML?`<section class="rv-section"><h2 class="rv-sh">Achievements</h2>${achHTML}</section>`:''} ${langHTML?`<section class="rv-section"><h2 class="rv-sh">Languages</h2>${langHTML}</section>`:''} ${refs?`<section class="rv-section"><h2 class="rv-sh">References</h2><p style="font-size:10pt;color:#555">${esc(refs)}</p></section>`:''}`;

  if(headerClass){
    return`<div class="${headerClass}">${headerBlock}</div><div class="${bodyClass}">${sections}</div>`;
  }
  return headerBlock+sections;
}

let renderTimer=null;
function render(){
  clearTimeout(renderTimer);
  renderTimer=setTimeout(()=>{
    const rv=document.getElementById('resumeView');
    if(!rv)return;
    rv.innerHTML=buildResumeHTML();
    if(S.atsMode)rv.classList.add('ats-mode-active');else rv.classList.remove('ats-mode-active');
    saveState();
    validateAll();
  },80);
}

function setTpl(tpl,silent){
  S.tpl=tpl;
  const rv=document.getElementById('resumeView');
  if(rv){rv.className='rv tpl-'+tpl;if(S.atsMode)rv.classList.add('ats-mode-active');}
  document.querySelectorAll('.tpl-chip').forEach(c=>c.classList.toggle('on',c.dataset.tpl===tpl));
  if(!silent)render();
}

function zoomChange(delta){
  S.zoom=Math.min(1.5,Math.max(0.4,S.zoom+delta));
  const wrap=document.getElementById('rvWrap');
  if(wrap)wrap.style.transform=`scale(${S.zoom})`;
  document.getElementById('zoomLbl').textContent=Math.round(S.zoom*100)+'%';
}

function toggleAtsMode(){
  S.atsMode=!S.atsMode;
  const pill=document.getElementById('atsModePill');
  if(pill)pill.classList.toggle('ats-on',S.atsMode);
  const rv=document.getElementById('resumeView');
  if(rv)rv.classList.toggle('ats-mode-active',S.atsMode);
  toast(S.atsMode?'ATS Mode ON — clean text view active':'ATS Mode OFF',S.atsMode?'info':'success');
  saveState();
}

async function exportPDF(){
  const rv=document.getElementById('resumeView');
  if(!rv){toast('Nothing to export','warn');return;}
  toast('Generating PDF…','info');
  try{
    const canvas=await html2canvas(rv,{scale:2,useCORS:true,backgroundColor:'#ffffff',logging:false});
    const{jsPDF}=window.jspdf;
    const pdf=new jsPDF('p','mm','a4');
    const w=pdf.internal.pageSize.getWidth();
    const h=(canvas.height/canvas.width)*w;
    pdf.addImage(canvas.toDataURL('image/jpeg',0.97),'JPEG',0,0,w,h);
    const fname=(gv('f-name')||'resume').replace(/\s+/g,'-').toLowerCase();
    pdf.save(`${fname}-vitaecraft.pdf`);
    toast('PDF downloaded!','success');
  }catch(e){console.error(e);toast('PDF export failed','error');}
}
