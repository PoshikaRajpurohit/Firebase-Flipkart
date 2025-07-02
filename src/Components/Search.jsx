import  { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Col, Container, Row } from "react-bootstrap";
import "../App.css"
const SearchResults = () => {
  const { search } = useLocation(); 
  const query = new URLSearchParams(search).get("q")?.toLowerCase() || "";

  const { products } = useSelector((state) => state.productReducer);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const result = products.filter((p) =>
      p.title.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
    setFilteredProducts(result);
  }, [query, products]);

  return (
    <Container className="py-5">
      {filteredProducts.length > 0 ? (
        <Row className="g-4">
          {filteredProducts.map((product) => (
            <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card className="h-100">
                <div className="product-img-wrap">
                <Card.Img variant="top" src={product.image} style={{ height: "200px", objectFit: "contain" }} className="product-img"/>
                </div>
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-muted small">{product.category}</Card.Text>
                  <div className="fw-bold text-success mb-2">₹{product.price}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center text-muted mt-5 fs-4">
          No matches found for "<strong>{query}</strong>"
        </div>
      )}
    </Container>
  );
};
export default SearchResults;
