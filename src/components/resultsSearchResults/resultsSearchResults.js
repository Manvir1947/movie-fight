import React, { useContext } from "react";

import { Context } from "../../Context";

const ResultsSearchResults = ({ data }) => {
  const value = useContext(Context);
  const {
    dropdownRef,
    fetchDataById,
    setInputData,
    activeInput,
    setActiveInput,
    emptyResultsObject,
  } = value;

  const listElements =
    data &&
    Array.isArray(data) &&
    data.map((movie) => {
      const { Title, Poster } = movie;
      console.log(Poster);
      const img =
        Poster == "N/A"
          ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
          : Poster;

      return (
        <li
          onClick={() => {
            setInputData((prev) => ({
              ...prev,
              [activeInput]: Title,
            }));
            setActiveInput(emptyResultsObject);
            fetchDataById(movie.imdbID, activeInput);
          }}
          className="movie-search-result-li"
        >
          <img className="search-result-movie-poster" src={img} alt="" />
          <h1 className="search-result-movie-title">{Title}</h1>
        </li>
      );
    });
  return (
    <ul ref={dropdownRef} className="drop-down-results-ul">
      {listElements}
    </ul>
  );
};

export default ResultsSearchResults;
