document.addEventListener('DOMContentLoaded',()=>{
  const SUPABASE_URL='https://eybsgwzpisgswmxcwjel.supabase.co';
  const SUPABASE_KEY='sb_publishable_R_kVcbPeNKKDIVQM8l2gZQ_6fUa4weF';
  const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
  const $=id=>document.getElementById(id);
  const campaignId=new URLSearchParams(location.search).get('id');

  function setMode(mode){
    const mobile=mode==='mobile';
    $('previewStage').classList.toggle('mobile',mobile);
    $('previewStage').classList.toggle('desktop',!mobile);
    $('desktopBtn').classList.toggle('active',!mobile);
    $('mobileBtn').classList.toggle('active',mobile);
  }

  function normalizePreviewHtml(html){
    return String(html||'')
      .replace(/https:\/\/renewyouhealthwellness\.com\/images\/(?:logo|logo2|logof)\.png/gi,'https://renewyouhealthwellness.com/images/logof.png')
      .replace(/(["'])images\/(?:logo|logo2|logof)\.png\1/gi,'$1images/logof.png$1')
      .replace(/src=(["'])\/?images\/(?:logo|logo2|logof)\.png\1/gi,'src=$1images/logof.png$1');
  }

  function renderExactHtml(html){
    const frame=$('previewFrame');
    frame.srcdoc=normalizePreviewHtml(html).replaceAll('{{UNSUBSCRIBE_URL}}','https://renewyouhealthwellness.com/unsubscribe.html');
  }

async function load(){
    const {data:{session}}=await db.auth.getSession();
    if(!session){location.href='admin-dashboard.html';return;}
    if(!campaignId){
      window.AdminPopup?.toast('Campaign id is missing.','error'); $('previewStage').innerHTML=''; return;
    }
    $('backToEditor').href=`admin-campaign-editor.html?id=${encodeURIComponent(campaignId)}`;
    const {data,error}=await db.from('email_campaigns').select('id,name,subject,html_content').eq('id',campaignId).single();
    if(error||!data){
      window.AdminPopup?.toast(error?.message||'Campaign not found.','error'); $('previewStage').innerHTML=''; return;
    }
    $('previewTitle').textContent=data.subject||data.name||'Campaign Preview';
    renderExactHtml(data.html_content||'');
  }

  $('desktopBtn').addEventListener('click',()=>setMode('desktop'));
  $('mobileBtn').addEventListener('click',()=>setMode('mobile'));
  setMode('desktop');
  load();
});
