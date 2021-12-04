import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
/* import { useAuth } from "../contexts/AuthContext" */
import { useHistory } from "react-router-dom"
import firebase from '../../firebase'
 
export default function AddWorker() {
  const emailRef = useRef()
  const nameRef=useRef()
  const addressRef=useRef()
  /* const { addworker } = useAuth() */
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
 
  async function handleSubmit(e) {
    e.preventDefault()
 
    /* if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match") */
    /* } */
    try {
      setError("")
      setLoading(true)
      
      firebase.firestore().collection('workers').add({
        email: emailRef.current.value,
        // password: passwordRef,
        // passwordConfirm: passwordConfirmRef,
        address: addressRef.current.value,
        name: nameRef.current.value,
        /* carnumber: carnoRef.current.value, */
        roleId: 3
      })
      history.push("/")
    } catch(error) {
      setError("Failed to create an account"+error)
    }
 
    setLoading(false)
  }
 
  return (
    <>
    <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Worker Details</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="w_email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="w_email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="w_name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="w_name" ref={nameRef} required />
            </Form.Group>
            {/* <Form.Group id="w_password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="w_password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="w_password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="w_password" ref={passwordConfirmRef} required />
            </Form.Group> */}
            <Form.Group id="w_servProvided">
              <Form.Label>Services Provided</Form.Label>
              <Form.Control type="w_servProvided" ref={addressRef} required />
            </Form.Group>
            
            <Form.Group id="w_address">
              <Form.Label>Residential Address</Form.Label>
              <Form.Control type="w_address" ref={addressRef} required />
            </Form.Group>
            
            <Button disabled={loading} className="w-100" type="submit">
              Add Worker
            </Button>
          </Form>
        </Card.Body>
      </Card>
      
      </div>
    </>
  )
}