
import React from 'react';
import {
  Navbar,
  Container,
  Nav,
  Badge,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { FaShoppingCart, FaHeart, FaSearch } from 'react-icons/fa';
import './Navbar.css';

const AppNavbar = ({
  totalItems,
  wishlistCount,
  categories,
  selectedCategory,
  onCategoryChange,
  onSearchChange,
  onCartClick,
}) => {
  return (
    <Navbar className="custom-navbar">
      <Container fluid className="navbar-container">
        
        <Navbar.Brand href="#" className="d-flex align-items-center">
          
          <svg
            height="40px"
            width="40px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512.016 512.016"
            fill="#ffffff"
            className="me-2"
          >
            <polygon points="145.544,151.36 105.184,31.92 0.68,31.92 0.68,0 128.096,0 175.784,141.136"></polygon>
            <polygon
              style={{ fill: '#FFD67F' }}
              points="68.128,124.56 511.336,124.56 426.856,361.584 141.936,361.584"
            ></polygon>
            <circle cx="377.128" cy="450.56" r="61.456"></circle>
            <circle cx="191.752" cy="450.56" r="61.456"></circle>
            <polygon
              style={{ fill: '#FF583E' }}
              points="325.28,52.496 451.744,180.664 325.28,308.816 203.936,308.816 330.608,180.664 203.936,52.496"
            ></polygon>
          </svg>
          <span className="brand-name">Shopify</span>
        </Navbar.Brand>

       
        <Form className="d-flex search-bar mx-3">
          <FormControl
            type="search"
            placeholder="Search products"
            className="me-2"
            aria-label="Search"
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Button variant="outline-light" className="search-button">
            <FaSearch />
          </Button>
        </Form>

        
        <Nav className="ms-auto nav-items">
          
          <NavDropdown
            title="Categories"
            id="categoriesDropdown"
            className="nav-item"
            onSelect={(eventKey) => onCategoryChange(eventKey)}
          >
            {categories.map((category) => (
              <NavDropdown.Item
                key={category}
                eventKey={category}
                active={selectedCategory === category}
              >
                {category}
              </NavDropdown.Item>
            ))}
          </NavDropdown>

          
          <Nav.Link href="#" className="nav-item position-relative me-3">
            <FaHeart size={20} />
            {wishlistCount > 0 && (
              <Badge pill className="badge-count">
                {wishlistCount}
              </Badge>
            )}
          </Nav.Link>

          
          <Nav.Link
            href="#"
            className="cart-link nav-item position-relative"
            onClick={(e) => {
              e.preventDefault(); 
              onCartClick();
            }}
          >
            <FaShoppingCart size={20} />
            {totalItems > 0 && (
              <Badge pill className="badge-count">
                {totalItems}
              </Badge>
            )}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
