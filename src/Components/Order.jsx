import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { useSelector } from "react-redux";
import { Container, Card, Row, Col, Image } from "react-bootstrap";

const MyOrders = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        const q = query(collection(db, "orders"), where("userId", "==", user.uid));
        const snapshot = await getDocs(q);
        setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      };
      fetchOrders();
    }
  }, [user]);

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-primary fw-bold">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-muted">You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <Card className="mb-4 shadow-sm border-0" key={order.id}>
            <Card.Header className="bg-light">
              <Row className="justify-content-between">
                <Col><strong>Order ID:</strong> {order.id}</Col>
                <Col className="text-end"><strong>Placed on:</strong> {order.createdAt.toDate().toDateString()}</Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {order.items.map((item) => (
                <Row className="align-items-center mb-3" key={item.id}>
                  <Col md={2}>
                    <Image src={item.image || item.img} alt={item.title} fluid rounded />
                  </Col>
                  <Col md={7}>
                    <h6 className="fw-semibold">{item.title}</h6>
                    <p className="mb-1 text-muted">Qty: {item.quantity}</p>
                    <p className="text-success fw-bold">₹{item.price * item.quantity}</p>
                  </Col>
                  <Col md={3} className="text-end">
                    <span className="badge bg-success">Delivered</span>
                  </Col>
                </Row>
              ))}
            </Card.Body>
            <Card.Footer className="bg-white d-flex justify-content-between">
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

