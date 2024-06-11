/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce";
import "./styles.css";
import SuggestionList from "../SuggestionList";

function Autocomplete({
  placeholder,
  staticData,
  fetchSuggestions,
  dataKey,
  customLoading,
  onSelect,
  onChange,
  onBlur,
  onFocus,
  customStyles,
}) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);
    try {
      let results;
      if (staticData) {
        results = staticData.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });
      } else if (fetchSuggestions) {
        results = await fetchSuggestions(query);
      }
      setSuggestions(results);
    } catch (e) {
      setError("Failed to set suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestionsDebounced = useCallback(
    debounce(getSuggestions, 500),
    []
  );

  const hadleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : dataKey);
    onSelect(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        style={customStyles}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleChange}
      />

      {(suggestions.length > 0 || loading || error) && (
        <ul className="suggestion-list">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customLoading}</div>}
          <SuggestionList
            suggestions={suggestions}
            dataKey={dataKey}
            highlight={inputValue}
            onSuggestionClick={hadleSuggestionClick}
          />
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
