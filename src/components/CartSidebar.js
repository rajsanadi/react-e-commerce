
import React, { useState } from 'react';
import { Offcanvas, Button, ListGroup, Image, Form, Badge } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import './CartSidebar.css';
import PaymentModal from './PaymentModal/PaymentModal'; 

const CartSidebar = ({
  show,
  handleClose,
  cartItems,
  handleRemoveFromCart,
  handleAddToCart,
}) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const [showPayment, setShowPayment] = useState(false);

  const handleProceedToCheckout = () => {
    setShowPayment(true);
  };

  const handlePaymentClose = () => {
    setShowPayment(false);
    handleClose();
  };

  
  console.log('Cart Items:', cartItems);

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        scroll={true}
        backdrop={false}
        className="cart-sidebar"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id} className="d-flex align-items-center mb-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                    />
                    <div className="ms-3 flex-grow-1">
                      <h6 className="mb-1">{item.title}</h6>
                      <p className="mb-1">${item.price.toFixed(2)}</p>
                      <div className="d-flex align-items-center">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleRemoveFromCart(item.id, 1)}
                          className="me-2"
                        >
                          <FaMinus />
                        </Button>
                        <Form.Control
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="mx-2 text-center"
                          style={{ width: '40px', padding: '0.25rem 0.5rem' }}
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleAddToCart(item, 1)}
                          className="me-2"
                        >
                          <FaPlus />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemoveFromCart(item.id, item.quantity)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="mt-4">
                <h5>Total: ${totalPrice.toFixed(2)}</h5>
                <Button
                  variant="success"
                  className="w-100 mt-2"
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Payment Modal */}
      <PaymentModal show={showPayment} handleClose={handlePaymentClose} />
    </>
  );
};

export default CartSidebar;
