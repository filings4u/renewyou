(function(){
  const STORAGE_KEY='renewyouAdminNavCollapsed';
  const page=location.pathname.split('/').pop()||'admin-dashboard.html';
  const qs=new URLSearchParams(location.search);
  const dashPage=qs.get('page')||'dashboardPage';
  const dashboardInternal=new Set(['dashboardPage','contactInboxPage','appointmentsPage','schedulePage','wellnessOffersPage','blogPage','randomPoolPage','settingsPage']);
  const navItems=[
    ['Overview', [['📊','Dashboard','admin-dashboard.html','dashboardPage']]],
    ['Patient Operations', [['💬','Contact Inbox','admin-dashboard.html?page=contactInboxPage','contactInboxPage'],['📋','Appointments','admin-dashboard.html?page=appointmentsPage','appointmentsPage'],['📅','Schedule','admin-dashboard.html?page=schedulePage','schedulePage']]],
    ['Marketing & Communications', [['👥','Subscribers','admin-subscribers.html',''],['✉️','Campaign Editor','admin-campaign-editor.html',''],['🗂️','Recent Campaigns','admin-campaigns.html',''],['📈','Email Status','admin-email-status.html',''],['🎟️','Wellness Offers','admin-dashboard.html?page=wellnessOffersPage','wellnessOffersPage'],['📝','Blog','admin-dashboard.html?page=blogPage','blogPage']]],
    ['DOT Operations', [['🎲','Random Pool','admin-dashboard.html?page=randomPoolPage','randomPoolPage']]],
    ['Administration', [['⚙️','Settings','admin-dashboard.html?page=settingsPage','settingsPage']]]
  ];
  const isActive=(href,dataPage,label)=>{
    if(page==='admin-dashboard.html' && dataPage) return dashPage===dataPage;
    if(page==='admin-campaign-preview.html'||page==='admin-send-campaign.html') return label==='Recent Campaigns';
    return href.split('?')[0]===page;
  };
  function build(){
    if(document.getElementById('sharedAdminNav')) return;
    document.body.classList.add('admin-shared-nav-ready');
    const nav=document.createElement('aside'); nav.id='sharedAdminNav'; nav.className='admin-shared-nav'; nav.setAttribute('aria-label','Admin navigation');
    nav.innerHTML=`<div class="admin-shared-nav-head"><div class="admin-shared-brand"><div class="admin-shared-brand-copy"><strong>ReNew You</strong><span>Management Workspace</span></div></div></div><div class="admin-shared-nav-groups">${navItems.map(([group,items])=>`<div class="admin-shared-nav-group"><div class="admin-shared-nav-group-title">${group}</div>${items.map(([icon,label,href,dataPage])=>`<a class="admin-page-tab${isActive(href,dataPage,label)?' active':''}" href="${href}"${dataPage?` data-page="${dataPage}"`:''}>${icon} <span>${label}</span></a>`).join('')}</div>`).join('')}</div><div class="admin-shared-nav-footer"><button class="admin-nav-signout" id="adminNavSignOut" type="button">Sign Out</button><button class="admin-nav-hide-btn" id="adminNavHide" type="button">Hide navigation</button></div>`;
    const show=document.createElement('button'); show.id='adminNavShow'; show.className='admin-nav-show-btn'; show.type='button'; show.innerHTML='☰ <span>Show navigation</span>';
    const mobile=document.createElement('button'); mobile.id='sharedAdminMobileToggle'; mobile.className='admin-nav-mobile-btn'; mobile.type='button'; mobile.setAttribute('aria-label','Open admin navigation'); mobile.setAttribute('aria-expanded','false'); mobile.innerHTML='<span class="bars" aria-hidden="true"><span></span><span></span><span></span></span>';
    const mobileBar=document.createElement('div'); mobileBar.className='admin-mobile-topbar'; mobileBar.innerHTML='<a class="admin-mobile-brand" href="admin-dashboard.html"><img src="images/logof.png" alt="ReNew You Health & Wellness"></a>';
    mobileBar.appendChild(mobile);
    const overlay=document.createElement('div'); overlay.id='sharedAdminNavOverlay'; overlay.className='admin-shared-nav-overlay'; overlay.setAttribute('aria-hidden','true');
    document.body.prepend(nav); document.body.prepend(overlay); document.body.prepend(mobileBar); document.body.prepend(show);
    const collapsed=localStorage.getItem(STORAGE_KEY)==='1';
    function setCollapsed(value){
      document.body.classList.toggle('admin-nav-collapsed',value); nav.classList.toggle('is-collapsed',value); localStorage.setItem(STORAGE_KEY,value?'1':'0');
    }
    function closeMobile(){nav.classList.remove('mobile-open');mobile.setAttribute('aria-expanded','false');mobile.setAttribute('aria-label','Open admin navigation');overlay.classList.remove('active');overlay.setAttribute('aria-hidden','true');document.body.classList.remove('admin-mobile-nav-open')}
    function openMobile(){nav.classList.remove('is-collapsed');nav.classList.add('mobile-open');mobile.setAttribute('aria-expanded','true');mobile.setAttribute('aria-label','Close admin navigation');overlay.classList.add('active');overlay.setAttribute('aria-hidden','false');document.body.classList.add('admin-mobile-nav-open')}
    setCollapsed(collapsed && innerWidth>850);
    document.getElementById('adminNavHide')?.addEventListener('click',()=>setCollapsed(true));
    document.getElementById('adminNavSignOut')?.addEventListener('click',()=>{
      const logout=document.getElementById('logoutBtn');
      if(logout){ closeMobile(); logout.click(); return; }
      location.href='admin-dashboard.html';
    });
    const syncAuthScreen=()=>{
      const auth=document.body.classList.contains('admin-auth-screen');
      if(auth) closeMobile();
      nav.setAttribute('aria-hidden',auth?'true':'false');
    };
    new MutationObserver(syncAuthScreen).observe(document.body,{attributes:true,attributeFilter:['class']});
    syncAuthScreen();
    show.addEventListener('click',()=>setCollapsed(false));
    mobile.addEventListener('click',()=>nav.classList.contains('mobile-open')?closeMobile():openMobile());
    overlay.addEventListener('click',closeMobile); document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobile()});
    window.addEventListener('resize',()=>{if(innerWidth>850){closeMobile();setCollapsed(localStorage.getItem(STORAGE_KEY)==='1')}else{document.body.classList.remove('admin-nav-collapsed');nav.classList.remove('is-collapsed')}});
    nav.querySelectorAll('a[data-page]').forEach(a=>a.addEventListener('click',e=>{
      if(page==='admin-dashboard.html'&&dashboardInternal.has(a.dataset.page)){
        e.preventDefault(); history.replaceState(null,'',a.getAttribute('href')); nav.querySelectorAll('.admin-page-tab').forEach(x=>x.classList.remove('active')); a.classList.add('active'); if(innerWidth<=850)closeMobile();
      }
    }));
    if(page==='admin-dashboard.html'&&dashboardInternal.has(dashPage)) setTimeout(()=>{const a=nav.querySelector(`a[data-page="${CSS.escape(dashPage)}"]`); if(a&&dashPage!=='dashboardPage') a.click()},0);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',build,{once:true}); else build();
})();
