
import React, { useState } from 'react';
import { Modal, Button, Carousel, Tabs, Tab, Form } from 'react-bootstrap';
import { motion } from 'framer-motion';
import './ProductDetailModal.css';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductDetailModal = ({ show, handleClose, product, handleAddToCart }) => {
  const [key, setKey] = useState('description');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Math.min(99, Number(e.target.value)));
    setQuantity(value);
  };

  const handleAddToCartClick = () => {
    handleAddToCart(product, quantity); // Pass product and quantity
    toast.success(`${product.title} added to cart!`);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      className="product-detail-modal"
      backdrop="static"
      keyboard={false}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{product.title}</Modal.Title>
        </Modal.Header>
      </motion.div>
      <Modal.Body>
        <motion.div
          className="modal-content-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="product-image-container">
            <Carousel indicators={false}>
              <Carousel.Item>
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
              </Carousel.Item>
             
            </Carousel>
          </div>
          <div className="product-details">
            <h4 className="product-price">${product.price.toFixed(2)}</h4>
            <div className="product-rating mb-3">
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
              <span className="ms-2">({product.rating.count} reviews)</span>
            </div>
            <Form.Group controlId="quantity" className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="99"
                value={quantity}
                onChange={handleQuantityChange}
                style={{ width: '100px' }}
              />
            </Form.Group>
            <div className="modal-action-buttons">
              <Button
                variant="primary"
                className="me-2"
                onClick={handleAddToCartClick}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </motion.div>
        <Tabs
          id="product-details-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mt-4"
        >
          <Tab eventKey="description" title="Description">
            <p className="mt-3">{product.description}</p>
          </Tab>
          <Tab eventKey="reviews" title="Reviews">
            <p className="mt-3">Customer reviews will be displayed here.</p>
          </Tab>
          <Tab eventKey="specs" title="Specifications">
            <p className="mt-3">Product specifications will be displayed here.</p>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailModal;
