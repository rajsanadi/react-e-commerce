
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from './components/ProductCard';
import AppNavbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

 
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        const uniqueCategories = ['All', ...new Set(data.map((item) => item.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        setError(error.message);
        toast.error(`Error: ${error.message}`); 
      });
  }, []);

  // Add to Cart
  const handleAddToCart = (product, quantity = 1) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
      //toast.info(`${product.title} quantity increased in cart.`);
      console.log('Updated Cart:', updatedCart);
    } else {
      const updatedCart = [...cart, { ...product, quantity }];
      setCart(updatedCart);
      //toast.success(`${product.title} added to cart!`);
      console.log('Updated Cart:', updatedCart);
    }
  };

  // Remove from Cart
  const handleRemoveFromCart = (productId, quantity = 1) => {
    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
      let updatedCart;
      if (existingProduct.quantity <= quantity) {
        updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        toast.warn(`${existingProduct.title} removed from cart.`);
      } else {
        updatedCart = cart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - quantity }
            : item
        );
        setCart(updatedCart);
        //toast.info(`${existingProduct.title} quantity decreased.`);
      }
      console.log('Updated Cart:', updatedCart);
    }
  };

  // Toggle Wishlist
  const handleToggleWishlist = (product) => {
    const isWishlisted = wishlist.some((item) => item.id === product.id);

    if (isWishlisted) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      //toast.warn(`${product.title} removed from wishlist.`);
    } else {
      setWishlist([...wishlist, product]);
      //toast.success(`${product.title} added to wishlist!`);
    }
  };

  // Handle Search
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Handle Category Change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Open Cart Sidebar
  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  // Close Cart Sidebar
  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  // Total Items in Cart
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Filter Products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  
  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <>
      {/* Navbar */}
      <AppNavbar
        totalItems={totalCartItems}
        wishlistCount={wishlist.length}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        onCartClick={handleCartOpen}
      />

      
      <Container className="product-list">
        {products.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {filteredProducts.map((product) => (
              <Col key={product.id}>
                <ProductCard
                  product={product}
                  handleAddToCart={handleAddToCart} 
                  handleToggleWishlist={handleToggleWishlist}
                  isWishlisted={wishlist.some((item) => item.id === product.id)}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      
      <CartSidebar
        show={isCartOpen}
        handleClose={handleCartClose}
        cartItems={cart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleAddToCart={handleAddToCart}
      />

      
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
