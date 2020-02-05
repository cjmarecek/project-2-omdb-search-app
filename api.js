export const fetchMovies = async (searchTerm, page) => {
  try {
    const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=8726ae5a&page=${page}`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    return jsonResponse.Search;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchMovie = async imdbID => {
  try {
    const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=8726ae5a`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    if (!jsonResponse) {
      console.log("ou farts");
      return {};
    } else {
      console.log(jsonResponse);

      return {
        Title: jsonResponse.Title || "N/A",
        Poster: jsonResponse.Poster || "N/A",
        Year: jsonResponse.Year || "N/A",
        Rated: jsonResponse.Rated || "N/A",
        Runtime: jsonResponse.Runtime || "N/A",
        Plot: jsonResponse.Plot || "N/A",
        Ratings:
          [
            {
              Source: jsonResponse.Ratings[0].Source || "N/A",
              Value: jsonResponse.Ratings[0].Value || "N/A"
            },
            {
              Source: jsonResponse.Ratings[1].Source || "N/A",
              Value: jsonResponse.Ratings[1].Value || "N/A"
            },
            {
              Source: jsonResponse.Ratings[2].Source || "N/A",
              Value: jsonResponse.Ratings[2].Value || "N/A"
            }
          ] || []
      };
    }
  } catch (error) {
    console.error(error);
  }
};
