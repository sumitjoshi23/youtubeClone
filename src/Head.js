import React, { useState, useEffect, useCallback } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "./utils/appSlice";
import { YOUTUBE_AUTO_SUGGESTIONS_API_LINK } from "./utils/constants";
import { cacheResults } from "./utils/searchSlice";

const Head = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  let dispatch = useDispatch();

  const searchCache = useSelector((store) => store.search);

  const getAutoSuggestions = useCallback(async () => {
    let data = await fetch(YOUTUBE_AUTO_SUGGESTIONS_API_LINK + searchTerm);
    let json = await data.json();
    dispatch(cacheResults({ [searchTerm]: json[1] }));

    setSuggestions(json[1]);
  }, [searchTerm, dispatch]);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (searchCache[searchTerm]) {
        setSuggestions(searchCache[searchTerm]);
      } else getAutoSuggestions();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchCache, searchTerm, getAutoSuggestions]);

  function handleToggleMenu() {
    dispatch(toggleMenu());
  }
  return (
    <div className="sticky top-0 bg-white grid grid-flow-col py-3 mt-0 mb-2 mx-2 shadow-lg">
      <div className="flex col-span-1">
        <GiHamburgerMenu
          onClick={() => handleToggleMenu()}
          className="h-8 w-8 px-2"
        />

        <img
          className="h-8 mx-2"
          alt="youTubeLogo"
          src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Logo.png"
        ></img>
      </div>

      <div className="col-span-10 ml-36 px-10">
        <div>
          <input
            placeholder="Search"
            className="w-1/2 border border-gray-400 rounded-l-full pl-3"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="px-4 border border-gray-400 bg-gray-200 rounded-r-full">
            Search
          </button>
          {showSuggestions && (
            <div>
              <ul className="fixed bg-white py-2 px-5 w-[27rem] border border-gray-100 rounded shadow-lg">
                {suggestions.map((s) => (
                  <li
                    key={s}
                    onClick={() => setSearchTerm(s)}
                    className="flex shadow-sm hover:bg-gray-100"
                  >
                    <HiMagnifyingGlass className="mt-1 mr-1" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex col-span-1 justify-end">
        <FaUserAlt className="h-8 mr-2" />
      </div>
    </div>
  );
};

export default Head;
