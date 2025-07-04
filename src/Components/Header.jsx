import {Navbar,Nav,Container,Badge,NavDropdown,Form,InputGroup,Dropdown,} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaBars, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/Images/logo.svg";
import "../App.css"; 
import { signOutAsync } from "../Services/Action/AuthAction";
import { clearCart } from "../Services/Action/CartAction";


const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch =useDispatch()
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { user } = useSelector(state => state.authReducer);
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${search}`);
      setSearch("");
    }
  };
    const handleLogout = () => {
    dispatch(signOutAsync());
    clearCart()
  };
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-2 sticky-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          <img src={logo} alt="logo" height="35" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Form onSubmit={handleSearch} className="d-flex mx-lg-4 mt-3 mt-lg-0 flex-grow-1">
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search for Products, Brands and More" value={search} 
              onChange={(e) => setSearch(e.target.value)}/>
            </InputGroup>
          </Form>
          <Nav className="ms-auto align-items-center  gap-2 mt-3 mt-lg-0">
            <Dropdown className="hover-dropdown">
                 {user ? (
          <Dropdown className="hover-dropdown">
          <Dropdown.Toggle variant="white" id="user-dropdown" className="border-0 navbar">
          <FaUserCircle className="me-1" />
          {user.displayName || user.email}
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/sign-up">
            New Customer? Sign Up
          </Dropdown.Item>
          <Dropdown.Divider />
              <Dropdown.Item>My Profile</Dropdown.Item>
              <Dropdown.Item>Orders</Dropdown.Item>
              <Dropdown.Item>Wishlist</Dropdown.Item>
              <Dropdown.Item>Rewards</Dropdown.Item>
              <Dropdown.Item>Gift Cards</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
        <Link to="/sign-in" className="nav-link">
        <FaUserCircle className="me-1" /> Login
        </Link>
        )}
        </Dropdown>
            <Nav.Link as={Link} to="/cart" className="position-relative navbar">
              <FaShoppingCart className="me-1" />
              <span>Cart</span>
              {cartItems.length > 0 && (
                <Badge bg="danger" pill className="ms-1">
                  {cartItems.length}
                </Badge>
              )}
            </Nav.Link>
            <Nav.Link as={Link} to="/seller" className="navbar">Become a Seller</Nav.Link>
            <Nav.Link as={Link} to="/add" className="navbar">Add Product</Nav.Link>         
            <NavDropdown title={<FaBars />} id="bars-dropdown" align="end">
              <NavDropdown.Item>Customer Support</NavDropdown.Item>
              <NavDropdown.Item>Advertise</NavDropdown.Item>
              <NavDropdown.Item>Download App</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;

