import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import "../App.css";
import { FaMoneyCheckAlt, FaRegCreditCard } from "react-icons/fa";
import { GiBank } from "react-icons/gi";
const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;
  const initialState = {
    name: "",
    address: "",
    pin: "",
    upiId: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    paymentMethod: "cod",
  };
  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (!product) {
      navigate("/");
    }
  }, [product, navigate]);
  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const validateForm = () => {
    const { name, address, pin, upiId, paymentMethod, cardNumber, expiry, cvv } = inputForm;
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Full Name is required.";
    if (!address.trim()) newErrors.address = "Address is required.";
    if (!pin.trim() || !/^\d{6}$/.test(pin)) newErrors.pin = "Valid 6-digit PIN is required.";
    if (paymentMethod === "upi" && !upiId.trim()) newErrors.upiId = "UPI ID is required.";
    if (paymentMethod === "card") {
      if (!cardNumber.trim() || !/^\d{16}$/.test(cardNumber)) newErrors.cardNumber = "Card number is required.";
      if (!expiry.trim()) newErrors.expiry = "Expiry date is required.";
      if (!cvv.trim()) newErrors.cvv = "CVV is required.";
    }
    return newErrors;
  };
  const handleConfirmOrder = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    alert("🎉 Order placed successfully!");
    navigate("/");
  };
  const { name, address, pin, upiId, paymentMethod, cardNumber, expiry, cvv } = inputForm;
  if (!product) return null;
  return (
    <Container className="checkout-container py-5">
      <h3 className="checkout-heading mb-4">Checkout</h3>
      <Row>
        <Col md={6}>
          <Card className="checkout-card p-3 mb-4">
            <h5>Delivery Address</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control name="name" type="text" value={name} placeholder="Your name" onChange={handleChanged} isInvalid={!!errors.name}/>
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control name="address" as="textarea" rows={3} value={address} placeholder="Your Address" onChange={handleChanged}
                 isInvalid={!!errors.address}/>
                <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>PIN Code</Form.Label>
                <Form.Control name="pin" type="text" value={pin} placeholder="Your Pincode" onChange={handleChanged} 
                isInvalid={!!errors.pin}/>
                <Form.Control.Feedback type="invalid">{errors.pin}</Form.Control.Feedback>
              </Form.Group>
            </Form>
          </Card>
          <Card className="checkout-card p-3">
            <h5>Payment Method</h5>
            <div className="payment-methods d-flex flex-column gap-2">
              {["cod", "upi", "card"].map((method) => (
                <label key={method} className={`payment-box ${paymentMethod === method ? "selected" : ""}`}>
                  <input type="radio" name="paymentMethod" value={method} checked={paymentMethod === method} 
                  onChange={handleChanged} className="hidden-radio"/>
                  <div className="payment-content">
                    <span className="payment-icon">
                      {method === "cod" ? <FaMoneyCheckAlt /> : method === "upi" ? <GiBank /> : <FaRegCreditCard />}
                    </span>
                    <span>{method === "cod" ? "Cash on Delivery" : method === "upi" ? "UPI Payment" : "Credit / Debit Card"}</span>
                  </div>
                </label>
              ))}
            </div>
            {paymentMethod === "upi" && (
              <Form.Group className="mt-3">
                <Form.Label>Enter UPI ID</Form.Label>
                <Form.Control name="upiId" type="text" placeholder="e.g. name@upi" value={upiId} onChange={handleChanged} 
                isInvalid={!!errors.upiId}/>
                <Form.Control.Feedback type="invalid">{errors.upiId}</Form.Control.Feedback>
              </Form.Group>
            )}
            {paymentMethod === "card" && (
              <div className="mt-3">
                <Form.Group className="mb-2">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control name="cardNumber" type="text" placeholder="Your Card number" value={cardNumber} onChange={handleChanged} 
                  isInvalid={!!errors.cardNumber}/>
                  <Form.Control.Feedback type="invalid">{errors.cardNumber}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Expiry</Form.Label>
                  <Form.Control name="expiry" type="text" placeholder="MM/YY" value={expiry} onChange={handleChanged} 
                  isInvalid={!!errors.expiry}/>
                  <Form.Control.Feedback type="invalid">{errors.expiry}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control name="cvv" type="password" placeholder="***" value={cvv} onChange={handleChanged} isInvalid={!!errors.cvv}/>
                  <Form.Control.Feedback type="invalid">{errors.cvv}</Form.Control.Feedback>
                </Form.Group>
              </div>
            )}
          </Card>
        </Col>
        <Col md={4}>
          <Card className="checkout-card p-3">
            <h5>Order Summary</h5>
            <div className="checkout-summary-item"><strong>Product:</strong> {product.title}</div>
            <div className="checkout-summary-item"><strong>Price:</strong> ₹{product.price}</div>
            <div className="checkout-summary-item"><strong>Quantity:</strong> 1</div>
            <div className="checkout-summary-item"><strong>Subtotal:</strong> ₹{product.price}</div>
            <div className="checkout-summary-item text-success"><strong>Discount:</strong> - ₹{Math.floor(product.price / 2)}</div>
            <div className="checkout-summary-item"><strong>Delivery Charges:</strong> ₹40</div>
            <hr />
            <div className="checkout-summary-item fw-bold"><strong>Total Amount:</strong> ₹{Math.floor(product.price / 2) + 40}</div>
            <p className="text-success mt-2">You saved ₹{Math.floor(product.price)} on this order 🎉</p>
            <Button className="w-100 mt-3 confirm-btn" onClick={handleConfirmOrder}>
              Confirm Order
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Checkout;


