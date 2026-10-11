import React, { useState } from "react"
import ReactDOM from "react-dom/client"

function App(){
 const [page, setPage] = useState("home")
 const [empId, setEmpId] = useState("")
 return (
  <div style={{padding:"20px", fontFamily:"Arial"}}>
   <h1>Consent Attendance Prototype</h1>
   <div style={{display:"flex", gap:"10px", flexWrap:"wrap", marginBottom:"20px"}}>
    <button onClick={()=>setPage("register")}>Register</button>
    <button onClick={()=>setPage("consent")}>Consent</button>
    <button onClick={()=>setPage("camera")}>Camera</button>
    <button onClick={()=>setPage("alternative")}>Alternative</button>
    <button onClick={()=>setPage("dashboard")}>Dashboard</button>
    <button onClick={()=>setPage("admin")}>Admin</button>
   </div>
   {page==="home" && <p>Welcome! Click Register to start.</p>}
   {page==="register" && <div><h2>Register</h2><input placeholder="EMP001" value={empId} onChange={e=>setEmpId(e.target.value)} /><button onClick={()=>{localStorage.setItem("empId",empId); alert("Registered "+empId); setPage("consent")}}>Register</button></div>}
   {page==="consent" && <div><h2>Consent</h2><p>I consent to face attendance.</p><button onClick={()=>{localStorage.setItem("consent","yes"); setPage("alternative")}}>I Agree</button></div>}
   {page==="camera" && <div><h2>Camera</h2><button onClick={()=>alert("Face Verified Success for "+(localStorage.getItem("empId")||"EMP001"))}>Demo Punch In</button></div>}
   {page==="alternative" && <div><h2>Alternative Attendance</h2><input id="altId" defaultValue={localStorage.getItem("empId")||""} /><button onClick={()=>{const id=document.getElementById("altId").value; const logs=JSON.parse(localStorage.getItem("logs")||"[]"); logs.push({id,time:new Date().toLocaleString()}); localStorage.setItem("logs",JSON.stringify(logs)); alert("Attendance Marked "+id)}}>Punch In</button></div>}
   {page==="dashboard" && <div><h2>Dashboard</h2><pre>{localStorage.getItem("logs")}</pre></div>}
   {page==="admin" && <div><h2>Admin</h2><pre style={{background:"#eee",padding:"10px"}}>{localStorage.getItem("logs")||"No logs"}</pre></div>}
  </div>
 )
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />)