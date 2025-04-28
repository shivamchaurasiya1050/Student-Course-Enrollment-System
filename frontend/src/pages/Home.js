import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="py-5">
      <Row className="align-items-center mb-5">
        <Col md={6}>
          <h1 className="display-4 fw-bold mb-4">Welcome to Our Platform</h1>
          <p className="lead mb-4">
            Discover amazing features and services designed just for you.
          </p>
          <div className="d-flex gap-3">
            <Button as={Link} to="/" variant="primary" size="lg">
              Explore Features
            </Button>
            <Button as={Link} to="/register" variant="outline-primary" size="lg">
              Sign Up
            </Button>
          </div>
        </Col>
        <Col md={6}>
          <img 
            src="https://source.unsplash.com/random/600x400/?technology" 
            alt="Hero illustration" 
            className="img-fluid rounded shadow"
          />
        </Col>
      </Row>
      <h2 className="text-center mb-5">Why Choose Us?</h2>
      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div className="bg-light p-3 rounded-circle d-inline-block mb-3">
                <i className="bi bi-lightning text-primary" style={{ fontSize: '2rem' }}></i>
              </div>
              <Card.Title>Fast Service</Card.Title>
              <Card.Text>
                Experience lightning-fast performance and response times.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div className="bg-light p-3 rounded-circle d-inline-block mb-3">
                <i className="bi bi-shield-check text-primary" style={{ fontSize: '2rem' }}></i>
              </div>
              <Card.Title>Secure Platform</Card.Title>
              <Card.Text>
                Your data is protected with enterprise-grade security.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div className="bg-light p-3 rounded-circle d-inline-block mb-3">
                <i className="bi bi-headset text-primary" style={{ fontSize: '2rem' }}></i>
              </div>
              <Card.Title>24/7 Support</Card.Title>
              <Card.Text>
                Our team is always ready to help you with any questions.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="bg-light p-5 rounded-3 text-center">
        <h2 className="mb-4">Ready to get started?</h2>
        <Button as={Link} to="/register" variant="primary" size="lg" className="px-4">
          Join Now - It's Free
        </Button>
      </div>
    </Container>
  );
};

export default Home;