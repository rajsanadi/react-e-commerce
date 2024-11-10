
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Fireworks from 'fireworks-js';
import './PaymentModal.css';

const PaymentModal = ({ show, handleClose }) => {
  const [stage, setStage] = useState('form'); 
  const [loading, setLoading] = useState(false);
  const fireworksRef = useRef(null);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStage('success');
    }, 2000);
  };

  const handleModalClose = () => {
    setStage('form');
    handleClose();
  };

  useEffect(() => {
    let fireworks;
    if (stage === 'success' && show) {
      fireworks = new Fireworks(fireworksRef.current, {
        speed: 2,
        acceleration: 1.05,
        friction: 0.98,
        gravity: 1.5,
        particles: 100,
        trace: 3,
        explosion: 5,
        autoresize: true,
        brightness: { min: 50, max: 80 },
        delay: { min: 10, max: 30 },
        colors: ['#cc3333', '#4CAF50', '#81C784', '#FF9800', '#E91E63'],
      });
      fireworks.start();
    }

    return () => {
      if (fireworks) fireworks.stop();
    };
  }, [stage, show]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleModalClose}
        centered
        size="lg"
        backdrop="static"
        keyboard={false}
        className="payment-modal"
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Payment Information</Modal.Title>
          </Modal.Header>
        </motion.div>
        <Modal.Body>
          {stage === 'form' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Form onSubmit={handlePaymentSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name on Card</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" required />
                </Form.Group>

                <Form.Group controlId="formCardNumber" className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    pattern="\d{4} \d{4} \d{4} \d{4}"
                    title="Enter card number in the format: 1234 5678 9012 3456"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formExpiry" className="mb-3">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control type="month" required />
                </Form.Group>

                <Form.Group controlId="formCVV" className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="123"
                    pattern="\d{3}"
                    title="Enter a 3-digit CVV"
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 pay-button">
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{' '}
                      Processing...
                    </>
                  ) : (
                    'Pay Now'
                  )}
                </Button>
              </Form>
            </motion.div>
          )}

          {stage === 'success' && (
            <motion.div
              className="text-center success-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="mb-4">Payment Successful!</h4>
              <div ref={fireworksRef} className="fireworks-container"></div>
              <Button
                variant="success"
                className="mt-4"
                onClick={handleModalClose}
              >
                Close
              </Button>
            </motion.div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PaymentModal;
