import React, { useState } from 'react';
import './Navbar.css';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Dropdown, Container, Nav, Navbar as BootstrapNavbar, Modal, Form, Button, Alert } from 'react-bootstrap';
import { theme } from '../styles/theme';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  background-color: #FFF8F3;
  box-shadow: ${theme.shadows.default};
  position: relative;

  @media (max-width: 1024px) {
    padding: 1rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    flex-wrap: wrap;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 10;

  @media (max-width: 768px) {
    display: block;
  }

  span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: ${theme.colors.primary};
    margin: 5px 0;
    transition: 0.3s;
  }

  &.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
  }

  &.active span:nth-child(2) {
    opacity: 0;
  }

  &.active span:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-family: ${theme.typography.fontFamily};
  font-weight: bold;
  font-size: 24px;
  color: ${theme.colors.primary};
  
  span {
    color: ${theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    text-align: center;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #FFF8F3;
    padding: 1rem;
    box-shadow: ${theme.shadows.default};
    display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
    z-index: 5;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-family: ${theme.typography.fontFamily};
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  padding: 0.2rem 0;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.5rem 0;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${theme.colors.primary};
  }

  &:hover::after {
    width: 100%;
  }

  &.active::after {
    width: 100%;
  }
`;

const LoginButton = styled(Link)`
  padding: 0.5rem 2rem;
  background-color: transparent;
  border: 2px solid ${theme.colors.primary};
  border-radius: 25px;
  color: ${theme.colors.primary};
  font-family: ${theme.typography.fontFamily};
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 0.5rem 1rem;
  }

  &:hover {
    background-color: ${theme.colors.primary};
    color: white;
  }
`;



// Admin Login Modal Component
const AdminLoginModal = ({ show, handleClose, handleSubmit, error, loading }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Admin Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(formData);
                }}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </Form.Group>
                    <div className="d-grid">
                        <Button 
                            variant="primary" 
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login as Admin'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

// Main Navbar Component
const Navbar = () => {
    const cartState = useSelector(state => state.cartReducer);
    const { user, isAuthenticated, isAdmin, login, logout } = useAuth();
    const navigate = useNavigate();
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [adminError, setAdminError] = useState('');
    const [adminLoading, setAdminLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
        setIsMenuOpen(false);
    };

    const handleAdminLogin = async (formData) => {
        setAdminError('');
        setAdminLoading(true);
        try {
            const result = await login(formData.email, formData.password, true);
            if (result.success) {
                setShowAdminModal(false);
                navigate('/admin/dashboard');
            } else {
                setAdminError(result.error);
            }
        } catch (err) {
            setAdminError(err.message || 'Failed to log in');
        } finally {
            setAdminLoading(false);
        }
    };

    return (
        <>
            <NavbarContainer>
                <Logo to="/">
                    <span>Food</span>fiesta
                </Logo>
                
                <HamburgerButton 
                    className={isMenuOpen ? 'active' : ''} 
                    onClick={toggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </HamburgerButton>

                {user?.role === 'admin' ? (
                    // Admin Navigation
                    <NavLinks $isOpen={isMenuOpen}>
                        <NavLink to="/admin/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
                        <LoginButton as="button" onClick={handleLogout}>Logout</LoginButton>
                    </NavLinks>
                ) : (
                    // Regular User Navigation
                    <>
                        <NavLinks $isOpen={isMenuOpen}>
                            <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                            <NavLink to="/menu" onClick={() => setIsMenuOpen(false)}>Our Menu</NavLink>
                            <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About us</NavLink>
                            <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact us</NavLink>
                        </NavLinks>

                        {user ? (
                            <NavLinks $isOpen={isMenuOpen}>
                                <NavLink to="/cart" onClick={() => setIsMenuOpen(false)}>Cart</NavLink>
                                <NavLink to="/orders" onClick={() => setIsMenuOpen(false)}>Orders</NavLink>
                                <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</NavLink>
                                <LoginButton as="button" onClick={handleLogout}>Logout</LoginButton>
                            </NavLinks>
                        ) : (
                            <LoginButton to="/login" onClick={() => setIsMenuOpen(false)}>Login</LoginButton>
                        )}
                                </>
                            )}
            </NavbarContainer>

            <AdminLoginModal
                show={showAdminModal}
                handleClose={() => setShowAdminModal(false)}
                handleSubmit={handleAdminLogin}
                error={adminError}
                loading={adminLoading}
            />
        </>
    );
};

export default Navbar;