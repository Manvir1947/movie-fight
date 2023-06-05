import { useEffect, useState, useContext } from "react";
import React from "react";
import { Context } from "../Context";

const MovieInfoUl = ({
  data,
  first,
  compareFunFirst,
  compareFunSecond,
  firstCompData,
  secondCompData,
}) => {
  const value = useContext(Context);
  const { emptyResultsObject, isBothSides, selectedMovie } = value;
  const [scores, setScore] = useState(emptyResultsObject);
  const comparableData = (input) => {
    {
      return [input.awards, input.metascore, input.imdbRating, input.imdbVotes];
    }
  };

  const firstMovieCompArray = comparableData(firstCompData);
  const secondMovieCompArray = comparableData(secondCompData);

  useEffect(() => {
    if (isBothSides) {
      let firstScore = 0;
      let secondScore = 0;
      firstMovieCompArray.forEach((firstMovieElement, index) => {
        let secondMovieElement = secondMovieCompArray[index];
        if (firstMovieElement > secondMovieElement) {
          firstScore = firstScore + 1;
        } else if (secondMovieElement > firstMovieElement) {
          secondScore = secondScore + 1;
        }
      });

      setScore({
        firstInput: firstScore,
        secondInput: secondScore,
      });
    }
  }, [isBothSides, selectedMovie]);
  const dataArray = [
    { answer: data.Awards, title: "Awards", isCompare: true },
    { answer: data.Metascore, title: "Meta Score", isCompare: true },
    { answer: data.imdbRating, title: "Imbd Rating", isCompare: true },
    { answer: data.imdbVotes, title: "Imbd Votes", isCompare: true },
    { answer: data.Country, title: "Country", isCompare: false },
    { answer: data.Director, title: "Director", isCompare: false },
    { answer: data.Language, title: "Language", isCompare: false },
    { answer: data.Rated, title: "Rated", isCompare: false },
    { answer: data.Runtime, title: "Runtime", isCompare: false },
  ];
  const comparefunc = (comparedata1, comparedata2) =>
    first
      ? compareFunFirst(comparedata1, comparedata2)
      : compareFunSecond(comparedata1, comparedata2);

  const movieInfoheader = (data) => {
    const img =
      data.Poster == "N/A"
        ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
        : data.Poster;

    return (
      <header className="movie-info-movie-details-poster-div flex-row">
        <img className="movie-info-img" src={img} alt="" />
        <div className="movie-info-title-details-div ">
          <h1 className="movie-info-title">
            {data.Title}
            <span className="movie-info-year"> ({data.Year})</span>
          </h1>
          <h2 className="movie-info-genere">{data.Genre}</h2>
          <h3 className="movie-info-plot">{data.Plot}</h3>
        </div>
      </header>
    );
  };

  const liHeadingAndDataElement = (
    answer,
    txt,
    isCompare,
    comparedata1,
    comparedata2,
    index
  ) => {
    return (
      <li
        className={`movie-info-li flex-column ${
          isCompare && comparefunc(comparedata1, comparedata2)
        }`}
      >
        <img
          className="movie-info-svg"
          src={require(`./photos/${index + 1}.svg`)}
          alt=""
        />
        <div className="li-heading-data-element flex-column">
          <h1 className="li-data-answer-h1">{answer}</h1>
          <h2 className="li-data-heading-h2">{txt}</h2>
        </div>
      </li>
    );
  };
  const answersLiEle = dataArray.map((obj, index) => {
    return liHeadingAndDataElement(
      obj.answer,
      obj.title,
      obj.isCompare,
      firstMovieCompArray[index],
      secondMovieCompArray[index],
      index
    );
  });

  return (
    <>
      {movieInfoheader(data)}
      <ul className="movie-info-ul flex-column">{answersLiEle}</ul>

      {isBothSides && (
        <div className="scores-div flex-column">
          <h1 className="scores-heading">Scores</h1>
          <p className="scores">
            {first ? scores["firstInput"] : scores["secondInput"]}
          </p>
        </div>
      )}
    </>
  );
};

export default MovieInfoUl;
