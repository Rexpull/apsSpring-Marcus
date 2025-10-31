import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = ({ activeTab, onTabChange }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ borderRadius: '0 0 12px 12px' }}>
      <Container fluid>
        <Navbar.Brand style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
          <i className="fas fa-address-book me-2"></i>
          Sistema de Gestão
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ gap: '0.5rem' }}>
            <Nav.Link 
              href="#" 
              className={activeTab === 'listar' ? 'active fw-bold' : ''}
              onClick={(e) => {
                e.preventDefault();
                onTabChange('listar');
              }}
              style={{ 
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                transition: 'all 0.3s'
              }}
            >
              <i className="fas fa-table me-2"></i>
              Visualizar Registros
            </Nav.Link>
            <Nav.Link 
              href="#" 
              className={activeTab === 'cadastrar' ? 'active fw-bold' : ''}
              onClick={(e) => {
                e.preventDefault();
                onTabChange('cadastrar');
              }}
              style={{ 
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                transition: 'all 0.3s'
              }}
            >
              <i className="fas fa-user-plus me-2"></i>
              Novo Registro
            </Nav.Link>
          </Nav>
          <Navbar.Text className="ms-3 ps-3" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
            <small>Spring Boot API</small>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
