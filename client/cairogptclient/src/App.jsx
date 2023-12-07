// src/App.js
import React, { useState } from "react";
import DataFetcher from "./dataFetcher";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [apiUrl, setApiUrl] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    // Build the API URL with query parameters when the search button is clicked
    setApiUrl(
      `https://jsonplaceholder.typicode.com/posts?userId=${searchQuery || 1}`
    );
  };

  return (
    <div className="container">
      <h1>Cairo Co-Pilot</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Expalin the constants of the cairo"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      {apiUrl && <DataFetcher apiUrl={apiUrl} />}
    </div>
  );
}

export default App;
