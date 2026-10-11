import { useState } from "react"

export default function App(){
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

   {page==="home" && <p>Welcome! Click Register to start. Project deployed successfully.</p>}
   
   {page==="register" && (
    <div>
     <h2>Register</h2>
     <input placeholder="Employee ID e.g. EMP001" value={empId} onChange={e=>setEmpId(e.target.value)} />
     <button onClick={()=>{localStorage.setItem("empId",empId); alert("Registered: "+empId); setPage("consent")}}>Register</button>
    </div>
   )}

   {page==="consent" && (
    <div>
     <h2>Consent</h2>
     <p>I consent to face attendance for office purpose.</p>
     <button onClick={()=>{localStorage.setItem("consent","yes"); alert("Consent Given"); setPage("alternative")}}>I Agree</button>
    </div>
   )}

   {page==="camera" && (
    <div>
     <h2>Camera - Face Attendance</h2>
     <p>Camera module - Demo mode</p>
     <button onClick={()=>alert("Face Verified - Punch In Success (demo) for "+ (localStorage.getItem("empId")||"EMP001"))}>Demo Punch In</button>
    </div>
   )}

   {page==="alternative" && (
    <div>
     <h2>Alternative Attendance</h2>
     <input placeholder="Enter ID" defaultValue={localStorage.getItem("empId")||""} id="altId" />
     <button onClick={()=>{const id=document.getElementById("altId").value; const logs=JSON.parse(localStorage.getItem("logs")||"[]"); logs.push({id,time:new Date().toLocaleString()}); localStorage.setItem("logs",JSON.stringify(logs)); alert("Attendance Marked for "+id)}}>Punch In</button>
    </div>
   )}

   {page==="dashboard" && (
    <div>
     <h2>Dashboard</h2>
     <p>Employee: {localStorage.getItem("empId")}</p>
     <p>Consent: {localStorage.getItem("consent")}</p>
     <pre>{localStorage.getItem("logs")}</pre>
    </div>
   )}

   {page==="admin" && (
    <div>
     <h2>Admin - All Logs</h2>
     <pre style={{background:"#eee", padding:"10px"}}>{localStorage.getItem("logs")||"No logs yet"}</pre>
    </div>
   )}
  </div>
 )
}