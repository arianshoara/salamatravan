import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './SearchBar.css';
import { useLanguage } from '../i18n/LanguageContext';

function SearchBar({ onSearch, searchResults }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { translations } = useLanguage();
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Escuchar clics fuera del componente para cerrar el campo de búsqueda
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setShowSuggestions(false);
      }
    };

    // Escuchar la tecla Escape para cerrar el campo de búsqueda
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setShowSuggestions(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isSearchOpen]);

  // Dar foco al input cuando se abre el campo de búsqueda
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length >= 1) {
      // Call onSearch to get live results for suggestions
      onSearch(value, true);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm, false);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title);
    onSearch(suggestion.title, false);
    setShowSuggestions(false);
  };

  const highlightMatch = (text, query) => {
    if (!query || query.length < 1) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? 
            <span key={i} className="highlight-match">{part}</span> : part
        )}
      </>
    );
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchTerm('');
      setShowSuggestions(false);
    }
  };

  return (
    <div className={`search-bar-container ${isSearchOpen ? 'expanded' : ''}`} ref={searchContainerRef}>
      {isSearchOpen ? (
        <div className="search-expanded-container">
          <form className="search-bar" onSubmit={handleSubmit}>
            <div className="search-input-wrapper">
              <FaSearch className="search-input-icon" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder={translations.searchPlaceholder || "جستجو..."}
                className="search-input"
                autoComplete="off"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search-button"
                  onClick={clearSearch}
                  aria-label="پاک کردن جستجو"
                >
                  <FaTimes size={16} />
                </button>
              )}
            </div>
            <button type="submit" className="search-button">
              <FaSearch size={16} />
            </button>
          </form>
          
          {showSuggestions && searchResults && searchResults.length > 0 && (
            <div className="search-suggestions" ref={suggestionsRef}>
              <div className="suggestion-header">
                <span className="suggestion-title">پیشنهادهای جستجو</span>
              </div>
              <ul>
                {searchResults.slice(0, 5).map((result, index) => (
                  <li 
                    key={index} 
                    onClick={() => handleSuggestionClick(result)}
                    className="suggestion-item"
                  >
                    <FaSearch className="suggestion-icon" />
                    <span className="suggestion-text">
                      {highlightMatch(result.title, searchTerm)}
                    </span>
                    <span className="suggestion-type">
                      {result.type === 'article' ? 'مقاله' : 'آزمون'}
                    </span>
                  </li>
                ))}
              </ul>
              {searchResults.length > 5 && (
                <div className="show-more-results" onClick={() => { onSearch(searchTerm, false); setShowSuggestions(false); }}>
                  <span>مشاهده همه نتایج ({searchResults.length})</span>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <button type="button" className="search-icon-button" onClick={toggleSearch} aria-label="جستجو">
          <FaSearch size={18} />
        </button>
      )}
    </div>
  );
}

export default SearchBar; 