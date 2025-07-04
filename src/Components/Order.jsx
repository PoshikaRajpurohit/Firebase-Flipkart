import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { useSelector } from "react-redux";
import { Container, Card, Row, Col, Image, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const MyOrders = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
   useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        toast.warn("Please sign in to view your orders.");
        setTimeout(() => navigate("/sign-in"), 1200);
        return;
      }
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid)
        );
        const snap = await getDocs(q);
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setOrders(data);
        if (data.length === 0) {
          toast.info("You haven’t placed any orders yet.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, navigate]);
  return (
    <Container className="my-5">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <h2 className="mb-4 text-primary fw-bold">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-muted">You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <Card className="mb-4 shadow-sm border-0" key={order.id}>
            <Card.Header className="bg-light">
              <Row className="justify-content-between">
                <Col><strong>Order ID:</strong> {order.id}</Col>
                <Col className="text-end">
                  <strong>Placed on:</strong>{" "}
                  {order.createdAt?.toDate ? order.createdAt.toDate().toDateString() : "N/A"}
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {order.items.map((item, index) => (
                <Row className="align-items-center mb-3" key={index}>
                  <Col xs={12} md={2} className="mb-2 mb-md-0">
                    <Image
                      src={item.image || item.img || "https://via.placeholder.com/150"}
                      alt={item.title || "Product"}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col xs={12} md={7}>
                    <h6 className="fw-semibold">{item.title || "Product Title"}</h6>
                    <p className="mb-1 text-muted">Qty: {item.quantity}</p>
                    <p className="text-success fw-bold">₹{item.price * item.quantity}</p>
                  </Col>
                  <Col xs={12} md={3} className="text-md-end">
                    <span className="badge bg-success">Delivered</span>
                  </Col>
                </Row>
              ))}
            </Card.Body>
            <Card.Footer className="bg-white d-flex justify-content-between flex-wrap">
              <span className="fw-semibold">Total Items: {order.items.reduce((acc, item) => acc + item.quantity, 0)}</span>
              <span className="fw-bold text-primary">
                ₹{order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
              </span>
            </Card.Footer>
          </Card>
        ))
      )}
    </Container>
  );
};

export default MyOrders;

