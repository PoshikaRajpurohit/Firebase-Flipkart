import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {Container,Row,Col,Button,Image,Card,Spinner,Modal,} from "react-bootstrap";
import {removeFromCartAsync,decrementQtyAsync,incrementQtyAsync,fetchCartAsync, clearCartAsync,} from "../Services/Action/CartAction";
import emptyCart from "../assets/Images/empty.webp";
import Success from "../assets/Images/SUCCESS.png"
import "../App.css";
import { placeOrderAsync } from "../Services/Action/OrderAction";
const Cart = () => {
  const { cartItems, loading } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.authReducer); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showOrderModal, setShowOrderModal] = useState(false);
 useEffect(() => {
  if (user) {
    dispatch(fetchCartAsync());
  }
  }, [user, dispatch]); 
  useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);
  useEffect(() => {
  if (!showOrderModal && user) {
    dispatch(fetchCartAsync());
  }
}, [showOrderModal, user]);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDiscount = cartItems.reduce((acc, item) => acc + item.quantity * 100, 0);
  const platformFee = 4;
  const finalAmount = totalAmount - totalDiscount + platformFee;
const handlePlaceOrder = async () => {
  if (user && cartItems.length > 0) {
    await dispatch(placeOrderAsync(cartItems, user.uid));
    await dispatch(clearCartAsync(user.uid));
    setShowOrderModal(true);
  }
};

  const handleModalClose = () => {
    setShowOrderModal(false);
    navigate("/");
  };
  return (
    <div className="cart-container py-5">
      <Container>
        <Row>
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : cartItems.length > 0 ? (
            <>
              <Col md={8}>
                {cartItems.map((item) => (
                  <Card className="cart-horizontal mb-3 shadow-sm" key={item.id}>
                    <Row className="g-0 align-items-center">
                      <Col md={4}>
                        <Image src={item.image} fluid className="p-3" />
                      </Col>
                      <Col md={5}>
                        <Card.Body className="text-start">
                          <Card.Title className="fw-semibold">{item.title}</Card.Title>
                          <Card.Text className="text-muted">Seller: RetailMart</Card.Text>
                          <Card.Text className="text-success fw-bold fs-5">
                            ₹{item.price * item.quantity}
                          </Card.Text>
                          <Card.Text className="text-muted">Delivery by Jun 25</Card.Text>
                        </Card.Body>
                      </Col>
                      <Col md={3} className="text-center my-3">
                        <div className="d-flex flex-column gap-2 align-items-center">
                          <div className="d-flex gap-2 align-items-center">
                            <Button variant="outline-secondary" size="sm" onClick={() => dispatch(decrementQtyAsync(item.id))}>
                              -
                            </Button>
                            <span className="fw-bold">{item.quantity}</span>
                            <Button variant="outline-secondary" size="sm" onClick={() => dispatch(incrementQtyAsync(item.id))}>
                              +
                            </Button>
                          </div>
                          <div>
                            <Button variant="link" className="text-dark fw-bold text-decoration-none">
                              SAVE FOR LATER
                            </Button>
                            <Button variant="link" className="text-dark fw-bold text-decoration-none" onClick={() => 
                            dispatch(removeFromCartAsync(item.id))}>
                              REMOVE
                            </Button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Col>
              <Col md={4}>
                <Card className="p-3 shadow-sm">
                  <h5 className="mb-3">PRICE DETAILS</h5>
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <span>Price ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>Discount</span>
                    <span>- ₹{totalDiscount}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Platform Fee</span>
                    <span>₹{platformFee}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fw-bold mb-3">
                    <span>Total Amount</span>
                    <span>₹{finalAmount}</span>
                  </div>
                  <p className="text-success">
                    You will save ₹{totalDiscount - platformFee} on this order
                  </p>
                  <Button className="w-100 bg-warning border-0 text-white fw-bold" onClick={handlePlaceOrder}>
                    PLACE ORDER
                  </Button>
                </Card>
              </Col>
            </>
          ) : (
            <Col md={12}>
              <div className="empty-cart-wrapper d-flex flex-column justify-content-center align-items-center">
                <Image src={emptyCart} alt="Empty cart" className="emptycart-img" />
                <h3 className="mt-2 fw-semibold">Your cart is empty!</h3>
                <p className="text-muted mb-4">Add items to it now.</p>
                <Button variant="primary" className="px-5 py-2 fw-semibold" onClick={() => navigate("/")}>
                  Shop now</Button>
              </div>
            </Col>
          )}
        </Row>
      </Container>
      <Modal show={showOrderModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Successful 🎉</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Image src={Success} alt="Success" width="100" className="mb-3"/>
          <p className="fw-semibold">Your order has been placed successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Cart;





