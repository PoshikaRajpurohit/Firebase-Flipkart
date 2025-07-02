import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // ✅ fix import
import { useDispatch, useSelector } from "react-redux";
import { signUpAsync } from "../Services/Action/AuthAction";
import '../App.css';

const SignUP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isCreated, errorMSG } = useSelector((state) => state.authReducer || {});
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({});
  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(inputForm.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!inputForm.password.trim()) {
      newErrors.password = "Password is required";
    } else if (inputForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!inputForm.cpassword.trim()) {
      newErrors.cpassword = "Confirm Password is required";
    } else if (inputForm.password !== inputForm.cpassword) {
      newErrors.cpassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(signUpAsync(inputForm));
    }
  };
  useEffect(() => {
    if (isCreated) {
      navigate("/sign-in");
    }
  }, [isCreated]);
  return (
    <div className="sign-container">
      <h1 className="sign-title">Sign Up</h1>
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
          <Form.Label column sm="3">Password</Form.Label>
          <Col sm="9">
            <Form.Control type="password" placeholder="Enter Your Password" name="password" value={inputForm.password} onChange={handleChanged} 
            isInvalid={!!errors.password}/>
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Confirm Password</Form.Label>
          <Col sm="9">
            <Form.Control type="password" placeholder="Confirm Your Password" name="cpassword" value={inputForm.cpassword} 
            onChange={handleChanged} isInvalid={!!errors.cpassword}/>
            <Form.Control.Feedback type="invalid">{errors.cpassword}</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Button type="submit" className="w-100 btn-primary">Sign Up</Button>
      </Form>
      <p className="signup-link mt-3">
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUP;
