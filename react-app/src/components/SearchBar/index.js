import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./index.css";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState("");
  const history = useHistory();

  const fetchData = async (value) => {
    const properForm = {
      query: value,
    };
    const res = await fetch("/api/users/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(properForm),
    });
    if (res.ok) {
      const users = await res.json();
      return users;
    } else {
      return null;
    }
  };

  const handleChange = (value) => {
    if (value) {
      setInputValue(value);
      fetchData(value).then((data) => {
        setResults(data ? data?.results?.slice(0, 2) : []);
      });
    } else {
      setInputValue(value);
      setResults([]);
    }
  };

  const handleResultClick = (user) => {
    let userId = user.user_id;
    history.push(`/users/${userId}`);
    setResults([]);
    setInputValue("");
  };

  return (
    <div className="search-container">
      <div>
        <input
          className="input"
          type="search"
          placeholder="Search for friends.."
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {results && results.length > 0 && (
        <div className="result-list">
          <ul>
            {results.map((result) => (
              <li
                className="response-list-item"
                key={result.user_id}
                onClick={() => handleResultClick(result)}
              >
                <div className="search-image">
                  <img src={result.profile_picture} />
                </div>
                <div className="name-container">
                <p>{result.first_name + result.last_name}</p>
                <p>{result.username}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
