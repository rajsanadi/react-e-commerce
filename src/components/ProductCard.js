
import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaStar, FaHeart, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductCard.css';
import ProductDetailModal from './ProductDetailModal/ProductDetailModal';
import { motion } from 'framer-motion';

const ProductCard = ({
  product,
  handleAddToCart,
  handleToggleWishlist,
  isWishlisted,
}) => {
  const [modalShow, setModalShow] = useState(false);

  const handleCardClick = (e) => {
   
    if (
      e.target.tagName.toLowerCase() === 'button' ||
      e.target.closest('button')
    ) {
      return;
    }
    setModalShow(true);
  };

  const handleAddClick = (e) => {
    e.stopPropagation(); 
    handleAddToCart(product, 1); 
    toast.success(`${product.title} added to cart!`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation(); 
    handleToggleWishlist(product);
    toast.info(
      `${product.title} ${
        !isWishlisted ? 'added to' : 'removed from'
      } wishlist`
    );
  };

  const handleModalClose = () => setModalShow(false);

  return (
    <>
      <motion.div
        className="h-100 product-card-wrapper"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="h-100 product-card" onClick={handleCardClick}>
          <div className="position-relative">
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.title}
              className="product-image"
              loading="lazy"
            />
            
            <Button
              variant="link"
              className="wishlist-button position-absolute"
              onClick={handleWishlistClick}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <FaHeart color={isWishlisted ? '#ff4081' : '#ccc'} size={20} />
            </Button>
            
            
              
            
          </div>
          <Card.Body className="d-flex flex-column">
            <Card.Title className="text-truncate">
              {product.title}
            </Card.Title>
            <div className="rating">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  color={
                    index < Math.round(product.rating.rate)
                      ? '#ffc107'
                      : '#e4e5e9'
                  }
                />
              ))}
              <span className="text-muted">
                {' '}
                ({product.rating.count})
              </span>
            </div>
            <Card.Text className="price">
              ${product.price.toFixed(2)}
            </Card.Text>
            <div className="mt-auto">
              <Button
                variant="primary"
                className="add-to-cart-btn w-100"
                onClick={handleAddClick}
                aria-label="Add to Cart"
              >
                Add to Cart
              </Button>
            </div>
            
            <Button
              variant="link"
              className="view-details-button-mobile mt-2"
              onClick={() => setModalShow(true)}
              aria-label="View Details"
            >
              <FaInfoCircle className="me-2" />
              View Details
            </Button>
          </Card.Body>
        </Card>
      </motion.div>

      <ProductDetailModal
        show={modalShow}
        handleClose={handleModalClose}
        product={product}
        handleAddToCart={handleAddToCart} 
      />
    </>
  );
};

export default ProductCard;
