import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { theme } from "../styles/theme";
import HammadProfile from "../Images/HammadProfile.png";

const AboutContainer = styled.div`
  padding: 6rem 0;
  background: linear-gradient(135deg, #fff8f3 0%, #fff1e9 100%);
  min-height: calc(100vh - 80px);
`;

const Title = styled.h1`
  color: ${theme.colors.primary};
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
    background: ${theme.colors.primary};
    margin: 1rem auto;
    border-radius: 2px;
  }
`;

const Section = styled.section`
  margin-bottom: 4rem;
  padding: 0 1rem;
`;

const SectionTitle = styled.h2`
  color: ${theme.colors.primary};
  font-family: "Nunito", sans-serif;
  font-size: 2.2rem;
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
    background: ${theme.colors.primary};
    border-radius: 2px;
  }
`;

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a4a4a;
  margin-bottom: 1.8rem;
  font-family: "Nunito", sans-serif;
  letter-spacing: 0.3px;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  height: 100%;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
    border-color: ${theme.colors.primary}20;
  }

  h3 {
    color: ${theme.colors.primary};
    font-family: "Nunito", sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  p {
    color: #666;
    font-size: 1.05rem;
    line-height: 1.7;
    margin-bottom: 0;
    font-family: "Nunito", sans-serif;
  }
`;

const StorySection = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  margin-bottom: 4rem;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;

  &:before {
    content: "";
    position: absolute;
    top: -15px;
    left: -15px;
    right: 15px;
    bottom: 15px;
    border: 3px solid ${theme.colors.primary};
    border-radius: 20px;
    z-index: 1;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
  position: relative;
  z-index: 2;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
`;

const FounderInfo = styled.div`
  margin-top: 2rem;
  text-align: center;

  h3 {
    color: ${theme.colors.primary};
    font-family: "Nunito", sans-serif;
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    font-family: "Nunito", sans-serif;
    font-size: 1.1rem;
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <Container>
        <Title>Our Story</Title>

        <StorySection>
          <Row className="align-items-center">
            <Col lg={5}>
              <ProfileImageContainer>
                <ProfileImage
                  src={HammadProfile}
                  alt="Hammad - Founder of FoodieFiesta"
                />
              </ProfileImageContainer>
              <FounderInfo>
                <h3>Hammad</h3>
                <p>Founder & Head Chef</p>
              </FounderInfo>
            </Col>
            <Col lg={7}>
              <SectionTitle>Who We Are</SectionTitle>
              <Text>
                Founded in 2023, FoodieFiesta was born from a passion for creating
                the perfect food experience. What started as a small
                family-owned pizzeria has grown into a beloved destination for
                food lovers, while maintaining our commitment to quality and
                tradition.
              </Text>
              <Text>
                We believe that great food comes from great ingredients,
                time-honored techniques, and most importantly, the love and
                dedication we put into every pie we create. Our journey began
                with a simple dream: to serve the most authentic and delicious
                foods while creating memorable experiences for our customers.
              </Text>
              <SectionTitle>Our Mission</SectionTitle>
              <Text>
                At FoodieFiesta, our mission is to serve the most delicious and
                authentic foods while providing an exceptional dining
                experience. We're committed to using the finest ingredients,
                supporting local suppliers, and maintaining sustainable
                practices.
              </Text>
            </Col>
          </Row>
        </StorySection>

        <Section>
          <SectionTitle>What Sets Us Apart</SectionTitle>
          <Row>
            <Col md={4}>
              <FeatureCard>
                <h3>
                  <i className="fas fa-leaf" style={{ color: "#4CAF50" }}></i>
                  Quality Ingredients
                </h3>
                <p>
                  We source the freshest, highest-quality ingredients from
                  trusted local suppliers, ensuring every bite is packed with
                  authentic flavors.
                </p>
              </FeatureCard>
            </Col>
            <Col md={4}>
              <FeatureCard>
                <h3>
                  <i
                    className="fas fa-utensils"
                    style={{ color: "#FF5722" }}
                  ></i>
                  Expert Craftsmanship
                </h3>
                <p>
                  Our foods are crafted by experienced chefs who are passionate
                  about their art, bringing years of expertise to every food
                  they create.
                </p>
              </FeatureCard>
            </Col>
            <Col md={4}>
              <FeatureCard>
                <h3>
                  <i className="fas fa-heart" style={{ color: "#E91E63" }}></i>
                  Customer First
                </h3>
                <p>
                  Your satisfaction is our top priority. We go above and beyond
                  to ensure every visit exceeds your expectations.
                </p>
              </FeatureCard>
            </Col>
          </Row>
        </Section>

        <Section>
          <StorySection>
            <Row>
              <Col lg={12}>
                <SectionTitle>Our Values</SectionTitle>
                <Text>
                  Quality, authenticity, and customer satisfaction are at the
                  heart of everything we do. We're committed to creating not
                  just meals, but memorable experiences that bring people
                  together. Our dedication to excellence extends from our
                  kitchen to your table, ensuring that every food tells a story
                  of passion and craftsmanship.
                </Text>
              </Col>
            </Row>
          </StorySection>
        </Section>
      </Container>
    </AboutContainer>
  );
};

export default About;
