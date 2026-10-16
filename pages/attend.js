import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { db } from '../lib/firebase'
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function Attend(){
  const router = useRouter()
  const { session, token } = router.query
  const [valid, setValid] = useState(null)
  const [sessionData, setSessionData] = useState(null)
  const [name,setName]=useState('')
  const [grade,setGrade]=useState('')
  const [section,setSection]=useState('')
  const [message,setMessage]=useState(null)

  useEffect(()=>{
    if(!session) return
    async function load(){
      const d = doc(db,'sessions',session)
      const snap = await getDoc(d)
      if(!snap.exists()) { setValid(false); return }
      const data = snap.data()
      if(token !== data.token){ setValid(false); return }
      setValid(true)
      setSessionData({id:snap.id,...data})
    }
    load()
  },[session,token])

  async function submit(e){
    e.preventDefault()
    if(!valid) return
    await addDoc(collection(db,`sessions/${session}/attendees`),{name,grade,section,createdAt:serverTimestamp()})
    setMessage('Thanks — your attendance has been recorded')
    setName(''); setGrade(''); setSection('')
  }

  if(valid===null) return <div className="container"><div className="card">Checking session...</div></div>
  if(!valid) return <div className="container"><div className="card">Invalid or expired QR link.</div></div>

  return (
    <div className="container">
      <div className="card">
        <h2>Attendance for session {sessionData.token}</h2>
        <form onSubmit={submit}>
          <label className="small">Full name</label>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
          <label className="small">Grade</label>
          <input className="input" value={grade} onChange={e=>setGrade(e.target.value)} required />
          <label className="small">Section</label>
          <input className="input" value={section} onChange={e=>setSection(e.target.value)} required />
          <div style={{marginTop:12}}>
            <button className="btn" type="submit">Submit Attendance</button>
          </div>
        </form>
        {message && <p style={{color:'green'}}>{message}</p>}
      </div>
    </div>
  )
}
