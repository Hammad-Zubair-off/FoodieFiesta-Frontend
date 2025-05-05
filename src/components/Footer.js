import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../styles/theme';
import { FaArrowRight } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: white;
  padding: 3rem 2rem 1.5rem;
  border-top: 1px solid #eee;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const FooterLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  text-decoration: none;
  font-size: 15px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${theme.colors.primary};
    transform: translateX(5px);
  }

  svg {
    font-size: 12px;
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover svg {
    opacity: 1;
    transform: translateX(3px);
  }
`;

const BottomFooter = styled.div`
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 14px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 480px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  a {
    color: #666;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;

    &:hover {
      color: ${theme.colors.primary};
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterGrid>
        <FooterSection>
          <h3>Menu</h3>
          <ul>
            <li>
              <FooterLink to="/menu">
                Our Pizzas
                <FaArrowRight />
              </FooterLink>
            </li>
            <li>
              <FooterLink to="/offers">
                Offers
                <FaArrowRight />
              </FooterLink>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Support</h3>
          <ul>
            <li>
              <FooterLink to="/contact">
                Contact Us
                <FaArrowRight />
              </FooterLink>
            </li>
            <li>
              <FooterLink to="/faq">
                FAQs
                <FaArrowRight />
              </FooterLink>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Account</h3>
          <ul>
            <li>
              <FooterLink to="/login">
                Login
                <FaArrowRight />
              </FooterLink>
            </li>
            <li>
              <FooterLink to="/orders">
                My Orders
                <FaArrowRight />
              </FooterLink>
            </li>
          </ul>
        </FooterSection>
      </FooterGrid>

      <BottomFooter>
        <div>© {new Date().getFullYear()} FoodieFiesta Pizza. All rights reserved.</div>
        <FooterNav>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </FooterNav>
      </BottomFooter>
    </FooterContainer>
  );
};

export default Footer;