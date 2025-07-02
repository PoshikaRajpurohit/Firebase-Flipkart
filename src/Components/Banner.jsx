import { Carousel, Container } from "react-bootstrap";
import img1 from "../assets/Images/1.jpg";
import img2 from "../assets/Images/2.jpg";
import img3 from "../assets/Images/3.jpg";
import img4 from "../assets/Images/4.jpg";
import img5 from "../assets/Images/5.jpg";
import img6 from "../assets/Images/6.webp";
import img7 from "../assets/Images/7.webp";
import img8 from "../assets/Images/8.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import "../App.css";
const images = [img1, img2, img3, img4, img5, img6, img7, img8];
const Banner = () => {
  return (
    <Container fluid>
      <Carousel fade controls indicators interval={1000} className="my-3 custom-carousel mx-3" 
      prevIcon={<span className="custom-prev"><FaChevronLeft /></span>} nextIcon={<span className="custom-next"><FaChevronRight /></span>}
      >
        {images.map((img, idx) => (
          <Carousel.Item key={idx}>
            <img className="d-block w-100 carousel-image" src={img} alt={`Slide ${idx + 1}`}/>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};
export default Banner;


