const SUPABASE_URL='https://eybsgwzpisgswmxcwjel.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_R_kVcbPeNKKDIVQM8l2gZQ_6fUa4weF';
const client=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
const form=document.getElementById('resetForm');
const message=document.getElementById('message');
const submitBtn=document.getElementById('submitBtn');
function show(text,type){message.textContent=text;message.className='msg '+type;message.style.display='block'}
form.addEventListener('submit',async(e)=>{
  e.preventDefault(); message.style.display='none';
  const password=document.getElementById('password').value;
  const confirm=document.getElementById('confirmPassword').value;
  if(password!==confirm){show('The passwords do not match.','error');return}
  if(password.length<8){show('Use at least 8 characters.','error');return}
  submitBtn.disabled=true;
  const {error}=await client.auth.updateUser({password});
  if(error){show(error.message,'error');submitBtn.disabled=false;return}
  show('Password updated. Redirecting to staff sign-in…','success');
  await client.auth.signOut();
  setTimeout(()=>window.location.href='index.html',1200);
});

document.querySelectorAll('[data-password-toggle]').forEach(button=>button.addEventListener('click',()=>{const input=document.getElementById(button.dataset.passwordToggle);if(!input)return;const show=input.type==='password';input.type=show?'text':'password';button.setAttribute('aria-pressed',show?'true':'false');button.setAttribute('aria-label',show?'Hide password':'Show password');}));
