import React, { useEffect } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzas } from "../actions/pizzaActions";
import { theme } from "../styles/theme";
import BannerImage from "../Images/BannerAdvertise.png";
import { FaPizzaSlice } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import Loader from "../components/Loader";
import Error from "../components/Error";
import BoyChefImage from "../Images/Boychef.png";

const HeroSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 6rem;
  background-color: #fff8f3;
  min-height: 80vh;

  @media (max-width: 1024px) {
    padding: 3rem 4rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem;
    text-align: center;
    gap: 2rem;
  }
`;

const LeftContent = styled.div`
  flex: 1;
  padding-right: 2rem;

  @media (max-width: 768px) {
    padding-right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const RightContent = styled.div`
  flex: 1;
  position: relative;
  max-width: 460px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-family: ${theme.typography.fontFamily};
  font-size: 56px;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 1024px) {
    font-size: 48px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }

  span {
    display: inline-block;
    background-color: ${theme.colors.secondary};
    padding: 0 1rem;
    border-radius: 8px;
    color: white;
  }
`;

const LogoText = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${theme.colors.primary};
    font-size: 1.2em;
  }
`;

const Description = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 2rem;
  max-width: 500px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 16px;
    max-width: 100%;
  }
`;

const OrderButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2.5rem;
  background-color: ${theme.colors.primary};
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
    font-size: 16px;
  }

  &:hover {
    transform: translateY(-3px);
    color: white;
  }
`;
const OrderButtonPopular = styled(Link)`
  display: inline-block;
  padding: 1rem 1.25rem;
  background-color: ${theme.colors.primary};
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.5rem 1.4rem;
    font-size: 16px;
  }

  &:hover {
    transform: translateY(-3px);
    color: white;
  }
`;

const BannerCard = styled.div`
  background-color: ${theme.colors.secondary};
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  aspect-ratio: 1/1.1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
    aspect-ratio: 1/1;
  }
`;

const BannerImageStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 15%;
  display: block;
`;

const DeliveryBadge = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  background-color: white;
  padding: 8px 16px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;

  svg {
    color: ${theme.colors.primary};
    width: 16px;
    height: 16px;
  }
`;

const LocationBadge = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;
  background-color: white;
  padding: 8px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;

  svg {
    color: ${theme.colors.primary};
    width: 16px;
    height: 16px;
  }
`;

const ProfileBadge = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
  background-color: white;
  padding: 8px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .name {
      font-weight: 600;
      font-size: 14px;
      color: #333;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 12px;
      color: #666;

      .stars {
        color: #ffb800;
      }

      .likes {
        margin-left: 8px;
        color: #666;
      }
    }
  }
`;

const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 4rem 6rem;
  background-color: white;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 3rem 4rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem;
    gap: 1.5rem;
  }
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 1.75rem 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${theme.colors.primary},
      ${theme.colors.secondary}
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }

  &:hover::before {
    transform: scaleX(1);
  }

  img {
    width: 52px;
    height: 52px;
    margin-bottom: 1rem;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.1) rotate(5deg);
  }

  .feature-title {
    color: ${theme.colors.primary};
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: ${theme.colors.secondary};
      transition: all 0.4s ease;
      transform: translateX(-50%);
    }
  }

  &:hover .feature-title::after {
    width: 100%;
  }

  h3 {
    font-size: 18px;
    font-weight: bold;
    margin: 0.5rem 0;
    color: #333;
    transition: color 0.3s ease;
  }

  &:hover h3 {
    color: ${theme.colors.primary};
  }

  p {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
    margin-bottom: 1rem;
    transition: color 0.3s ease;
  }

  &:hover p {
    color: #444;
  }

  .learn-more {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: ${theme.colors.primary};
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${theme.colors.primary}10;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
      z-index: -1;
    }

    &:hover {
      gap: 0.8rem;
      color: ${theme.colors.primary};
    }

    &:hover::before {
      transform: scaleX(1);
      transform-origin: left;
    }

    svg {
      transition: transform 0.3s ease;
    }

    &:hover svg {
      transform: translateX(4px);
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;

    img {
      width: 48px;
      height: 48px;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 17px;
    }

    p {
      font-size: 13px;
      margin-bottom: 1rem;
    }
  }
`;

const BestSellersSection = styled.section`
  padding: 4rem 6rem;
  background-color: #fff8f3;

  @media (max-width: 1024px) {
    padding: 3rem 4rem;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 32px;
    font-weight: bold;
    color: #333;
    margin-bottom: 1rem;

    span {
      margin-left: 8px;
    }
  }

  p {
    color: #666;
    font-size: 16px;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const DishesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DishCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
`;

const DishImage = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${DishCard}:hover & img {
    transform: scale(1.05);
  }
`;

const DishInfo = styled.div`
  padding: 1.5rem;
`;

const DishCategory = styled.span`
  display: inline-block;
  padding: 0.25rem 1rem;
  background-color: #f8f8f8;
  color: #666;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 0.75rem;
`;

const DishName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.75rem;
`;

const DishRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1rem;

  svg {
    color: #ffb800;
    font-size: 16px;
  }
`;

const DishPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 20px;
    font-weight: bold;
    color: ${theme.colors.primary};
  }
`;

const BuyButton = styled.button`
  padding: 0.5rem 1.25rem;
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const ChefSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 6rem;
  background-color: #fff8f3;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 3rem 4rem;
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 2rem;
    text-align: center;
    gap: 2rem;
  }
`;

