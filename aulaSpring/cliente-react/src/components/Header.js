import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = ({ activeTab, onTabChange }) => {
  return (
    <Navbar bg="primary" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              href="#" 
              className={activeTab === 'listar' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                onTabChange('listar');
              }}
            >
              <i className="fas fa-list me-2"></i>
              Listar Pessoas
            </Nav.Link>
            <Nav.Link 
              href="#" 
              className={activeTab === 'cadastrar' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                onTabChange('cadastrar');
              }}
            >
              <i className="fas fa-plus me-2"></i>
              Cadastrar Pessoa
            </Nav.Link>
          </Nav>
          <Navbar.Text>
            React + Spring Boot
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
