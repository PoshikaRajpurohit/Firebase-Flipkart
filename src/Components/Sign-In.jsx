import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import glogo from "../assets/Images/google logo.png"
import { googleSignInAsync, signINAsync } from "../Services/Action/AuthAction";
import '../App.css'; 
const SignIN = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, errorMSG } = useSelector((state) => state.authReducer);
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };
  const validate = () => {
    const newErrors = {};
    if (!inputForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputForm.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!inputForm.password.trim()) {
      newErrors.password = "Password is required";
    } else if (inputForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(signINAsync(inputForm));
    }
  };
  const handleGoogleLoginIN = () => {
    dispatch(googleSignInAsync());
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="sign-container">
      <h1 className="sign-title">Sign In</h1>
      {errorMSG && <p className="error-msg">{errorMSG}</p>}
      <Form onSubmit={handleSubmit} className="sign-form">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Email</Form.Label>
          <Col sm="9">
            <Form.Control type="text" placeholder="Enter Your Email" name="email" value={inputForm.email} onChange={handleChanged} 
            isInvalid={!!errors.email}/>
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3"> Password</Form.Label>
          <Col sm="9">
            <Form.Control type="password" placeholder="Enter Your Password" name="password" value={inputForm.password} onChange={handleChanged} 
            isInvalid={!!errors.password}/>
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Button type="submit" className="w-100 btn-primary">Sign In</Button>
      </Form>
      <Button onClick={handleGoogleLoginIN} className="google-btn w-100 mt-3">
        <img src={glogo} alt="Google" className="google-icon" />Sign in with Google</Button>
      <p className="signup-link mt-3">Create a New Account? <Link to={"/sign-up"}>Sign UP</Link>
      </p>
    </div>
  );
};

export default SignIN;
