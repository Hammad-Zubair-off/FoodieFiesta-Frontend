import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzas } from "../actions/pizzaActions";
import PizzaCard from "../components/PizzaCard";
import { Row, Col, Container, Alert, Form } from "react-bootstrap";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { FaFilter, FaSort, FaSearch } from "react-icons/fa";

const MenuSection = styled.section`
  background-color: #fff8f3;
  min-height: 100vh;
  width: 100%;
`;

const MenuContainer = styled(Container)`
  padding: 3rem 1.5rem;

  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const MenuHeader = styled.div`
  margin-bottom: 3.5rem;
  text-align: center;
`;

const MenuTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  span {
    color: ${theme.colors.primary};
  }
`;

const MenuDescription = styled.p`
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const FiltersContainer = styled.div`
  background: white;
  padding: 1.25rem;
  border-radius: 16px;
  box-shadow: ${theme.shadows.default};
  margin-bottom: 3rem;
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 200px;

  @media (max-width: 768px) {
    width: 100%;
  }

  label {
    font-weight: 600;
    color: #444;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
    white-space: nowrap;
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.5rem;
      color: ${theme.colors.primary};
      font-size: 0.9rem;
    }
  }

  select {
    flex: 1;
    border-radius: 12px;
    border: 2px solid #eee;
    padding: 0.6rem 2rem 0.6rem 1rem;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    cursor: pointer;
    background-color: white;
    color: #444;
    font-weight: 500;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 0.8em;
    min-width: 120px;

    &:hover {
      border-color: ${theme.colors.primary}50;
    }

    &:focus {
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px ${theme.colors.primary}15;
      outline: none;
    }
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }

  .form-control {
    border-radius: 12px;
    border: 2px solid #eee;
    padding: 0.6rem 1rem;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    width: 100%;

    &::placeholder {
      color: #999;
      font-weight: 400;
    }

    &:hover {
      border-color: ${theme.colors.primary}50;
    }

    &:focus {
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px ${theme.colors.primary}15;
    }
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  background: ${theme.colors.primary};
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.secondary};
  }

  svg {
    font-size: 0.9rem;
  }
`;

const PizzaGrid = styled(Row)`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const NoResults = styled(Alert)`
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border: none;
  border-radius: 12px;
  color: #666;
  font-size: 1.1rem;

  strong {
    color: ${theme.colors.primary};
  }
`;

const MenuScreen = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { loading, error, pizzas } = useSelector((state) => state.pizzaReducer);

  useEffect(() => {
    setSearchQuery("");

    if (!pizzas.length) {
      dispatch(fetchPizzas(category !== "all" ? category : "", sort));
    }
    console.log(category,"Category");
  }, []); 

  useEffect(() => {
    dispatch(fetchPizzas(category !== "all" ? category : "", sort));
  }, [category, sort]); 

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Memoize filtered pizzas for better performance
  const filteredPizzas = useMemo(() => {
    if (!searchQuery) return pizzas;

    const query = searchQuery.toLowerCase().trim();
    return pizzas.filter((pizza) => pizza.name.toLowerCase().includes(query));
  }, [pizzas, searchQuery]);

  return (
    <MenuSection>
      <MenuContainer>
        <MenuHeader>
          <MenuTitle>
            Our <span>Menu</span>
          </MenuTitle>
          <MenuDescription>
            Discover our handcrafted foods made with fresh ingredients and baked
            to perfection
          </MenuDescription>
        </MenuHeader>

        <FiltersContainer>
          <FilterRow>
            <FilterGroup>
              <Form.Label>
                <FaFilter />
                Category
              </Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">All foods</option>
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
              </Form.Select>
            </FilterGroup>

            <FilterGroup>
              <Form.Label>
                <FaSort />
                Sort By
              </Form.Label>
              <Form.Select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Default</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated</option>
              </Form.Select>
            </FilterGroup>

            <SearchContainer>
              <SearchBar onSearch={handleSearch} suggestions={pizzas} />
            </SearchContainer>
          </FilterRow>
        </FiltersContainer>

        {loading ? (
          <Loader />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <PizzaGrid>
            {filteredPizzas.map((pizza) => (
              <div key={pizza._id}>
                <PizzaCard pizza={pizza} />
              </div>
            ))}
            {filteredPizzas.length === 0 && (
              <div className="col-12">
                <NoResults variant="info">
                  {searchQuery ? (
                    <>
                      No foods found matching <strong>"{searchQuery}"</strong>.
                    </>
                  ) : (
                    "No foods found. Try adjusting your filters."
                  )}
                </NoResults>
              </div>
            )}
          </PizzaGrid>
        )}
      </MenuContainer>
    </MenuSection>
  );
};

export default MenuScreen;
