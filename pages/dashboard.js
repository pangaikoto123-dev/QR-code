import { useEffect, useState } from 'react'
import { auth, db } from '../lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy } from 'firebase/firestore'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'

export default function Dashboard(){
  const [user,setUser]=useState(null)
  const [sessions,setSessions]=useState([])
  const router = useRouter()

  useEffect(()=>{
    return onAuthStateChanged(auth, u=>{
      if(!u) router.push('/login')
      else setUser(u)
    })
  },[])

  useEffect(()=>{
    if(!user) return
    async function load(){
      const q = query(collection(db,'sessions'), where('owner','==',user.uid), orderBy('createdAt','desc'))
      const snap = await getDocs(q)
      setSessions(snap.docs.map(d=>({id:d.id,...d.data()})))
    }
    load()
  },[user])

  async function createSession(){
    const token = uuidv4().slice(0,8)
    const doc = await addDoc(collection(db,'sessions'),{owner:user.uid,token,createdAt:serverTimestamp(),active:true})
    // open page showing QR link
    router.push(`/session/${doc.id}`)
  }

  return (
    <div className="container">
      <div className="card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h2>Teacher Dashboard</h2>
          <div>
            <button className="btn" onClick={createSession}>Create session</button>
            <Link href="/"><a style={{marginLeft:8}}>Home</a></Link>
            <button className="btn" onClick={()=>signOut(auth)} style={{marginLeft:8}}>Sign out</button>
          </div>
        </div>

        <h3>Active sessions</h3>
        {sessions.length===0 && <p className="small">No sessions yet.</p>}
        {sessions.length>0 && (
          <table className="table">
            <thead><tr><th>Token</th><th>Created</th><th>View</th></tr></thead>
            <tbody>
              {sessions.map(s=> (
                <tr key={s.id}>
                  <td>{s.token}</td>
                  <td>{s.createdAt?.toDate ? s.createdAt.toDate().toLocaleString() : '—'}</td>
                  <td><Link href={`/session/${s.id}`}><a>Open</a></Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
