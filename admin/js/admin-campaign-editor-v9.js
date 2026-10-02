document.addEventListener('DOMContentLoaded',()=>{
console.info('[ReNew You] Campaign Editor v9 loaded');
const URL='https://eybsgwzpisgswmxcwjel.supabase.co',KEY='sb_publishable_R_kVcbPeNKKDIVQM8l2gZQ_6fUa4weF',db=window.supabase.createClient(URL,KEY);
const LOGO='https://renewyouhealthwellness.com/images/logof.png';
const $=id=>document.getElementById(id),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const editor=$('editor'),toolbar=document.querySelector('.toolbar');
let campaignId=null,savedRange=null,savedTextRange=null,toolbarInteracting=false;

async function auth(){const {data:{session}}=await db.auth.getSession();if(!session){location.href='index.html';throw new Error('Sign in required.')}return session}
function note(m,t='info'){window.AdminPopup?.toast(m,t||'info')}
function rangeIsInsideEditor(range){if(!range||!editor)return false;const node=range.commonAncestorContainer;return node===editor||editor.contains(node)}
function saveRange(){
  const s=window.getSelection();
  if(!s||!s.rangeCount)return;
  const r=s.getRangeAt(0);
  if(!rangeIsInsideEditor(r))return;
  savedRange=r.cloneRange();
  if(!r.collapsed)savedTextRange=r.cloneRange();
}
function ensureRange(){
  if(savedRange&&rangeIsInsideEditor(savedRange))return savedRange;
  const r=document.createRange();r.selectNodeContents(editor);r.collapse(false);savedRange=r.cloneRange();return savedRange;
}
function restoreRange(){
  const r=ensureRange().cloneRange();
  editor.focus({preventScroll:true});
  const s=window.getSelection();s.removeAllRanges();s.addRange(r);
  return r;
}
function runCommand(cmd,val=null){
  const textRange=selectedRange();
  if(textRange){
    editor.focus({preventScroll:true});
    const sel=window.getSelection();sel.removeAllRanges();sel.addRange(textRange);
  }else{restoreRange();}
  let ok=false;
  try{ok=document.execCommand(cmd,false,val)}catch(err){console.error('Editor command failed:',cmd,err)}
  editor.focus({preventScroll:true});saveRange();syncToolbarState();return ok;
}
function bodyHtml(){return editor.innerHTML.trim()}
function fullHtml(){const pre=esc($('preheader').value.trim()),body=bodyHtml();return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:0;background:#f3edf6;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}img{border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic}table{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt}@media only screen and (max-width:620px){.email-outer{padding:0!important}.email-shell{width:100%!important;max-width:100%!important;border-radius:0!important}.email-header{padding:20px 18px!important}.email-logo{width:180px!important;max-width:80%!important}.email-body{padding:24px 20px!important;font-size:16px!important;line-height:1.65!important}.email-footer{padding:18px 20px!important}img{max-width:100%!important;height:auto!important}}</style></head><body><div style="display:none!important;max-height:0!important;max-width:0!important;overflow:hidden!important;opacity:0!important;color:transparent!important">${pre}</div><table class="email-outer" width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f3edf6;margin:0;padding:32px 12px"><tr><td align="center"><table class="email-shell" width="720" role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:720px;background:#ffffff;border-radius:18px;overflow:hidden;font-family:Arial,Helvetica,sans-serif"><tr><td class="email-header" align="center" bgcolor="#3E0D5F" style="background:#3E0D5F;padding:24px 28px"><a href="https://renewyouhealthwellness.com/" style="text-decoration:none"><img class="email-logo" src="${LOGO}" width="220" alt="ReNew You Health & Wellness" border="0" style="display:block;width:220px;max-width:72%;height:auto;margin:0 auto;border:0;outline:none;text-decoration:none"></a></td></tr><tr><td class="email-body" style="width:100%;padding:34px 36px;line-height:1.7;color:#554a59;font-size:16px;box-sizing:border-box">${body}</td></tr><tr><td class="email-footer" align="center" bgcolor="#3E0D5F" style="background:#3E0D5F;padding:20px 24px;text-align:center;color:#d9cde0;font-size:11px;line-height:1.6">ReNew You Health &amp; Wellness<br>500 Ashland Ave., Suite 101 &middot; Chicago Heights, IL 60411<br>(708) 329-2155<br><a href="{{UNSUBSCRIBE_URL}}" style="display:inline-block;margin-top:8px;color:#ffffff;text-decoration:underline;font-weight:700">Unsubscribe from marketing emails</a></td></tr></table></td></tr></table></body></html>`}
function extractBody(html){const raw=String(html||'');if(!raw)return '';try{const doc=new DOMParser().parseFromString(raw,'text/html');const cells=Array.from(doc.querySelectorAll('td'));const content=cells.find(td=>{const cls=td.classList,st=String(td.getAttribute('style')||'').toLowerCase();return cls.contains('email-body')||(st.includes('line-height:1.7')&&(st.includes('padding:36px 34px')||st.includes('padding:34px 36px')))});return content?content.innerHTML:raw}catch{return raw}}
function normalizeEditorWidth(){editor.querySelectorAll(':scope > p,:scope > div,:scope > section,:scope > article,:scope > blockquote,:scope > table').forEach(n=>{n.style.maxWidth='none';n.style.width='100%'})}
async function loadExisting(){const id=new URLSearchParams(location.search).get('id');if(!id)return;const {data,error}=await db.from('email_campaigns').select('*').eq('id',id).single();if(error)throw error;campaignId=data.id;$('pageTitle').textContent='Edit Campaign';$('campaignName').value=data.name||'';$('subject').value=data.subject||'';$('preheader').value=data.preheader||'';$('fromName').value=data.from_name||'ReNew You Health & Wellness';$('replyTo').value=data.reply_to||'info@renewyouhealthwellness.com';editor.innerHTML=extractBody(data.html_content);normalizeEditorWidth();$('statusBadge').textContent=String(data.status||'draft').toUpperCase();$('sendBtn').disabled=data.status==='sent'}
async function save(){if(!$('campaignName').value.trim()||!$('subject').value.trim()||!bodyHtml()){note('Campaign name, subject, and content are required.','error');return null}normalizeEditorWidth();const patch={name:$('campaignName').value.trim(),subject:$('subject').value.trim(),preheader:$('preheader').value.trim(),from_name:$('fromName').value.trim()||'ReNew You Health & Wellness',from_email:'no-reply@renewyouhealthwellness.com',reply_to:$('replyTo').value.trim()||'info@renewyouhealthwellness.com',html_content:fullHtml(),updated_at:new Date().toISOString()};const btn=$('saveBtn');btn.disabled=true;btn.textContent='Saving...';try{let r;if(campaignId)r=await db.from('email_campaigns').update(patch).eq('id',campaignId).select('*').single();else{const {data:{user}}=await db.auth.getUser();r=await db.from('email_campaigns').insert({...patch,created_by:user?.id||null}).select('*').single()}if(r.error)throw r.error;campaignId=r.data.id;history.replaceState(null,'',`campaign-editor.html?id=${encodeURIComponent(campaignId)}`);$('pageTitle').textContent='Edit Campaign';$('statusBadge').textContent=String(r.data.status||'draft').toUpperCase();$('sendBtn').disabled=r.data.status==='sent';note('Campaign draft saved.','success');return r.data}catch(e){note(e.message||'Unable to save campaign.','error');return null}finally{btn.disabled=false;btn.textContent='Save Draft'}}
async function goSend(){const c=await save();if(c)location.href=`send-campaign.html?id=${encodeURIComponent(c.id)}`}
async function goPreview(){const c=await save();if(c)location.href=`campaign-preview.html?id=${encodeURIComponent(c.id)}`}

function selectedRange(){
  const live=window.getSelection();
  if(live&&live.rangeCount){
    const r=live.getRangeAt(0);
    if(rangeIsInsideEditor(r)&&!r.collapsed){
      savedRange=r.cloneRange();
      savedTextRange=r.cloneRange();
      return r.cloneRange();
    }
  }
  const r=savedTextRange&&savedTextRange.cloneRange();
  return r&&rangeIsInsideEditor(r)&&!r.collapsed?r:null;
}
function restoreTextRange(){
  const r=selectedRange();
  if(!r)return null;
  editor.focus({preventScroll:true});
  const s=window.getSelection();
  s.removeAllRanges();
  s.addRange(r);
  savedRange=r.cloneRange();
  savedTextRange=r.cloneRange();
  return r;
}
function applyTextColor(color){
  if(!restoreTextRange()){note('Select text in the email first.','info');return}
  try{
    document.execCommand('styleWithCSS',false,true);
    document.execCommand('foreColor',false,color);
  }finally{try{document.execCommand('styleWithCSS',false,false)}catch{}}
  editor.focus({preventScroll:true});
  saveRange();
  syncToolbarState();
}
function clearSelectedFormatting(){
  if(!restoreTextRange()){note('Select formatted text in the email first.','info');return}
  document.execCommand('removeFormat',false,null);
  document.execCommand('unlink',false,null);
  editor.focus({preventScroll:true});
  saveRange();
  syncToolbarState();
}
function syncToolbarState(){
  document.querySelectorAll('.toolbar button[data-cmd]').forEach(btn=>{const cmd=btn.dataset.cmd;let active=false;try{if(['bold','italic','underline','insertUnorderedList','insertOrderedList','justifyLeft','justifyCenter','justifyRight'].includes(cmd))active=document.queryCommandState(cmd)}catch{}btn.classList.toggle('active',!!active);btn.setAttribute('aria-pressed',active?'true':'false')});
}

$('campaignForm')?.addEventListener('submit',e=>{e.preventDefault();save()});
$('sendBtn')?.addEventListener('click',goSend);
$('previewBtn')?.addEventListener('click',e=>{e.preventDefault();goPreview()});

['keyup','mouseup','touchend','focus','input'].forEach(type=>editor.addEventListener(type,()=>{saveRange();syncToolbarState()}));
editor.addEventListener('paste',()=>setTimeout(()=>{normalizeEditorWidth();saveRange()},0));
document.addEventListener('selectionchange',()=>{
  if(toolbarInteracting)return;
  const s=window.getSelection();
  if(!s||!s.rangeCount)return;
  const r=s.getRangeAt(0);
  if(rangeIsInsideEditor(r)){
    savedRange=r.cloneRange();
    if(!r.collapsed)savedTextRange=r.cloneRange();
    syncToolbarState();
  }
});

// Preserve the last real editor selection before any toolbar control takes focus.
toolbar?.addEventListener('pointerdown',e=>{
  toolbarInteracting=true;
  saveRange();
  if(e.target.closest('button'))e.preventDefault();
},true);
toolbar?.addEventListener('mousedown',e=>{
  saveRange();
  if(e.target.closest('button'))e.preventDefault();
},true);
toolbar?.addEventListener('click',()=>setTimeout(()=>{toolbarInteracting=false},0),true);

document.querySelectorAll('[data-cmd]').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();runCommand(btn.dataset.cmd,btn.dataset.value||null)}));
$('format').addEventListener('focus',saveRange);$('format').addEventListener('mousedown',saveRange);$('format').addEventListener('change',()=>runCommand('formatBlock',`<${$('format').value}>`));
$('font').addEventListener('focus',saveRange);$('font').addEventListener('mousedown',saveRange);$('font').addEventListener('change',()=>runCommand('fontName',$('font').value));

