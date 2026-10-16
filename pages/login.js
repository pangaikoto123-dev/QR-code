import { useState } from 'react'
import { firebaseApp, auth } from '../lib/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/router'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [isNew,setIsNew]=useState(false)
  const [error,setError]=useState(null)
  const router = useRouter()

  async function submit(e){
    e.preventDefault()
    try{
      if(isNew){
        await createUserWithEmailAndPassword(auth,email,password)
      } else {
        await signInWithEmailAndPassword(auth,email,password)
      }
      router.push('/dashboard')
    }catch(err){
      setError(err.message)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>{isNew ? 'Create account' : 'Teacher Sign in'}</h2>
        <form onSubmit={submit}>
          <label className="small">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} required />
          <label className="small">Password</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          {error && <p style={{color:'red'}}>{error}</p>}
          <div style={{marginTop:12}}>
            <button className="btn" type="submit">{isNew ? 'Create account' : 'Sign in'}</button>
            <button type="button" style={{marginLeft:8}} onClick={()=>setIsNew(!isNew)} className="btn">{isNew ? 'Already have an account?' : 'Create account'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
