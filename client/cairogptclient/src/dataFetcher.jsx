// src/DataFetcher.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file
import ReactMarkdown from "react-markdown";

const DataFetcher = ({ apiUrl }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(apiUrl);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data only when apiUrl changes
    if (apiUrl) {
      fetchData();
    }
  }, [apiUrl]);

  return (
    <div className="result-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        // <pre>{JSON.stringify(data.text, null, 2)}</pre>
        <ReactMarkdown>{data.text}</ReactMarkdown>
      )}
    </div>
  );
};

export default DataFetcher;
