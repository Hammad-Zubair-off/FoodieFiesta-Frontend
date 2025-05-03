import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../styles/theme';
import { FaArrowRight } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: white;
  padding: 4rem 6rem 2rem;
  border-top: 1px solid #eee;

  @media (max-width: 768px) {
    padding: 3rem 2rem 1.5rem;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

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

  .new-badge {
    background-color: ${theme.colors.primary}15;
    color: ${theme.colors.primary};
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 12px;
    margin-left: 0.5rem;
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
  padding-top: 2rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 14px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const FooterNav = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
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
          <h3>Product & Service</h3>
          <ul>
            <li><FooterLink to="#">Products</FooterLink></li>
            <li><FooterLink to="#">Services</FooterLink></li>
            <li><FooterLink to="#">Appliances</FooterLink></li>
            <li>
              <FooterLink to="#">
                Storage
                <span className="new-badge">New</span>
                <FaArrowRight />
              </FooterLink>
            </li>
            <li>
              <FooterLink to="#">
                Lifestyle
                <FaArrowRight />
              </FooterLink>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Shop Now</h3>
          <ul>
            <li><FooterLink to="#">Offers</FooterLink></li>
            <li><FooterLink to="#">Promos</FooterLink></li>
            <li><FooterLink to="#">Online Shop FAQ</FooterLink></li>
            <li>
              <FooterLink to="#">
                Business Offer
                <span className="new-badge">New</span>
                <FaArrowRight />
              </FooterLink>
            </li>
            <li>
              <FooterLink to="#">
                Student Offer
                <FaArrowRight />
              </FooterLink>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Support</h3>
          <ul>
            <li><FooterLink to="#">Contact</FooterLink></li>
            <li>
              <FooterLink to="#">
                Email Support
                <FaArrowRight />
              </FooterLink>
            </li>
            <li>
              <FooterLink to="#">
                Live Chat
                <FaArrowRight />
              </FooterLink>
            </li>
            <li><FooterLink to="#">Phone Support</FooterLink></li>
            <li>
              <FooterLink to="#">
                Community
                <FaArrowRight />
              </FooterLink>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Account</h3>
          <ul>
            <li><FooterLink to="#">My Products</FooterLink></li>
            <li><FooterLink to="#">Orders</FooterLink></li>
            <li><FooterLink to="#">Wishlist</FooterLink></li>
            <li>
              <FooterLink to="#">
                Service
                <span className="new-badge">New</span>
                <FaArrowRight />
              </FooterLink>
            </li>
            <li>
              <FooterLink to="#">
                Rewards
                <FaArrowRight />
              </FooterLink>
            </li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>About</h3>
          <ul>
            <li><FooterLink to="#">Company Info</FooterLink></li>
            <li><FooterLink to="#">Brand Guidelines</FooterLink></li>
            <li><FooterLink to="#">Careers</FooterLink></li>
            <li>
              <FooterLink to="#">
                Investors
                <span className="new-badge">New</span>
                <FaArrowRight />
              </FooterLink>
            </li>
            <li>
              <FooterLink to="#">
                About Us
                <FaArrowRight />
              </FooterLink>
            </li>
          </ul>
        </FooterSection>
      </FooterGrid>

      <BottomFooter>
        <div>© 2023 FoodieFiesta Ltd. All rights reserved.</div>
        <FooterNav>
          <Link to="#">English</Link>
          <Link to="#">Privacy</Link>
          <Link to="#">Legal</Link>
        </FooterNav>
      </BottomFooter>
    </FooterContainer>
  );
};

export default Footer; 