const colorBtn=$('colorBtn'),colorMenu=$('colorMenu'),colorHex=$('colorHex'),applyHexColor=$('applyHexColor');
let colorSelectionRange=null;
function validHex(v){v=String(v||'').trim();if(!v.startsWith('#'))v='#'+v;return /^#[0-9a-fA-F]{6}$/.test(v)?v.toUpperCase():null}
function captureColorSelection(){
  const sel=window.getSelection();
  if(sel&&sel.rangeCount){
    const r=sel.getRangeAt(0);
    if(rangeIsInsideEditor(r)&&!r.collapsed){
      colorSelectionRange=r.cloneRange();
      savedTextRange=r.cloneRange();
      savedRange=r.cloneRange();
      return true;
    }
  }
  if(savedTextRange&&rangeIsInsideEditor(savedTextRange)&&!savedTextRange.collapsed){
    colorSelectionRange=savedTextRange.cloneRange();
    return true;
  }
  return false;
}
function openColorMenu(){
  if(!captureColorSelection()){note('Highlight the text you want to color first.','info');return}
  toolbarInteracting=true;
  colorMenu.hidden=false;
  colorBtn.setAttribute('aria-expanded','true');
}
function closeColorMenu(){colorMenu.hidden=true;colorBtn.setAttribute('aria-expanded','false');toolbarInteracting=false}
function chooseTextColor(color){
  const c=validHex(color);if(!c)return;
  const r=colorSelectionRange&&colorSelectionRange.cloneRange();
  if(!r||!rangeIsInsideEditor(r)||r.collapsed){note('Highlight the text you want to color first.','info');closeColorMenu();return}
  // Restore exactly the captured range. Toolbar focus is irrelevant now.
  const sel=window.getSelection();
  sel.removeAllRanges();sel.addRange(r);
  editor.focus({preventScroll:true});
  try{
    document.execCommand('styleWithCSS',false,true);
    document.execCommand('foreColor',false,c);
  }catch(err){console.error('Text color failed',err)}
  finally{try{document.execCommand('styleWithCSS',false,false)}catch{}}
  $('colorSwatch').style.background=c;colorHex.value=c;
  // Keep the formatted text selected after applying color.
  const live=window.getSelection();
  if(live&&live.rangeCount){
    const applied=live.getRangeAt(0).cloneRange();
    if(rangeIsInsideEditor(applied)){savedRange=applied.cloneRange();if(!applied.collapsed)savedTextRange=applied.cloneRange();colorSelectionRange=applied.cloneRange()}
  }
  syncToolbarState();closeColorMenu();
}
// Save the selection BEFORE the Color button can receive focus.
['pointerdown','mousedown'].forEach(type=>colorBtn.addEventListener(type,e=>{
  captureColorSelection();
  e.preventDefault();
}));
colorBtn.addEventListener('click',e=>{e.preventDefault();if(colorMenu.hidden)openColorMenu();else closeColorMenu()});
// Palette buttons never take focus from the editor.
colorMenu.addEventListener('pointerdown',e=>{if(e.target.closest('button'))e.preventDefault();toolbarInteracting=true},true);
colorMenu.addEventListener('mousedown',e=>{if(e.target.closest('button'))e.preventDefault();toolbarInteracting=true},true);
colorMenu.querySelectorAll('.color-choice').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();chooseTextColor(btn.dataset.color)}));
colorHex.addEventListener('focus',()=>{toolbarInteracting=true});
colorHex.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();chooseTextColor(colorHex.value)}else if(e.key==='Escape'){e.preventDefault();closeColorMenu()}});
applyHexColor.addEventListener('pointerdown',e=>e.preventDefault());
applyHexColor.addEventListener('mousedown',e=>e.preventDefault());
applyHexColor.addEventListener('click',e=>{e.preventDefault();const c=validHex(colorHex.value);if(!c){note('Enter a 6-digit hex color such as #8A349B.','error');return}chooseTextColor(c)});
document.addEventListener('mousedown',e=>{if(!colorMenu.hidden&&!e.target.closest('.text-color-control'))closeColorMenu()});
$('clearBtn').addEventListener('click',e=>{e.preventDefault();clearSelectedFormatting()});
$('linkBtn').addEventListener('click',async e=>{e.preventDefault();saveRange();if(!selectedRange()){note('Select the text you want to link first.','info');return}const u=await window.AdminPopup.prompt({title:'Add Link',message:'Enter the web address for the selected text.',label:'Link URL',placeholder:'https://'});if(u)runCommand('createLink',u)});
$('buttonBtn').addEventListener('click',async e=>{e.preventDefault();saveRange();const text=await window.AdminPopup.prompt({title:'Add Email Button',message:'Choose the text recipients will see on the button.',label:'Button text',value:'Learn More'});if(!text)return;const u=await window.AdminPopup.prompt({title:'Button Destination',message:'Enter the page the button should open.',label:'Button URL',value:'https://'});if(!u)return;runCommand('insertHTML',`<p style="text-align:center;margin:26px 0;width:100%"><a href="${esc(u)}" style="display:inline-block;background:#3E0D5F;color:#fff;text-decoration:none;padding:13px 22px;border-radius:10px;font-weight:700">${esc(text)}</a></p>`)});

// Make Ctrl/Cmd+B, I and U consistent with the toolbar.
editor.addEventListener('keydown',e=>{if(!(e.ctrlKey||e.metaKey))return;const key=e.key.toLowerCase();if(['b','i','u'].includes(key)){e.preventDefault();runCommand(key==='b'?'bold':key==='i'?'italic':'underline')}});

auth().then(loadExisting).catch(e=>note(e.message,'error'));
});
