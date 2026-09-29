import "./App.css";
import Autocomplete from "./components/Autocomplete";

function App() {
  const staticData = [
    "apple",
    "banana",
    "berrl",
    "orange",
    "grape",
    "mango",
    "melon",
    "berry",
  ];

  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result.recipes;
  };

  return (
    <>
      <h1>Autocomplete / Typeahead Search</h1>
      <Autocomplete
        placeholder="Enter recipe"
        // staticData={staticData}
        fetchSuggestions={fetchSuggestions}
        dataKey="name"
        customLoading={<>Loading...</>}
        onSelect={(res) => console.log(res)}
        onChange={(e) => {
          console.log(e);
        }}
        onBlur={(e) => {
          console.log(e);
        }}
        onFocus={(e) => {
          console.log(e);
        }}
        customStyles={{}}
      />
    </>
  );
}

export default App;
