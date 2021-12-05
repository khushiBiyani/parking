import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import firebase from "firebase/app"
import {firebase as app} from "../firebase"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleLogin(event) {
    event.preventDefault()

    var provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope("https://www.googleapis.com/auth/userinfo.email") // see: https://developers.google.com/identity/protocols/oauth2/scopes

    const result = await app.auth().signInWithPopup(provider)
    //const result = await app.auth().signInWithRedirect(provider)

    var user = result.user
    var providerId = result.additionalUserInfo.providerId
    var profile = result.additionalUserInfo.profile
    var token = result.credential.accessToken
    console.log("USER:", user) // user.uid, user.displayName, user.email, user.emailVerified, user.phoneNumber, user.photoURL, user.refreshToken
    console.log("PROVIDER:", providerId)
    console.log("USER PROFILE:", profile)
    console.log("ACCESS TOKEN", token)
    // TODO: store this user info in the database, perhaps firestore
    // This is automatically stored in Auth Context

    console.log("LOGIN SUCCESS")
    //flash({message:"Login success. Welcome back!", variant: "success"})
    history.push("/")
}

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
    <div style={{backgroundImage: `url("https://i.ibb.co/c2N6H3y/ithink2.png")`,backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minWidth: '100vw',
        height: '100vh'
    }}>
    <div className="w-100" style={{maxWidth: "400px", marginLeft: '800px', marginTop: '250px'}}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit" >
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3" style={{marginBottom:'12px'}}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <Form onSubmit={handleLogin}>
                        <Button className="w-100" type="submit">
                            Log using Google
                        </Button>
          </Form>

        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2" style={{color:"white"}}>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
    </div>

    </>
  )
}
