import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Pagination, InputGroup, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Product, ProductPage, Category } from '../types';
import { productsAPI, categoriesAPI } from '../services/api';
import { useCart } from '../context/CartContext';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('asc');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedCategory, sortBy, sortDir]);

  const fetchCategories = async () => {
    try {
      const categoriesData = await categoriesAPI.getAll();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let productPage: ProductPage;

      if (searchTerm) {
        productPage = await productsAPI.search(searchTerm, currentPage, 12);
      } else if (selectedCategory) {
        productPage = await productsAPI.getByCategory(selectedCategory, currentPage, 12);
      } else if (minPrice && maxPrice) {
        productPage = await productsAPI.getByPriceRange(
          parseFloat(minPrice),
          parseFloat(maxPrice),
          currentPage,
          12
        );
      } else {
        productPage = await productsAPI.getAll(currentPage, 12, sortBy, sortDir);
      }

      setProducts(productPage.content);
      setTotalPages(productPage.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(0);
    fetchProducts();
  };

  const handleCategoryFilter = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(0);
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
  };

  const handlePriceFilter = () => {
    if (minPrice && maxPrice) {
      setCurrentPage(0);
      setSelectedCategory(null);
      setSearchTerm('');
      fetchProducts();
    }
  };

  const handleSort = (newSortBy: string, newSortDir: string) => {
    setSortBy(newSortBy);
    setSortDir(newSortDir);
    setCurrentPage(0);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(0);
    setSortBy('id');
    setSortDir('asc');
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const renderPagination = () => {
    const items = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (currentPage > 0) {
      items.push(
        <Pagination.First key="first" onClick={() => setCurrentPage(0)} />
      );
      items.push(
        <Pagination.Prev key="prev" onClick={() => setCurrentPage(currentPage - 1)} />
      );
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => setCurrentPage(page)}
        >
          {page + 1}
        </Pagination.Item>
      );
    }

    if (currentPage < totalPages - 1) {
      items.push(
        <Pagination.Next key="next" onClick={() => setCurrentPage(currentPage + 1)} />
      );
      items.push(
        <Pagination.Last key="last" onClick={() => setCurrentPage(totalPages - 1)} />
      );
    }

    return <Pagination className="justify-content-center">{items}</Pagination>;
  };

  return (
    <div>
      <h1 className="mb-4">Products</h1>

      {/* Filters and Search */}
      <Row className="mb-4">
        <Col md={6}>
          <Form onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-secondary" type="submit">
                Search
              </Button>
            </InputGroup>
          </Form>
        </Col>
        <Col md={6}>
          <Row>
            <Col>
              <Form.Control
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button variant="outline-secondary" onClick={handlePriceFilter}>
                Filter
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <div className="d-flex flex-wrap gap-2 category-filter">
            <Button
              variant={selectedCategory === null ? "primary" : "outline-primary"}
              size="sm"
              onClick={() => handleCategoryFilter(null)}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "primary" : "outline-primary"}
                size="sm"
                onClick={() => handleCategoryFilter(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </Col>
        <Col md={6} className="text-end">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" size="sm">
              Sort by: {sortBy} ({sortDir})
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSort('name', 'asc')}>Name (A-Z)</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('name', 'desc')}>Name (Z-A)</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('price', 'asc')}>Price (Low-High)</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('price', 'desc')}>Price (High-Low)</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('createdAt', 'desc')}>Newest First</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="outline-danger" size="sm" className="ms-2" onClick={clearFilters}>
            Clear Filters
          </Button>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product.id} md={6} lg={4} xl={3} className="mb-4">
                <Card className="h-100 product-card">
                  <Card.Img
                    variant="top"
                    src={product.imageUrl}
                    className="product-image"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-truncate">{product.name}</Card.Title>
                    <Card.Text className="text-muted small flex-grow-1">
                      {product.description.length > 80
                        ? `${product.description.substring(0, 80)}...`
                        : product.description
                      }
                    </Card.Text>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="price-display mb-0">₹{product.price}</h5>
                        <small className="text-muted">Stock: {product.stockQuantity}</small>
                      </div>
                      <div className="d-grid gap-2">
                        <LinkContainer to={`/products/${product.id}`}>
                          <Button variant="outline-primary" size="sm">View Details</Button>
                        </LinkContainer>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stockQuantity === 0}
                        >
                          {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {products.length === 0 && (
            <div className="text-center mt-5">
              <h4>No products found</h4>
              <p>Try adjusting your search or filters</p>
            </div>
          )}

          {totalPages > 1 && renderPagination()}
        </>
      )}
    </div>
  );
};

export default Products;