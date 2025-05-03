import React, { useState } from "react";
import { Card, Badge, Modal, Row, Col, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart as addToCartRedux } from "../reducers/cartReducer";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { FaStar, FaClock, FaPepperHot, FaShoppingCart } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

const StyledCard = styled(Card)`
  border: none;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: white;
  height: 100%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  padding-top: 65%;
  overflow: hidden;
  background: #f8f8f8;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
    z-index: 1;
  }
`;

const StyledImage = styled(Card.Img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${StyledCard}:hover & {
    transform: scale(1.05);
  }
`;

const CategoryBadge = styled(Badge)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: 600;
  z-index: 2;
  background: ${(props) =>
    props.bg === "success"
      ? "linear-gradient(135deg, #22c55e, #10b981)"
      : props.bg === "danger"
      ? "linear-gradient(135deg, #ef4444, #f87171)"
      : "linear-gradient(135deg, #f5f5f5, #e0e0e0)"};
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px
    ${(props) =>
      props.bg === "success"
        ? "rgba(16, 185, 129, 0.15)"
        : props.bg === "danger"
        ? "rgba(239, 68, 68, 0.15)"
        : "rgba(224, 224, 224, 0.15)"};
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  text-transform: uppercase;
  font-family: "Nunito", sans-serif;
  transition: all 0.3s ease;

  ${StyledCard}:hover & {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px
      ${(props) =>
        props.bg === "success"
          ? "rgba(16, 185, 129, 0.2)"
          : props.bg === "danger"
          ? "rgba(239, 68, 68, 0.2)"
          : "rgba(224, 224, 224, 0.2)"};
  }
`;

const PopularBadge = styled(Badge)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: 600;
  z-index: 2;
  background: linear-gradient(135deg, #fb923c, #f97316);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(251, 146, 60, 0.15);
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  text-transform: uppercase;
  font-family: "Nunito", sans-serif;
  transition: all 0.3s ease;

  ${StyledCard}:hover & {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(251, 146, 60, 0.2);
  }
`;

const CardContent = styled(Card.Body)`
  padding: 1.25rem;
  background: linear-gradient(to bottom, #ffffff, #fafafa);
`;

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
  font-family: "Nunito", sans-serif;

  ${StyledCard}:hover & {
    color: ${theme.colors.primary};
  }
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  color: #718096;
  font-size: 0.85rem;
  font-weight: 500;

  svg {
    color: ${theme.colors.primary};
    font-size: 1rem;
  }
`;

const SpiceLevel = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;

  svg {
    color: #ef4444;
    font-size: 0.9rem;
    transition: all 0.3s ease;

    ${StyledCard}:hover & {
      transform: scale(1.1);
    }
  }
`;

const Description = styled.p`
  color: #718096;
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceTag = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${theme.colors.primary};
  font-family: "Nunito", sans-serif;

  ${StyledCard}:hover & {
    color: ${theme.colors.secondary};
  }
`;

// Modal Styled Components
const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 16px;
    border: none;
    overflow: hidden;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  border-radius: 12px;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`;

const ModalDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const SizeSelector = styled.div`
  margin-bottom: 1.5rem;

  h5 {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.75rem;
  }
`;

const VariantButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
`;

const VariantButton = styled.button`
  padding: 0.75rem;
  border: 2px solid ${(props) => (props.active ? theme.colors.primary : "#eee")};
  border-radius: 8px;
  background: ${(props) =>
    props.active ? `${theme.colors.primary}10` : "white"};
  color: ${(props) => (props.active ? theme.colors.primary : "#666")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    border-color: ${theme.colors.primary};
    background: ${(props) =>
      props.active ? `${theme.colors.primary}10` : `${theme.colors.primary}05`};
  }

  span.price {
    font-size: 0.85rem;
    font-weight: 500;
  }
`;

const QuantityContainer = styled.div`
  margin-bottom: 1.5rem;

  h5 {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.75rem;
  }

  input {
    width: 100px;
    padding: 0.5rem;
    border: 2px solid #eee;
    border-radius: 8px;
    text-align: center;
    font-weight: 500;

    &:focus {
      border-color: ${theme.colors.primary};
      outline: none;
    }
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: ${theme.colors.secondary};
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const IngredientsSection = styled.div`
  margin-bottom: 1.5rem;

  h5 {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const IngredientsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const IngredientTag = styled.span`
  background: ${theme.colors.primary}10;
  color: ${theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${theme.colors.primary}20;
  }
`;

const PizzaCard = ({ pizza }) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedVarient, setSelectedVarient] = useState(pizza.varients[0]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    dispatch(addToCartRedux(item._id, quantity, selectedVarient, navigate));
  };

  const getPrice = (varient) => {
    return pizza.prices.find((p) => p.varient === varient)?.price || 0;
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <StyledCard onClick={() => setModalShow(true)}>
        <ImageWrapper>
          <StyledImage src={pizza.image} alt={pizza.name} />
          {pizza.category && (
            <CategoryBadge
              bg={
                pizza.category === "Veg"
                  ? "success"
                  : pizza.category === "Non-Veg"
                  ? "danger"
                  : "secondary"
              }
            >
              {pizza.category}
            </CategoryBadge>
          )}
          {pizza.popularity >= 90 && <PopularBadge>Popular</PopularBadge>}
        </ImageWrapper>
        <CardContent>
          <Title>{pizza.name}</Title>
          <MetaInfo>
            <div>
              <FaStar /> {pizza.rating}
            </div>
            <div>
              <FaClock /> {pizza.cookingTime} min
            </div>
          </MetaInfo>
          <SpiceLevel>
            {[...Array(pizza.spiceLevel)].map((_, i) => (
              <FaPepperHot key={i} />
            ))}
          </SpiceLevel>
          <Description>{pizza.description}</Description>
          <PriceTag>
            From Rs. {Math.min(...pizza.prices.map((p) => p.price))}
          </PriceTag>
        </CardContent>
      </StyledCard>

      <StyledModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <ModalTitle>{pizza.name}</ModalTitle>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <ModalImage src={pizza.image} alt={pizza.name} />
              <IngredientsSection>
                <h5>
                  <FaPepperHot /> Ingredients
                </h5>
                <IngredientsList>
                  {pizza.ingredients &&
                    pizza.ingredients.map((ingredient, index) => (
                      <IngredientTag key={index}>{ingredient}</IngredientTag>
                    ))}
                </IngredientsList>
              </IngredientsSection>
            </Col>
            <Col md={6}>
              <ModalTitle>{pizza.name}</ModalTitle>
              <ModalDescription>{pizza.description}</ModalDescription>

              <MetaInfo>
                <div>
                  <FaStar /> {pizza.rating}
                </div>
                <div>
                  <FaClock /> {pizza.cookingTime} min
                </div>
              </MetaInfo>

              <SizeSelector>
                <h5>Select Size:</h5>
                <VariantButtons>
                  {pizza.varients.map((varient) => (
                    <VariantButton
                      key={varient}
                      active={selectedVarient === varient}
                      onClick={() => setSelectedVarient(varient)}
                    >
                      {varient}
                      <span className="price">Rs. {getPrice(varient)}</span>
                    </VariantButton>
                  ))}
                </VariantButtons>
              </SizeSelector>

              <QuantityContainer>
                <h5>Quantity:</h5>
                <Form.Control
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(1, Math.min(10, Number(e.target.value)))
                    )
                  }
                />
              </QuantityContainer>

              <AddToCartButton onClick={() => handleAddToCart(pizza)}>
                <FaShoppingCart />
                Add to Cart - Rs. {getPrice(selectedVarient)}
              </AddToCartButton>
            </Col>
          </Row>
        </Modal.Body>
      </StyledModal>
    </>
  );
};

export default PizzaCard;
