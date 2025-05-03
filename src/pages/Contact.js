import React, { useState } from "react";
import styled from "styled-components";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { theme } from "../styles/theme";

const ContactContainer = styled.div`
  padding: 6rem 0;
  background: linear-gradient(135deg, #fce4d6 0%, #ffe9e3 50%, #fff8f3 100%);
  min-height: calc(100vh - 80px);
`;

const Title = styled.h1`
  color: #e44d26;
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 3.5rem;
  margin-bottom: 3rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  &:after {
    content: "";
    display: block;
    width: 80px;
    height: 4px;
    background: #e44d26;
    margin: 1rem auto;
    border-radius: 2px;
  }
`;

const ContactCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(228, 77, 38, 0.08);
  margin-bottom: 2rem;
  border: 1px solid rgba(228, 77, 38, 0.1);
  height: 100%;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(228, 77, 38, 0.12);
  }
`;

const InfoSection = styled.div`
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(228, 77, 38, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  h3 {
    color: #e44d26;
    margin-bottom: 1.5rem;
    font-family: "Nunito", sans-serif;
    font-size: 1.8rem;
    font-weight: 600;
    position: relative;
    padding-left: 1rem;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background: #e44d26;
      border-radius: 2px;
    }
  }

  p {
    color: #2d3436;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: "Nunito", sans-serif;
    font-size: 1.1rem;
    line-height: 1.6;

    i {
      color: #e44d26;
      font-size: 1.2rem;
      width: 24px;
      text-align: center;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      i {
        transform: scale(1.1);
        transition: transform 0.3s ease;
      }
    }
  }
`;

const StyledForm = styled(Form)`
  .form-label {
    color: #2d3436;
    font-weight: 600;
    font-family: "Nunito", sans-serif;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  .form-control {
    border-radius: 12px;
    padding: 0.8rem 1.2rem;
    border: 2px solid #e8e8e8;
    font-family: "Nunito", sans-serif;
    font-size: 1rem;
    transition: all 0.3s ease;
    background-color: #fafafa;
    color: #2d3436;

    &:focus {
      border-color: #e44d26;
      box-shadow: 0 0 0 0.2rem rgba(228, 77, 38, 0.15);
      background-color: white;
    }

    &::placeholder {
      color: #95a5a6;
    }

    &:hover {
      border-color: #e44d26;
      background-color: white;
    }
  }

  textarea.form-control {
    min-height: 150px;
    resize: vertical;
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #e44d26 0%, #f16529 100%);
  border: none;
  padding: 1rem 2rem;
  font-weight: 600;
  font-family: "Nunito", sans-serif;
  font-size: 1.1rem;
  border-radius: 12px;
  width: 100%;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: linear-gradient(135deg, #f16529 0%, #e44d26 100%);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(228, 77, 38, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover:before {
    left: 100%;
  }
`;

const StyledAlert = styled(Alert)`
  border-radius: 12px;
  font-family: "Nunito", sans-serif;
  border: none;

  &.alert-success {
    background-color: #d4edda;
    color: #155724;
    border-left: 4px solid #28a745;
  }
`;

const FormTitle = styled.h3`
  color: #e44d26;
  font-family: "Nunito", sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  position: relative;
  padding-left: 1rem;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: #e44d26;
    border-radius: 2px;
  }
`;

const SocialLink = styled.a`
  text-decoration: none;
  color: #2d3436;
  transition: all 0.3s ease;

  &:hover {
    color: #e44d26;
    text-decoration: none;
    transform: translateX(5px);
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({
      type: "success",
      message: "Thank you for your message! We will get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <ContactContainer>
      <Container>
        <Title>Get in Touch</Title>
        <Row>
          <Col lg={5} className="mb-4 mb-lg-0">
            <ContactCard>
              <InfoSection>
                <h3>Contact Information</h3>
                <p>
                  <i className="fas fa-map-marker-alt"></i>
                  Johar Town, Lahore
                </p>
                <p>
                  <i className="fas fa-phone"></i>
                  +92 321 6610180
                </p>
                <p>
                  <i className="fas fa-envelope"></i>
                  hammadzubairofficial@gmail.com
                </p>
              </InfoSection>
              <InfoSection>
                <h3>Business Hours</h3>
                <p>
                  <i className="fas fa-clock"></i>
                  Monday - Friday: 11:00 AM - 10:00 PM
                </p>
                <p>
                  <i className="fas fa-clock"></i>
                  Saturday - Sunday: 12:00 PM - 11:00 PM
                </p>
              </InfoSection>
              <InfoSection>
                <h3>Follow Us</h3>
                <SocialLink href="#facebook">
                  <p>
                    <i className="fab fa-facebook"></i>
                    Facebook
                  </p>
                </SocialLink>
                <SocialLink href="#instagram">
                  <p>
                    <i className="fab fa-instagram"></i>
                    Instagram
                  </p>
                </SocialLink>
                <SocialLink href="#twitter">
                  <p>
                    <i className="fab fa-twitter"></i>
                    Twitter
                  </p>
                </SocialLink>
              </InfoSection>
            </ContactCard>
          </Col>
          <Col lg={7}>
            <ContactCard>
              <FormTitle>Send us a Message</FormTitle>
              {status.message && (
                <StyledAlert variant={status.type} className="mb-4">
                  {status.message}
                </StyledAlert>
              )}
              <StyledForm onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Your Email"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-4">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Subject"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Your Message"
                  />
                </Form.Group>
                <SubmitButton type="submit">Send Message</SubmitButton>
              </StyledForm>
            </ContactCard>
          </Col>
        </Row>
      </Container>
    </ContactContainer>
  );
};

export default Contact;