const ChefContent = styled.div`
  flex: 1;
  padding-right: 4rem;

  @media (max-width: 768px) {
    padding-right: 0;
  }

  h2 {
    font-size: 42px;
    font-weight: bold;
    color: #333;
    margin-bottom: 1.5rem;
    line-height: 1.2;

    @media (max-width: 1024px) {
      font-size: 36px;
    }

    @media (max-width: 768px) {
      font-size: 32px;
    }

    span {
      color: ${theme.colors.primary};
    }
  }

  p {
    font-size: 18px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 2rem;
    max-width: 500px;

    @media (max-width: 768px) {
      font-size: 16px;
      max-width: 100%;
    }
  }
`;

const ChefImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 500px;
    height: 500px;
    background: ${theme.colors.secondary}20;
    border-radius: 50%;
    z-index: 0;
  }

  img {
    max-width: 100%;
    height: auto;
    position: relative;
    z-index: 1;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 2rem;
  }
`;

const StatItem = styled.div`
  h3 {
    font-size: 36px;
    font-weight: bold;
    color: ${theme.colors.primary};
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
      font-size: 32px;
    }
  }

  p {
    font-size: 16px;
    color: #666;
    margin: 0;
  }
`;

const features = [
  {
    id: 1,
    title: "Quality Food",
    heading: "Fresh Ingredients",
    description:
      "We use only the freshest ingredients to ensure the best quality in every dish. Our ingredients are locally sourced and carefully selected.",
  },
  {
    id: 2,
    title: "Fast Service",
    heading: "Fast Delivery",
    description:
      "Quick and reliable delivery service to get your food while it's hot. Track your order in real-time with our delivery system.",
  },
  {
    id: 3,
    title: "Secure Pay",
    heading: "Easy Payment",
    description:
      "Multiple secure payment options for your convenience and peace of mind. We support all major payment methods.",
  },
  {
    id: 4,
    title: "Mobile Access",
    heading: "Mobile App",
    description:
      "Order easily through our mobile app with exclusive offers and tracking. Get special discounts and rewards.",
  },
];

const Homescreen = () => {
  const dispatch = useDispatch();

  const fullState = useSelector((state) => state);
  const pizzaState = useSelector((state) => state.pizzaReducer);
  const {
    loading,
    error,
    pizzas = [],
  } = pizzaState || { loading: false, error: null, pizzas: [] };

  useEffect(() => {
    dispatch(fetchPizzas());
  }, [dispatch]);

  const getPizzaPrice = (pizza) => {
    if (!pizza.prices) return 0;


    if (Array.isArray(pizza.prices) && pizza.prices.length > 0) {
      if (typeof pizza.prices[0] === "object" && pizza.prices[0].price) {
        return pizza.prices[0].price;
      }
      if (typeof pizza.prices[0] === "number") {
        return pizza.prices[0];
      }
    }
    return 0;
  };

  return (
    <>
      <HeroSection>
        <LeftContent>
          <Title>
            Desire{" "}
            <LogoText>
              <FaPizzaSlice /> Food
            </LogoText>
            <br />
            for Your Taste
          </Title>
          <Description>
            Food is what we eat to stay alive and healthy. It comes in many
            different forms and flavors, from fruits and vegetables to meats and
            grains.
          </Description>
          <OrderButton to="/menu">Order Now</OrderButton>
        </LeftContent>

        <RightContent>
          <BannerCard>
            <BannerImageStyled src={BannerImage} alt="Food delivery" />
            <DeliveryBadge>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Delivery in 30 mint
            </DeliveryBadge>
            <LocationBadge>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              at destination
            </LocationBadge>
            <ProfileBadge>
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Ali Ahmad"
              />
              <div className="profile-info">
                <span className="name">Ali Ahmad</span>
                <div className="rating">
                  <span className="stars">★</span>
                  4.5
                  <span style={{ marginLeft: "8px" }}>1k Likes</span>
                </div>
              </div>
            </ProfileBadge>
          </BannerCard>
        </RightContent>
      </HeroSection>

      <FeaturesSection>
        {features.map((feature) => (
          <FeatureCard key={feature.id}>
            <img src={`/icons/feature-${feature.id}.svg`} alt={feature.title} />
            <div className="feature-title">{feature.title}</div>
            <h3>{feature.heading}</h3>
            <p>{feature.description}</p>
            <Link to="/about" className="learn-more">
              Learn More
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33337 8H12.6667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 3.33337L12.6667 8.00004L8 12.6667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </FeatureCard>
        ))}
      </FeaturesSection>

      <ChefSection>
        <ChefContent>
          <h2>
            Meet Our <span>Expert Chef</span> Who Makes Your Food Special
          </h2>
          <p>
            Our talented chef brings years of culinary expertise to create the
            perfect blend of flavors in every dish. Using only the finest
            ingredients and traditional techniques, we ensure that each meal is
            crafted with care and passion.
          </p>
          <StatsContainer>
            <StatItem>
              <h3>15+</h3>
              <p>Years Experience</p>
            </StatItem>
            <StatItem>
              <h3>50+</h3>
              <p>Special Recipes</p>
            </StatItem>
            <StatItem>
              <h3>100%</h3>
              <p>Happy Customers</p>
            </StatItem>
          </StatsContainer>
        </ChefContent>
        <ChefImageContainer>
          <img src={BoyChefImage} alt="Our Expert Chef" />
        </ChefImageContainer>
      </ChefSection>
    </>
  );
};

export default Homescreen;
