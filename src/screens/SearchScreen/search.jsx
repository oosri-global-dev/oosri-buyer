import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SearchWrapper } from "./search.styles";
import TextField from "@/components/lib/TextField";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { FaArrowsRotate as RotateIcon } from "react-icons/fa6";
import { searchProducts } from "@/network/search";
import { Spin } from "antd";

const RECENT_SEARCHES_KEY = "recent_searches";
const MAX_RECENT_SEARCHES = 3;

export default function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearched, setRecentSearched] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setRecentSearched(Array.isArray(parsed) ? parsed : []);
        } catch (e) {
          setRecentSearched([]);
        }
      }
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (query) => {
    if (!query || !query.trim()) return;

    const trimmedQuery = query.trim();
    let updated = [...recentSearched];

    // Remove if already exists
    updated = updated.filter((item) => item !== trimmedQuery);

    // Add to beginning
    updated.unshift(trimmedQuery);

    // Keep only last 3
    updated = updated.slice(0, MAX_RECENT_SEARCHES);

    setRecentSearched(updated);

    if (typeof window !== "undefined") {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    }
  };

  // Handle search
  const handleSearch = async (query) => {
    if (!query || !query.trim()) return;

    setIsSearching(true);
    try {
      await searchProducts(query.trim());
      saveRecentSearch(query.trim());
      // Navigate to shop page with search query
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    } catch (error) {
      console.error("Search error:", error);
      // Still save the search even if API fails
      saveRecentSearch(query.trim());
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search input enter key
  const handlePressEnter = (e) => {
    const query = e.target.value;
    handleSearch(query);
  };

  // Handle recent search item click
  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  // Clear all recent searches
  const handleClearAll = () => {
    setRecentSearched([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    }
  };

  return (
    <SearchWrapper>
      <FlexibleDiv className="content__wrap">
        <TextField
          border="border: 1.5px solid rgba(224, 224, 224, 0.60)"
          style={{
            boxShadow:
              "0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px -1px 2px 0px rgba(0, 0, 0, 0.10) inset",
          }}
          prefix={<SearchIcon size={22} />}
          placeholder="Search for anything here..."
          className="search__textbox"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onPressEnter={handlePressEnter}
          disabled={isSearching}
          suffix={isSearching ? <Spin size="small" /> : null}
        />
        {recentSearched.length > 0 ? (
          <FlexibleDiv
            className="recent__searched__box"
            justifyContent="space-between"
            alignItems="flex-start"
            flexWrap="nowrap"
          >
            <div>
              <p className="header__text">Recent Searched</p>
              {recentSearched.map((sgn, idx) => (
                <p
                  className="single__search__result"
                  key={idx}
                  onClick={() => handleRecentSearchClick(sgn)}
                >
                  <div className="icon__wrapper">
                    <RotateIcon color="#777777" />
                  </div>
                  <span>{sgn}</span>
                </p>
              ))}
            </div>
            <div>
              <p className="clear__all__text" onClick={handleClearAll}>
                Clear all
              </p>
            </div>
          </FlexibleDiv>
        ) : (
          <FlexibleDiv
            className="recent__searched__box"
            justifyContent="space-between"
            alignItems="flex-start"
            flexWrap="nowrap"
          >
            <div>
              <p className="header__text">Recent Searched</p>
              <p style={{ color: "#777777", marginTop: "20px" }}>
                No recent searches. Your recent search queries will appear here.
              </p>
            </div>
          </FlexibleDiv>
        )}
      </FlexibleDiv>
    </SearchWrapper>
  );
}
