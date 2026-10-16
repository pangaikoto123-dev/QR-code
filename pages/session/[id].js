import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { db } from '../../lib/firebase'
import { doc, getDoc, collection, addDoc, serverTimestamp, query, getDocs, orderBy } from 'firebase/firestore'

export default function SessionPage(){
  const router = useRouter()
  const { id } = router.query
  const [session, setSession] = useState(null)
  const [attendees, setAttendees] = useState([])

  useEffect(()=>{
    if(!id) return
    async function load(){
      const dref = doc(db,'sessions',id)
      const snap = await getDoc(dref)
      if(!snap.exists()){ setSession(null); return }
      setSession({id:snap.id,...snap.data()})
      const q = query(collection(db,`sessions/${id}/attendees`), orderBy('createdAt','desc'))
      const s = await getDocs(q)
      setAttendees(s.docs.map(d=>({id:d.id,...d.data()})))
    }
    load()
  },[id])

  function qrLink(){
    if(!session) return ''
    const base = (typeof window !== 'undefined') ? window.location.origin : ''
    return `${base}/attend?session=${session.id}&token=${session.token}`
  }

  return (
    <div className="container">
      <div className="card">
        {!session && <p>Loading...</p>}
        {session && (
          <>
            <h2>Session {session.token}</h2>
            <p className="small">Scan this QR to open student attendance form.</p>
            <div style={{marginTop:12}}>
              <img alt="qr" src={`https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(qrLink())}`} />
            </div>

            <h3 style={{marginTop:16}}>Attendees ({attendees.length})</h3>
            {attendees.length===0 && <p className="small">No attendees yet.</p>}
            {attendees.length>0 && (
              <table className="table">
                <thead><tr><th>Name</th><th>Grade</th><th>Section</th><th>Time</th></tr></thead>
                <tbody>
                  {attendees.map(a=> (
                    <tr key={a.id}><td>{a.name}</td><td>{a.grade}</td><td>{a.section}</td><td>{a.createdAt?.toDate ? a.createdAt.toDate().toLocaleString() : '—'}</td></tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  )
}
