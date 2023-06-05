import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

const Context = createContext();

const AppContextProvider = ({ children }) => {
  const firstInput = "firstInput";
  const secondInput = "secondInput";

  const emptyResultsObject = {
    [firstInput]: "",
    [secondInput]: "",
  };

  // -----HANDLE DROP DOWN CLOSE WWHEN CLICK WINDOW----------------
  const dropdownRef = useRef(null);
  const [isDropDown, setIsDropDown] = useState(false);

  useEffect(() => {
    const handleWindowClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDown(false);
      }
    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  // ============================
  const [inputData, setInputData] = useState(emptyResultsObject);
  const [movieResults, setMovieResults] = useState(emptyResultsObject);
  const [activeInput, setActiveInput] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(emptyResultsObject);
  const [isBothSides, setIsBothSides] = useState(false);

  // set Movie results according their name
  const handleSetMovieResults = (inputName, data) => {
    setMovieResults({
      [inputName]: data,
    });
  };

  // Fetching Movies Data
  const fetchData = () => {
    const activeInputData =
      activeInput == firstInput
        ? inputData[firstInput]
        : inputData[secondInput];
    axios
      .get("http://www.omdbapi.com/", {
        params: {
          apikey: "7bcc53f0",
          s: activeInputData,
        },
      })
      .then(function ({ data }) {
        if (data.Search) {
          handleSetMovieResults(activeInput, data.Search);
        } else {
          handleSetMovieResults(activeInput, "");
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(isBothSides);
  const fetchDataById = (searchId, activeInput) => {
    axios
      .get("http://www.omdbapi.com/", {
        params: {
          apikey: "7bcc53f0",
          i: searchId,
        },
      })
      .then((response) => {
        setSelectedMovie((prev) => {
          return { ...prev, [activeInput]: response.data };
        });
      });
  };

  useEffect(() => {
    if (selectedMovie[firstInput] && selectedMovie[secondInput]) {
      setIsBothSides(true);
    } else {
      setIsBothSides(false);
    }
  }, [selectedMovie]);

  useEffect(() => {
    let timer;
    clearTimeout(timer);
    console.log("inside useeffect");
    timer = setTimeout(() => {
      if (activeInput) {
        fetchData();
      }
    }, 900);

    return () => {
      clearTimeout(timer);
    };
  }, [inputData.firstInput, inputData.secondInput]);

  return (
    <Context.Provider
      value={{
        emptyResultsObject,
        inputData,
        activeInput,
        setActiveInput,
        setInputData,
        movieResults,
        firstInput,
        secondInput,
        selectedMovie,
        setSelectedMovie,
        fetchDataById,
        isBothSides,
        isDropDown,
        setIsDropDown,
        dropdownRef,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export { AppContextProvider, Context };
