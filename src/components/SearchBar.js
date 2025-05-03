import React, { useState, useEffect, useRef } from "react";
import { Form, InputGroup, ListGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { theme } from "../styles/theme";
import "./SearchBar.css";

const SearchWrapper = styled.div`
  position: relative;
  width: 300px;
  max-width: 100%;
  margin-left: auto;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

const SearchInput = styled(Form.Control)`
  padding-right: 45px;
  padding-left: 15px;
  border-radius: 12px;
  border: 2px solid #eee;
  height: 45px;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.colors.primary}50;
  }

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}15;
  }

  &::placeholder {
    font-size: 0.9rem;
    color: #999;
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
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.secondary};
  }
`;

const SuggestionsDropdown = styled(ListGroup)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 0.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
`;

const SuggestionItem = styled(ListGroup.Item)`
  padding: 0.75rem 1rem;
  border: none;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  .suggestion-image {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    object-fit: cover;
  }

  .suggestion-name {
    font-weight: 500;
    color: #333;
  }

  .suggestion-price {
    font-size: 0.9rem;
    color: ${theme.colors.primary};
  }
`;

const SearchBar = ({ onSearch, suggestions = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = suggestions.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, suggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery, onSearch]);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
  };

  return (
    <SearchWrapper ref={searchRef}>
      <Form>
        <div className="position-relative">
          <SearchInput
            type="search"
            placeholder="Search by Food name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
          />
          <SearchButton type="button">
            <FaSearch size={14} />
          </SearchButton>
        </div>
      </Form>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <SuggestionsDropdown>
          {filteredSuggestions.map((item, index) => (
            <SuggestionItem
              key={index}
              action
              onClick={() => handleSuggestionClick(item)}
            >
              <div className="d-flex align-items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="suggestion-image me-2"
                />
                <div>
                  <div className="suggestion-name">{item.name}</div>
                  <div className="suggestion-price">
                    From Rs. {Math.min(...item.prices.map((p) => p.price))}
                  </div>
                </div>
              </div>
            </SuggestionItem>
          ))}
        </SuggestionsDropdown>
      )}
    </SearchWrapper>
  );
};

export default SearchBar;
