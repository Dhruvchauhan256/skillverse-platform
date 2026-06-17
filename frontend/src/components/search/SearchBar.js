import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import SearchSuggestions from "./SearchSuggestions";
import RecentSearches from "./RecentSearches";
import SavedSearches from "./SavedSearches";
import TrendingSkills from "./TrendingSkills";

function SearchBar() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const debounceRef = useRef(null);

  // ---- FETCH LIVE SUGGESTIONS FROM SUPABASE ----
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    // Debounce search to avoid too many requests
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const fetchSuggestions = async (value) => {
    try {
      setLoadingSuggestions(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("name, title, skills")
        .or(
          `name.ilike.%${value}%,title.ilike.%${value}%`
        )
        .limit(8);

      if (error) {
        console.log("SUGGESTIONS ERROR:", error);
        setSuggestions([]);
        return;
      }

      // Build a unique list of suggestion strings
      const results = new Set();

      data?.forEach((profile) => {
        if (
          profile.title &&
          profile.title.toLowerCase().includes(value.toLowerCase())
        ) {
          results.add(profile.title);
        }
        if (
          profile.name &&
          profile.name.toLowerCase().includes(value.toLowerCase())
        ) {
          results.add(profile.name);
        }
        profile.skills?.forEach((skill) => {
          if (skill.toLowerCase().includes(value.toLowerCase())) {
            results.add(skill);
          }
        });
      });

      setSuggestions(Array.from(results).slice(0, 6));
    } catch (err) {
      console.log(err);
      setSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // ---- HANDLE SEARCH (SAVE RECENT + NAVIGATE) ----
  const handleSearch = (value) => {
    if (!value || !value.trim()) return;

    setQuery(value);

    // Save recent searches
    const recent = JSON.parse(localStorage.getItem("recentSearches")) || [];
    if (!recent.includes(value)) {
      recent.unshift(value);
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(recent.slice(0, 5))
      );
    }

    setSuggestions([]);

    // Navigate to actual search results page
    navigate(`/search?q=${encodeURIComponent(value)}`, {
      state: { query: value },
    });
  };

  // ---- SAVE SEARCH (NO MORE ALERT) ----
  const saveSearch = () => {
    if (!query.trim()) {
      setSavedMessage("Type something to save");
      setTimeout(() => setSavedMessage(""), 2000);
      return;
    }

    const saved = JSON.parse(localStorage.getItem("savedSearches")) || [];

    if (!saved.includes(query)) {
      saved.push(query);
      localStorage.setItem("savedSearches", JSON.stringify(saved));
      setSavedMessage("Search saved! ⭐");
    } else {
      setSavedMessage("Already saved");
    }

    setTimeout(() => setSavedMessage(""), 2000);
  };

  return (
    <div className="container position-relative my-4">

      <div className="input-group">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search freelancers, skills, projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
        />
        <button
          className="btn btn-primary"
          onClick={() => handleSearch(query)}
        >
          Search
        </button>
        <button
          className="btn btn-outline-success"
          onClick={saveSearch}
        >
          ⭐ Save
        </button>
      </div>

      {/* SAVE FEEDBACK MESSAGE (replaces alert) */}
      {savedMessage && (
        <div
          style={{
            position: "absolute",
            top: "-30px",
            right: "0",
            background: "#1dbf73",
            color: "white",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          {savedMessage}
        </div>
      )}

      {/* LOADING INDICATOR FOR SUGGESTIONS */}
      {loadingSuggestions && (
        <div className="text-muted small mt-1 ps-2">
          Searching...
        </div>
      )}

      {/* LIVE SUGGESTIONS FROM BACKEND */}
      {!loadingSuggestions && (
        <SearchSuggestions
          suggestions={suggestions}
          onSelect={handleSearch}
        />
      )}

      {/* EXTRAS — only show when not actively typing */}
      {!query && (
        <>
          <RecentSearches onSelect={handleSearch} />
          <SavedSearches onSelect={handleSearch} />
          <TrendingSkills onSelect={handleSearch} />
        </>
      )}
    </div>
  );
}

export default SearchBar;
