import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
const API = 'https://attendwise-backend-sz41.onrender.com/api';
function App(){
  const [page,setPage]=useState('Register');
  const [rows,setRows]=useState([]);
  const [notice,setNotice]=useState('');
  const [user,setUser]=useState('');
  const [stream,setStream]=useState(null);
  async function call(path,opts={}){
    let r=await fetch(API+path,{headers:{'Content-Type':'application/json'},...opts});
    if(!r.ok) throw new Error(await r.text());
    return r.json();
  }
  const post=(path,data)=>call(path,{method:'POST',body:JSON.stringify(data)});
  async function refresh(){ try{ setRows(await call('/attendance')) }catch{} }
  useEffect(()=>{ if(page==='Dashboard') refresh() },[page]);
  useEffect(()=>(()=>{ stream?.getTracks().forEach(t=>t.stop()) }),[stream]);
  async function register(e){ e.preventDefault(); let f=new FormData(e.target); try{ await post('/register',{user_id:f.get('user_id'),name:f.get('name')}); setUser(f.get('user_id')); setNotice('Registered!'); setPage('Consent'); }catch(err){ setNotice(err.message) } }
  async function consent(accepted){ try{ await post('/consent',{user_id:user||'test',accepted}); setNotice(accepted?'Consent given':'Consent denied'); if(accepted) setPage('Camera'); }catch(err){ setNotice(err.message) } }
  async function punch(method){ try{ let d=await post('/attendance',{user_id:user||'test',method}); setNotice('Punch '+method); refresh(); }catch(err){ setNotice(err.message) } }
  async function openCamera(){ try{ let s=await navigator.mediaDevices.getUserMedia({video:true}); setStream(s); }catch(err){ setNotice('Camera failed: '+err.message) } }
  const nav=[['Register','UserPlus'],['Consent','ShieldCheck'],['Camera','Camera'],['Alternative','Clock'],['Dashboard','BarChart'],['Admin','Lock']];
  return (<div className="app"><aside className="sidebar"><div className="brand"><div className="mark">AW</div><div className="brandtext"><span>AttendWise</span><small>Consent-first attendance</small></div></div><nav>{nav.map(([k,ic])=><button key={k} className={page===k?'active':''} onClick={()=>setPage(k)}>{k}</button>)}</nav></aside><main>
    {notice && <div className="notice">{notice}</div>}
    {page==='Register'&&<section className="card formcard"><h2>Register</h2><form onSubmit={register}><input name="user_id" placeholder="User ID" required/><input name="name" placeholder="Name" required/><button type="submit">Register</button></form></section>}
    {page==='Consent'&&<section className="card"><h2>Consent</h2><p>We need consent for facial recognition attendance.</p><button onClick={()=>consent(true)}>Accept</button><button onClick={()=>consent(false)}>Deny</button></section>}
    {page==='Camera'&&<section className="card"><h2>Camera</h2><button onClick={openCamera}>Open Camera</button><div className="grid"><button onClick={()=>punch('in')}>Punch In</button><button onClick={()=>punch('out')}>Punch Out</button></div></section>}
    {page==='Dashboard'&&<section className="card"><h2>Dashboard</h2><p>Records: {rows.length}</p><pre>{JSON.stringify(rows,null,2)}</pre></section>}
    {page==='Admin'&&<section className="card formcard"><h2>Admin Login</h2><form onSubmit={async(e)=>{e.preventDefault();let f=new FormData(e.target);try{let res=await post('/admin/login',{username:f.get('username'),password:f.get('password')});setNotice('Admin OK') }catch(err){setNotice('Login failed: '+err.message)}}}> <input name="username" defaultValue="admin"/><input name="password" type="password" defaultValue="ChangeMe123!" /><button type="submit">Login</button></form></section>}
  </main><footer>Attendwise - Consent-based prototype</footer></div>) }
createRoot(document.getElementById('root')).render(<App/>);