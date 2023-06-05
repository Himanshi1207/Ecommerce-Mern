import React from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import './Signup.css'
import {useLoginMutation} from '../services/appAPI'
import { Alert  } from "react-bootstrap";
function Login() {
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [login, {isError, isLoading, error}]=useLoginMutation()
    function handleLogin(e){
      e.preventDefault();
      login({email, password});
    }
  return (
    <Container>
      <Row>
        <Col md={6} className="login__form__container">
            <Form style={{width:"100%"}} onSubmit={handleLogin}>
                <h1>Login to your account</h1>
                {isError && <Alert variant="danger">{error.data}</Alert>}
                <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} required onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password} required onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Button type="submit" disabled={isLoading}>Login</Button>
                </Form.Group>
                <p>Don't have an account? <Link to="/signup">Create Account</Link>{""}</p>
            </Form>
        </Col>
        <Col md={6} className="login__image__container"></Col>
      </Row>
    </Container>
  );
}

export default Login;