import React, { useContext } from "react";
import MovieInfoUl from "../movieInfoUl";
import { Context } from "../../Context";

const MovieInfoSection = () => {
  const value = useContext(Context);
  const { selectedMovie, firstInput, secondInput, isBothSides } = value;
  let firstMovie;
  let secondMovie;
  firstMovie = selectedMovie[firstInput];
  secondMovie = selectedMovie[secondInput];
  const awardsFun = (value) => {
    let match = value.match(/\d*..(?=wins|win\))/);
    return match ? parseInt(match[0]) : 0;
  };
  const boxOfficeFun = (value) => {
    return value.match("N/A")
      ? 0
      : parseInt(value.replace(/\$/g, "").replace(/\,/g, ""));
  };
  const metaScoreFun = (value) => (value.match("N/A") ? 0 : parseInt(value));

  const imdbRatingFun = (value) => (value.match("N/A") ? 0 : parseFloat(value));
  const imdbVotesFun = (value) =>
    value.match("N/A") ? 0 : parseInt(value.replace(/\,/g, ""));

  const bothMoviesData = (data) => {
    return {
      awards: awardsFun(data.Awards),
      boxOffice: boxOfficeFun(data.BoxOffice),
      metascore: metaScoreFun(data.Metascore),
      imdbRating: imdbRatingFun(data.imdbRating),
      imdbVotes: imdbVotesFun(data.imdbVotes),
    };
  };

  const firstCompData = firstMovie ? bothMoviesData(firstMovie) : "";
  const secondCompData = secondMovie ? bothMoviesData(secondMovie) : "";

  let compareFunFirst = (parsedValue1, parsedValue2) => {
    if (isBothSides) {
      if (parsedValue1 > parsedValue2) return "blue-color";
      else if (parsedValue1 < parsedValue2) return "red-color";
      else {
        return "green-color";
      }
    }
  };

  let compareFunSecond = (parsedValue1, parsedValue2) => {
    if (isBothSides) {
      if (parsedValue2 > parsedValue1) return "blue-color";
      else if (parsedValue2 < parsedValue1) return "red-color";
      else return "green-color";
    }
  };
  return (
    <div className="Movie-info-section">
      {firstMovie && (
        <div className="Movie-info-ul-1">
          {" "}
          <MovieInfoUl
            first={true}
            compareFunFirst={compareFunFirst}
            data={firstMovie}
            isBothSides={isBothSides}
            firstCompData={firstCompData}
            secondCompData={secondCompData}
          />
        </div>
      )}
      {secondMovie && (
        <div className="Movie-info-ul-2">
          {" "}
          <MovieInfoUl
            first={false}
            compareFunSecond={compareFunSecond}
            data={secondMovie}
            isBothSides={isBothSides}
            firstCompData={firstCompData}
            secondCompData={secondCompData}
          />
        </div>
      )}
    </div>
  );
};

export default MovieInfoSection;
