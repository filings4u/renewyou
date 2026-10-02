const SUPABASE_URL='https://eybsgwzpisgswmxcwjel.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_R_kVcbPeNKKDIVQM8l2gZQ_6fUa4weF';
const client=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
const form=document.getElementById('forgotForm'),message=document.getElementById('message'),submitBtn=document.getElementById('submitBtn'),email=document.getElementById('email');
const preset=new URLSearchParams(location.search).get('email'); if(preset) email.value=preset;
function show(text,type){message.textContent=text;message.className='msg '+type;}
form.addEventListener('submit',async e=>{e.preventDefault();submitBtn.disabled=true;message.style.display='none';const redirectTo=new URL('reset-password.html',location.href).href;const {error}=await client.auth.resetPasswordForEmail(email.value.trim(),{redirectTo});if(error){show(error.message,'error');submitBtn.disabled=false;return;}show('Password reset email sent. Check your inbox.','success');submitBtn.disabled=false;});
