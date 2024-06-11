import "./styles.css";

/* eslint-disable react/prop-types */
function SuggestionList({
  suggestions = [],
  highlight,
  dataKey,
  onSuggestionClick,
}) {
  const getHighlightedText = (text, highlight) => {
    const textParts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {textParts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  return (
    <>
      {suggestions.map((suggestion, index) => {
        const currentSuggestion = dataKey ? suggestion[dataKey] : suggestion;
        return (
          <li
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="suggestion-item"
          >
            {getHighlightedText(currentSuggestion, highlight)}
          </li>
        );
      })}
    </>
  );
}

export default SuggestionList;
