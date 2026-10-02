(function(){
  const STORAGE_KEY='renewyouAdminNavCollapsed';
  const page=location.pathname.split('/').pop()||'index.html';
  const qs=new URLSearchParams(location.search);
  const dashPage=qs.get('page')||'dashboardPage';
  const dashboardInternal=new Set(['dashboardPage','contactInboxPage','appointmentsPage','schedulePage','wellnessOffersPage','blogPage','randomPoolPage','settingsPage']);
  const navItems=[
    ['Overview', [['📊','Dashboard','index.html','dashboardPage']]],
    ['Patient Operations', [['💬','Contact Inbox','index.html?page=contactInboxPage','contactInboxPage'],['📋','Appointments','index.html?page=appointmentsPage','appointmentsPage'],['📅','Schedule','index.html?page=schedulePage','schedulePage']]],
    ['Marketing & Communications', [['👥','Subscribers','subscribers.html',''],['✉️','Campaign Editor','campaign-editor.html',''],['🗂️','Recent Campaigns','campaigns.html',''],['📈','Email Status','email-status.html',''],['🎟️','Wellness Offers','index.html?page=wellnessOffersPage','wellnessOffersPage'],['📝','Blog','index.html?page=blogPage','blogPage']]],
    ['DOT Operations', [['🎲','Random Pool','index.html?page=randomPoolPage','randomPoolPage']]],
    ['Administration', [['⚙️','Settings','index.html?page=settingsPage','settingsPage']]]
  ];
  const isDashboard=page==='index.html'||page==='index.html';
  const isActive=(href,dataPage,label)=>{
    if(isDashboard && dataPage) return dashPage===dataPage;
    if(page==='campaign-preview.html'||page==='send-campaign.html') return label==='Recent Campaigns';
    return href.split('?')[0]===page;
  };
  function destroy(){
    document.getElementById('sharedAdminNav')?.remove();
    document.getElementById('adminNavShow')?.remove();
    document.getElementById('sharedAdminNavOverlay')?.remove();
    document.querySelector('.admin-mobile-topbar')?.remove();
    document.body.classList.remove('admin-shared-nav-ready','admin-nav-collapsed','admin-mobile-nav-open');
  }
  async function signOut(){
    try{
      if(window.supabase){
        const client=window.supabase.createClient('https://eybsgwzpisgswmxcwjel.supabase.co','sb_publishable_R_kVcbPeNKKDIVQM8l2gZQ_6fUa4weF');
        await client.auth.signOut();
      }
    }catch(error){ console.error('Admin sign out error:',error); }
    destroy();
    location.href='index.html';
  }
  function build(){
    if(document.getElementById('sharedAdminNav')||document.body.classList.contains('admin-login-view')) return;
    document.body.classList.add('admin-shared-nav-ready');
    const nav=document.createElement('aside'); nav.id='sharedAdminNav'; nav.className='admin-shared-nav'; nav.setAttribute('aria-label','Admin navigation');
    nav.innerHTML=`<div class="admin-shared-nav-head"><div class="admin-shared-brand"><div class="admin-shared-brand-copy"><strong>ReNew You</strong><span>Management Workspace</span></div></div></div><div class="admin-shared-nav-groups">${navItems.map(([group,items])=>`<div class="admin-shared-nav-group"><div class="admin-shared-nav-group-title">${group}</div>${items.map(([icon,label,href,dataPage])=>`<a class="admin-page-tab${isActive(href,dataPage,label)?' active':''}" href="${href}"${dataPage?` data-page="${dataPage}"`:''}>${icon} <span>${label}</span></a>`).join('')}</div>`).join('')}</div><div class="admin-shared-nav-footer"><button class="admin-sidebar-signout" id="adminSidebarSignout" type="button">Sign Out</button><button class="admin-nav-hide-btn" id="adminNavHide" type="button">Hide navigation</button></div>`;
    const show=document.createElement('button'); show.id='adminNavShow'; show.className='admin-nav-show-btn'; show.type='button'; show.innerHTML='☰ <span>Show navigation</span>';
    const mobile=document.createElement('button'); mobile.id='sharedAdminMobileToggle'; mobile.className='admin-nav-mobile-btn'; mobile.type='button'; mobile.setAttribute('aria-label','Open admin navigation'); mobile.setAttribute('aria-expanded','false'); mobile.innerHTML='<span class="bars" aria-hidden="true"><span></span><span></span><span></span></span>';
    const mobileBar=document.createElement('div'); mobileBar.className='admin-mobile-topbar'; mobileBar.innerHTML='<a class="admin-mobile-brand" href="index.html"><img src="images/logof.png" alt="ReNew You Health & Wellness"></a>'; mobileBar.appendChild(mobile);
    const overlay=document.createElement('div'); overlay.id='sharedAdminNavOverlay'; overlay.className='admin-shared-nav-overlay'; overlay.setAttribute('aria-hidden','true');
    document.body.prepend(nav); document.body.prepend(overlay); document.body.prepend(mobileBar); document.body.prepend(show);
    const collapsed=localStorage.getItem(STORAGE_KEY)==='1';
    function setCollapsed(value){ document.body.classList.toggle('admin-nav-collapsed',value); nav.classList.toggle('is-collapsed',value); localStorage.setItem(STORAGE_KEY,value?'1':'0'); }
    function closeMobile(){ nav.classList.remove('mobile-open');mobile.setAttribute('aria-expanded','false');mobile.setAttribute('aria-label','Open admin navigation');overlay.classList.remove('active');overlay.setAttribute('aria-hidden','true');document.body.classList.remove('admin-mobile-nav-open'); }
    function openMobile(){ nav.classList.remove('is-collapsed');nav.classList.add('mobile-open');mobile.setAttribute('aria-expanded','true');mobile.setAttribute('aria-label','Close admin navigation');overlay.classList.add('active');overlay.setAttribute('aria-hidden','false');document.body.classList.add('admin-mobile-nav-open'); }
    setCollapsed(collapsed && innerWidth>850);
    document.getElementById('adminNavHide')?.addEventListener('click',()=>setCollapsed(true));
    document.getElementById('adminSidebarSignout')?.addEventListener('click',signOut);
    show.addEventListener('click',()=>setCollapsed(false)); mobile.addEventListener('click',()=>nav.classList.contains('mobile-open')?closeMobile():openMobile()); overlay.addEventListener('click',closeMobile);
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobile()});
    window.addEventListener('resize',()=>{if(innerWidth>850){closeMobile();setCollapsed(localStorage.getItem(STORAGE_KEY)==='1')}else{document.body.classList.remove('admin-nav-collapsed');nav.classList.remove('is-collapsed')}});
    nav.querySelectorAll('a[data-page]').forEach(a=>a.addEventListener('click',e=>{
      if(isDashboard&&dashboardInternal.has(a.dataset.page)){
        e.preventDefault(); history.replaceState(null,'',a.getAttribute('href')); nav.querySelectorAll('.admin-page-tab').forEach(x=>x.classList.remove('active')); a.classList.add('active'); document.dispatchEvent(new CustomEvent('renewyou:admin-page',{detail:{page:a.dataset.page}})); if(innerWidth<=850)closeMobile();
      }
    }));
    if(isDashboard&&dashboardInternal.has(dashPage)) setTimeout(()=>document.dispatchEvent(new CustomEvent('renewyou:admin-page',{detail:{page:dashPage}})),0);
  }
  window.AdminSharedNav={build,destroy,signOut};
  if(!isDashboard && document.readyState==='loading') document.addEventListener('DOMContentLoaded',build,{once:true});
  else if(!isDashboard) build();
})();
