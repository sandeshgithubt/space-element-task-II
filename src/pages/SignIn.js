
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import FacebookLogin from 'react-facebook-login';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider
} from "firebase/auth";
import { auth } from "../componants/firebase";
import { async } from "@firebase/util";

const SignIn = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email:"",
    password:""
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
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const googleAuthProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleAuthProvider);;
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleFacebookSignIn = async()=>{
    console.log("dgf")
    const fbAuthProvider = new FacebookAuthProvider();
    await signInWithPopup(auth, fbAuthProvider);
    navigate("/home");
  }
const handleSubmit= async(e)=>{
  e.preventDefault();
  setError("");
  try {
    console.log()
    const response = await signInWithEmailAndPassword(auth,formValues.email, formValues.password);
    console.log(response)
    if(response){
      navigate("/home");
    }
  } catch (err) {
    setError(err.message);
  }
}
    return(
        <>
        <div className="container-fluid">

            <div className="row">

                <div className="col-4 form-container">
                    <div>
                    <div className="p-4 box">
        <h2 className="mb-3">Sign In</h2>
        <div className="sign-in-detail">
        <p >Welcome back! Sign in your data that you entered during registration</p>
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={handleInputChange}
              name="email"
              value={formValues.email}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={handleInputChange}
              name="password"
              value={formValues.password}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="dark" type="Submit" className="btn-sign">
              Sign In
            </Button>
          </div>
        </Form>
        <hr />
      </div>
      <div className="p-1 box mt-1 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>

      <div className=" p-2 text-center">

        <p><b>--- Or Sign In with -- </b></p>
        <div className="google-btn">
        <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
//         <div>
//         <Button variant="primary" className="fb-btn" onClick={handleFacebookSignIn}>
//               Login with Facebook
//             </Button>
       
//         </div>
      </div>
                    </div>
                </div>



                <div className="col-md-8 col-sm-12">
                    <div className="background-signIn"></div>
                </div>
            </div>


        </div>
        </>

    )


}

export default SignIn
