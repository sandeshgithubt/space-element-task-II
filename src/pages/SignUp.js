import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../componants/firebase";

const SignUp = () => {
  const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
      fname:"",
      mobile:"",
      email:"",
      password:"",
      cnfPassword:""
    });
    const [error, setError] = useState("");

    const handleInputChange = (e)=>{
      e.preventDefault();
        const value = e.target.value;
        const name = e.target.name;
        console.log(name,value)
        setFormValues({
          ...formValues,
          [name]:value,
      })
    }
const handleSubmit=async(e)=>{
  e.preventDefault();
  setError("");
  try {
    const response = await createUserWithEmailAndPassword(auth,formValues.email, formValues.password);
    console.log(response)
    if(response){
      navigate("/home");
    }
  } catch (err) {
    setError(err.message);
  }
}
useEffect(()=>{
  console.log(formValues)
},[formValues])

    return(
        <>
        <div className="container-fluid">

            <div className="row">
                    <div className="col-4 form-container">
                    <div className="mobile-view">
                    <div className="p-4 box">
        <h2 className="mb-3">Sign Up</h2>
        <div className="sign-in-detail">
        <p >Welcome back! Sign in your data that you entered during registration</p>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="formBasicname">
            <Form.Control
              type="text"
              name="fname"
              placeholder="Name"
              onChange={handleInputChange}
              value={formValues.name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicmobile">
            <Form.Control
              type="text"
              name="mobile"
              placeholder="Mobile No"
              onChange={handleInputChange}
              value={formValues.mobile}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleInputChange}
              value={formValues.email}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={formValues.password}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formcnfPassword">
            <Form.Control
              type="password"
              name="cnfPassword"
              placeholder="Confirm Password"
              onChange={handleInputChange}
              value={formValues.cnfPassword}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="dark" type="Submit" className="btn-sign">
              Sign Up
            </Button>
          </div>
        </Form>
        <hr />
        {/* <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          /> 
        </div>
    */}
      </div>
      <div className="p-1 box mt-1 text-center">
       Already a user ? <Link to="/">Sign In</Link>
      </div>

     
                    </div>
                </div>
                        
                  
                {/* section 2 */}
                <div className="col-md-8 col-sm-12">
                    <div className="background-signUp"></div>
                </div>
            </div>


        </div>
        </>

    )

}

export default SignUp;