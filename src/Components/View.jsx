import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProductAsync } from "../Services/Action/ProductAction";
import { addToCartAsync } from "../Services/Action/CartAction";
import {Container,Row,Col,Image,Spinner,Button,ListGroup,Badge,} from "react-bootstrap";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
const ViewProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, isLoading } = useSelector((state) => state.productReducer);
  useEffect(() => {
    dispatch(getProductAsync(id));
  }, [dispatch, id]);
  const handleAddToCart = () => {
    dispatch(addToCartAsync(product));
    navigate("/cart");
  };
  const handleBuyNow = () => {
  navigate("/checkout", { state: { product } }); 
};

  if (isLoading || !product) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <Container className="py-4">
      <Row className="gx-5 gy-4">     
        <Col xs={12} md={4} className="text-center">
          <Link to="/" className="btn btn-outline-secondary mb-3"> <FaArrowLeft/>  Back to Home</Link>
          <Image src={product.image} alt={product.title} fluid className="border mb-3 " style={{ maxHeight: "400px", objectFit: "contain" }}/>
          <div className="d-flex w-100 gap-2 px-2">
            <Button variant="warning" className="w-50 text-white fw-bold" onClick={handleAddToCart}>
              <FaShoppingCart /> Go to Cart
            </Button>
            <Button variant="danger" className="w-50 fw-bold" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </Col>
        <Col xs={12} md={8} className="mt-5">
          <h3 className="text-start mt-4">{product.title}</h3>
          <p className="text-muted text-start">{product.category}</p>
          <p className="text-muted text-start">{product.desc}</p>
          <div className="d-flex align-items-center gap-2 mb-2">
            <Badge bg="success">4.1 ★</Badge>
            <span className="text-muted">(42,000+ Ratings)</span>
          </div>
          <h4 className="text-success text-start">
            ₹{product.price}{" "}
            <small className="text-muted text-decoration-line-through">
              ₹{Math.floor(product.price * 2)}
            </small>{" "}
            <span className="text-danger">50% off</span>
          </h4>
          <ListGroup variant="flush" className="my-3 text-start">
            <ListGroup.Item>
              <strong>Available offers:</strong>
            </ListGroup.Item>
            <ListGroup.Item>🎁 10% Cashback on SuperMoney UPI</ListGroup.Item>
            <ListGroup.Item>💳 ₹750 off on HDFC Credit Cards</ListGroup.Item>
            <ListGroup.Item>
              🔥 5% unlimited cashback on Flipkart Axis card
            </ListGroup.Item>
          </ListGroup>
          
          <Row className="g-2 mt-3">
            {[...Array(4)].map((_, i) => (
              <Col key={i} xs={3} sm={2}>
                <Image src={product.image} fluid className="border" style={{ height: "60px", objectFit: "contain" }}/>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewProduct;

