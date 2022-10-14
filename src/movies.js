const data = require("./data");

// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?

function getAllDirectors(moviesArray) {
  return moviesArray.map((movie) => movie.director);
}

function getAllDirectorsBonus(moviesArray) {
  let uniqueArray = [];
  moviesArray.map(function (movie) {
    if (!uniqueArray.includes(movie.director)) {
      uniqueArray.push(movie.director);
    }
  });
  return uniqueArray;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const cleanedArray = moviesArray.filter(function (movie) {
    return (
      movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
    );
  });
  return cleanedArray.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (!moviesArray.length) {
    return 0;
  }
  const sum = moviesArray.reduce(function (acc, movie) {
    return movie.score ? acc + movie.score : acc;
  }, 0);
  return Math.round((sum * 100) / moviesArray.length) / 100;
}

//console.log(scoresAverage(data));

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  return scoresAverage(
    moviesArray.filter((movie) => movie.genre.includes("Drama"))
  );
}

// Pre-Iteration 5:
function orderAlpha(moviesArray) {
  return moviesArray.sort((a, b) =>
    a.title > b.title ? 1 : b.title > a.title ? -1 : 0
  );
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  let sortedMoviesArray = moviesArray.map((element) => element);
  return orderAlpha(sortedMoviesArray).sort(function (a, b) {
    return a.year - b.year;
  });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  let moviesTitleArray = moviesArray.map((element) => element.title);
  moviesTitleArray.sort();
  return moviesTitleArray.slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  let sortedMoviesArray = JSON.parse(JSON.stringify(moviesArray));

  sortedMoviesArray.forEach(function (movie) {
    let hours = movie.duration.slice(0, movie.duration.search("h"));
    let minutes = movie.duration.slice(
      movie.duration.search("h") + 1,
      movie.duration.search("m")
    );
    movie.duration = hours * 60 + Number(minutes);
  });
  return sortedMoviesArray;
}

console.log(turnHoursToMinutes(data));

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (!moviesArray.length) {
    return null;
  }

  let yearsArray = [];
  moviesArray.forEach(function (movie) {
    if (!yearsArray.includes(movie.years)) {
      let obj = {};
      obj.year = movie.year;
      yearsArray.push(obj);
    }
  });

  yearsArray.forEach(function (year) {
    year.avgScore = scoresAverage(
      moviesArray.filter(function (movie) {
        return movie.year === year.year;
      })
    );
  });

  yearsArray.sort(function (a, b) {
    return a.year - b.year;
  });

  yearsArray.sort(function (a, b) {
    return b.avgScore - a.avgScore;
  });

  return `The best year was ${yearsArray[0].year} with an average score of ${yearsArray[0].avgScore}`;
}
