import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Form, Badge, Alert } from 'react-bootstrap';
import { Product } from '../types';
import { productsAPI } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const productData = await productsAPI.getById(parseInt(id));
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && product && value <= product.stockQuantity) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center mt-5">
        <h4>Product not found</h4>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div>
      {showAlert && (
        <Alert variant="success" className="mb-4">
          Product added to cart successfully!
        </Alert>
      )}
      
      <Row>
        <Col md={6}>
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="img-fluid rounded"
            style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
          />
        </Col>
        <Col md={6}>
          <div className="ps-md-4">
            <h1 className="mb-3">{product.name}</h1>
            
            <div className="mb-3">
              <Badge bg="secondary" className="me-2">
                {product.category.name}
              </Badge>
              {product.stockQuantity > 0 ? (
                <Badge bg="success">In Stock ({product.stockQuantity} available)</Badge>
              ) : (
                <Badge bg="danger">Out of Stock</Badge>
              )}
            </div>

            <h2 className="price-display mb-4">₹{product.price}</h2>

            <div className="mb-4">
              <h5>Description</h5>
              <p className="text-muted">{product.description}</p>
            </div>

            {product.stockQuantity > 0 && (
              <div className="mb-4">
                <Row className="align-items-center">
                  <Col xs="auto">
                    <Form.Label htmlFor="quantity" className="mb-0">Quantity:</Form.Label>
                  </Col>
                  <Col xs="auto">
                    <Form.Control
                      id="quantity"
                      type="number"
                      min="1"
                      max={product.stockQuantity}
                      value={quantity}
                      onChange={handleQuantityChange}
                      style={{ width: '80px' }}
                    />
                  </Col>
                </Row>
              </div>
            )}

            <div className="d-grid gap-2 d-md-flex">
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className="me-md-2"
              >
                {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              <Button 
                variant="outline-secondary" 
                size="lg"
                onClick={() => navigate('/products')}
              >
                Back to Products
              </Button>
            </div>

            <div className="mt-4 pt-4 border-top">
              <h6>Product Details</h6>
              <ul className="list-unstyled">
                <li><strong>Category:</strong> {product.category.name}</li>
                <li><strong>Stock:</strong> {product.stockQuantity} units</li>
                <li><strong>Added:</strong> {new Date(product.createdAt).toLocaleDateString()}</li>
                <li><strong>Last Updated:</strong> {new Date(product.updatedAt).toLocaleDateString()}</li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;