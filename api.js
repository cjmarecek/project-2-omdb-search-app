import { API_KEY } from 'react-native-dotenv';

export const fetchMovies = async (searchTerm, page) => {
  try {
    const url = `http://www.omdbapi.com/?s=${searchTerm}&${API_KEY}&page=${page}`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    return error;
  }
};

export const fetchMovie = async imdbID => {
  try {
    const url = `http://www.omdbapi.com/?i=${imdbID}&${API_KEY}`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    return error;
  }
};
