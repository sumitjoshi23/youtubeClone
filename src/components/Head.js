import React, { useState, useEffect, useCallback, useRef } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { GiHamburgerMenu } from "react-icons/gi";
import googleIcon from "../utils/images/googleIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../store/slices/appSlice";
import {
  YOUTUBE_AUTO_SUGGESTIONS_API_LINK,
  YOUTUBE_SEARCHBYKEYWORD_API_LINK,
} from "../utils/constants";
import youTubeLogo from "../utils/images/youTubeLogo.png";
import { cacheResults } from "../store/slices/searchSlice";
import { Link } from "react-router-dom";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  setSignedInUser,
  setSignedInUserProfile,
} from "../store/slices/signedInUserSlice";
import { setVideos } from "../store/slices/videoSlice";

const Head = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const formElement = useRef();

  const { user, profile } = useSelector((store) => store.signedInUser);
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => dispatch(setSignedInUser(codeResponse)),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          dispatch(setSignedInUserProfile(res.data));
        })
        .catch((err) => console.log(err));
    }
  }, [user, dispatch]);

  const logOut = () => {
    googleLogout();
    dispatch(setSignedInUserProfile(null));
  };

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

  useEffect(() => {
    const handler = (e) => {
      if (!formElement.current.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  async function handleSearchForm(e, s) {
    e.preventDefault();
    const data = await fetch(YOUTUBE_SEARCHBYKEYWORD_API_LINK(s));
    const json = await data.json();
    console.log(json);
    dispatch(setVideos(json.items));
    setShowSuggestions(false);
  }

  function handleToggleMenu() {
    dispatch(toggleMenu());
  }
  return (
    <div className="z-10 sticky top-0 bg-white grid items-center grid-flow-col py-3 mb-6 shadow-lg">
      <div className="flex col-span-1">
        <GiHamburgerMenu
          onClick={() => handleToggleMenu()}
          className="h-8 mx-4 mr-4 cursor-pointer"
        />
        <Link to="/">
          <img className="h-8" alt="youTubeLogo" src={youTubeLogo}></img>
        </Link>
      </div>
      <div className="col-span-10 m-auto">
        <form
          className="max-w-fit "
          ref={formElement}
          onSubmit={(e) => handleSearchForm(e, searchTerm)}
        >
          <input
            placeholder="Search"
            className="border h-11 border-gray-400 w-96 rounded-l-full pl-3 focus:outline-none"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
          />
          <button className="px-4 h-11 border border-gray-400 bg-gray-200 rounded-r-full">
            Search
          </button>
          {showSuggestions && (
            <div>
              <ul className="fixed bg-white my-2 px-5 w-[27rem] rounded shadow-lg">
                {suggestions.map((s) => (
                  <li
                    key={s}
                    onClick={(e) => {
                      setSearchTerm(s);
                      setShowSuggestions(false);

                      handleSearchForm(e, searchTerm);
                    }}
                    className="flex shadow-sm hover:bg-gray-200"
                  >
                    <HiMagnifyingGlass className="mt-1 mr-1" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
      <div className="w-40 float-right">
        {!profile ? (
          <button
            className="float-right flex items-center text-white font-semibold text-xl border leading-none px-2 py-1 rounded-lg hover:border-transparent hover:scale-110 bg-[#ec1313e0] duration-300"
            onClick={login}
          >
            <img
              className="rounded-full w-9"
              src={googleIcon}
              alt="googleIcon"
            />
            <span className="m-2">Sign In</span>
          </button>
        ) : (
          <button
            className="float-right text-white flex items-center leading-none px-2 py-1 font-semibold text-xl  border rounded-lg hover:border-transparent hover:scale-110 bg-[#ec1313e0] duration-300"
            onClick={logOut}
          >
            <img
              className="rounded-full bg-white p-1 w-9"
              src={profile.picture}
              alt="userProfile"
            />
            <span className="m-2 ">Sign out</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Head;
