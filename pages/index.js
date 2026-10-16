import Link from 'next/link'

export default function Home(){
  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>QR Attendance</h1>
          <nav>
            <Link href="/login"><a className="btn">Teacher Sign in</a></Link>
          </nav>
        </div>
        <p className="small">QR Attendance is a progressive web app that lets teachers create time-limited random QR codes for attendance. Students scan the QR code and submit their name, grade, and section. Attendance is recorded and visible to the teacher.</p>

        <h3>How it works</h3>
        <ol>
          <li>Teacher signs up / logs in.</li>
          <li>Teacher generates a session (random QR code link).</li>
          <li>Students scan the QR with their phone camera which opens the attendance form.</li>
          <li>Students fill name, grade, section — submissions are saved.</li>
          <li>Teacher opens the session dashboard and sees the list of attendees.</li>
        </ol>

        <h3>Progressive Web App</h3>
        <p className="small">Installable on mobile/desktop. Works offline for previously visited pages.</p>

        <h3>Next steps</h3>
        <ul>
          <li>Configure a Firebase project and set environment variables.</li>
          <li>Deploy to Vercel and add Firebase credentials in Project Settings &gt; Environment Variables.</li>
        </ul>

      </div>
    </div>
  )
}
