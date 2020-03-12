import React from "react";
import { fetchMovie } from "../api";
import ActivityIndicator from '../components/ActivityIndicator'
import MovieDetail from '../components/MovieDetail';
import ErrorMessage from '../components/ErrorMessage'
import {INITIAL_STATE_MOVIE} from '../Constants'

export default class MovieDetailScreen extends React.Component {
  state = {
    movie: INITIAL_STATE_MOVIE,
    isLoading: false, 
    error: null,
  };

  getMovie = () => {
    this.setState({ isLoading: true }, async () => {
      const result = await fetchMovie(this.props.navigation.getParam("imdbID"));
      if (typeof result != "undefined" && result != null && result.Response != 'False') {
        this.setState({
          movie: result,
          isLoading: false
        });
      } else {
        this.setState({
          error: result,
          isLoading: false,
        });
      }
    });
  };

  componentDidMount() {
    this.getMovie();
  }

  render() {
    const { isLoading, movie, error } = this.state;
    if (isLoading) {
      return (<ActivityIndicator />);
    } 
    if(error){
      return <ErrorMessage error={error} />;
    }else{
      return (
        <MovieDetail movie={movie} />
      );
    }
  }
}