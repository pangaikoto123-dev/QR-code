import { useEffect, useState } from 'react'
import { auth } from '../lib/firebase'
import { sendEmailVerification, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'

export default function Verify(){
  const [message,setMessage] = useState(null)
  const router = useRouter()

  useEffect(()=> {
    const u = auth.currentUser
    if(!u) router.push('/login')
    else if(u.emailVerified) router.push('/dashboard')
  },[])

  async function resend(){
    const u = auth.currentUser
    if(!u) return
    await sendEmailVerification(u)
    setMessage('Verification email sent — check your inbox.')
    await signOut(auth)
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Verify your email</h2>
        <p className="small">We sent a verification email. You must verify to access the dashboard.</p>
        <button className="btn" onClick={resend}>Resend verification & sign out</button>
        {message && <p style={{color:'green', marginTop:12}}>{message}</p>}
      </div>
    </div>
  )
}
