import React, { useContext, useEffect, useState } from "react";
import InputComponent from "../inputComponent";
import { Context } from "../../Context";
import ResultsSearchResults from "../resultsSearchResults/resultsSearchResults";
import MovieInfoSection from "./movieInfoSection";

const MainBodySection = () => {
  const value = useContext(Context);
  const {
    selectedMovie,
    movieResults,
    activeInput,
    firstInput,
    secondInput,
    isDropDown,
    setIsDropDown,
  } = value;
  useEffect(() => {
    if (movieResults[firstInput] || movieResults[secondInput]) {
      setIsDropDown(true);
    }
  }, [movieResults[firstInput], movieResults[secondInput]]);

  let leftSide;
  let rightSide;
  const getSpecifiedResult = () => {
    return activeInput == firstInput
      ? (leftSide = movieResults[firstInput])
      : (rightSide = movieResults[secondInput]);
  };
  getSpecifiedResult();

  return (
    <div className="main-body-section-hero">
      <section className="main-body-section-container">
        <div className="main-body-section-inputs-div ">
          <div className="inputs-div-for-ul-absolute first-input">
            <label className="input-labels" htmlFor="firstInput">
              Search your movie
            </label>
            <InputComponent inputName="firstInput" />
            {movieResults[firstInput] && isDropDown && (
              <div className="search-result-ul-1">
                <ResultsSearchResults data={leftSide} />
              </div>
            )}
          </div>
          <div className="inputs-div-for-ul-absolute second-input">
            <label className="input-labels" htmlFor="secondInput">
              Search your movie
            </label>
            <InputComponent inputName="secondInput" />
            {movieResults[secondInput] && isDropDown && (
              <div className="search-result-ul-2">
                <ResultsSearchResults data={rightSide} />
              </div>
            )}
          </div>
        </div>
        {selectedMovie[secondInput] || selectedMovie[firstInput] ? (
          <MovieInfoSection />
        ) : (
          <div className="search-both-sides-msg-div flex-row">
            <h1 className="search-both-sides-msg-txt">
              Please search on the both sides to compare
            </h1>
          </div>
        )}
      </section>
    </div>
  );
};

export default MainBodySection;
