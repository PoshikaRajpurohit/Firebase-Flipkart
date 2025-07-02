import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProductsAsync, deleteProductAsync } from "../Services/Action/ProductAction";
import { addToCartAsync } from "../Services/Action/CartAction";
import { useNavigate } from "react-router";
import Banner from "./Banner";
import CategoryMenu from "./Category";
import "../App.css";
import { FaShoppingCart, FaEdit, FaTrash } from "react-icons/fa";

const Home = () => {
  const { products = [], isLoading } = useSelector((state) => state.productReducer);
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProductsAsync());
    }
  }, [dispatch, products.length]);



  const handleAddToCart = (product) => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    dispatch(addToCartAsync(product),user);
  };


  const handleView = (id) => {
    navigate(`/view/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };
  const handleDelete = (id) => {
      dispatch(deleteProductAsync(id));  
  };
  return (
    <>
      <CategoryMenu />
      <Banner />
      <Container fluid className="py-5 ">
        {isLoading ? (
          <div className="text-center mt-5 ">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className="g-3 mx-3">
            {products.length > 0 ? (
              products.map((product) => (
                <Col xs={12} sm={6} md={4} lg={3} xl={2}key={product.id}>
                  <Card className="flipkart-card h-100 position-relative card-hover-group">
                    <div className="hover-btns position-absolute top-0 end-0 p-2 d-none flex-column">
                      <Button variant="outline-success" size="sm" className="mb-2" onClick={() => handleEdit(product.id)}>
                      <FaEdit />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(product.id)}>
                      <FaTrash />
                      </Button>
                    </div>                 
                    <div className="product-img-wrap" onClick={() => handleView(product.id)} style={{ cursor: "pointer" }}>
                      <Card.Img src={product.image} alt={product.title} className="product-img"/>
                    </div>                 
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <div onClick={() => handleView(product.id)} style={{ cursor: "pointer" }}>
                        <Card.Title className="product-title">{product.title}</Card.Title>
                        <Card.Text className="text-muted small mb-1">{product.category}</Card.Text>
                        <div className="fw-bold text-success mb-2">₹{product.price}</div>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <Button variant="dark" size="sm" onClick={() => handleAddToCart(product)} className="add-to-cart-btn px-4 py-2 
                        text-white">
                          <FaShoppingCart className="me-2" />
                          <span>Add to Cart</span>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">No products available</p>
            )}
          </Row>
        )}
      </Container>
    </>
  );
};
export default Home;


