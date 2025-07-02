import '../App.css';
import kilos from '../assets/Images/kilos.png';
import mobile from '../assets/Images/mobile.png';
import fashion from '../assets/Images/fashion.png';
import electro from '../assets/Images/electro.png';
import home from '../assets/Images/home.jpg';
import applia from '../assets/Images/applia.jpg';
import flight from '../assets/Images/flight.png';
import kids from '../assets/Images/kids.png';
import wheeler from '../assets/Images/wheeler.png';
import { Container, Row, Col, Image } from 'react-bootstrap';
const CategoryMenu = () => {
  const categories = [
    { name: "Kilos", image: kilos },
    { name: "Mobiles", image: mobile },
    { name: "Fashion", image: fashion },
    { name: "Electronics", image: electro },
    { name: "Home & Furniture", image: home },
    { name: "Appliances", image: applia },
    { name: "Flight Bookings", image: flight },
    { name: "Beauty, Toys & More", image: kids },
    { name: "Two Wheelers", image: wheeler },
  ];
  return (
    <Container fluid className="my-4 px-4">
      <div className="bg-white rounded-3 shadow-sm p-3 category-menu">
        <Row className="g-3 justify-content-center">
          {categories.map((cat, idx) => (
            <Col key={idx} xs={4} sm={3} md={2} lg={1} className="text-center">
              <Image src={cat.image} alt={cat.name} fluid className="mb-2" style={{ height: '60px', objectFit: 'contain' }}/>
              <div className="fw-semibold" style={{ fontSize: '13px' }}>
                {cat.name}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default CategoryMenu;

