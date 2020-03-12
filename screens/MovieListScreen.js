import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { STATUS_BAR_HEIGHT } from '../Constants';
import MovieListItem from '../components/MovieListItem';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import EmptyListMessage from '../components/EmptyListMessage';

import { fetchMovies } from '../api';

export default class MovieListScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
      movies: [],
      isLoading: false,
      error: null,
      totalResults: null,
      refreshing: false,
      listEnd: false,
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    const { searchTerm, page, movies } = this.state;
    if (searchTerm.length > 2) {
      this.setState({ isLoading: true }, async () => {
        const json = await fetchMovies(searchTerm, page);
        if (typeof json.Search != 'undefined' && json.Search.length > 0) {
          this.setState({
            movies: page === 1 ? json.Search : [...movies, ...json.Search],
            isLoading: false,
            refreshing: false,
            totalResults: json.totalResults,
            listEnd: false,
          });
        } else {
          this.setState({
            error: json,
            isLoading: false,
            refreshing: false,
          });
        }
      });
    } else {
      {
        this.setState({
          isLoading: false,
          searchResults: [],
          refreshing: false,
          listEnd: true,
        });
      }
    }
  };

  handleLoadMoreData = () => {
    if (this.state.page * 10 < this.state.totalResults && !this.state.listEnd) {
      this.setState(prevState => {
        return {
          page: prevState.page + 1,
        };
      }, this.getMovies);
    } else {
      this.setState({
        listEnd: true,
      });
    }
  };

  handleSearchChange = searchTerm => {
    this.setState(
      {
        searchTerm,
        movies: [],
        page: 1,
      },
      this.getMovies,
    );
  };

  render() {
    const { isLoading, movies, refreshing, error } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <MovieListItem {...item} navigation={this.props.navigation} />
          )}
          keyExtractor={(item, index) => 'index' + index.toString()}
          ListHeaderComponent={
            <SearchBar
              onSearch={this.handleSearchChange}
              searchTerm={this.state.searchTerm}
            />
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => <EmptyListMessage error={error} />}
          ListFooterComponent={() => <Footer isLoading={isLoading} />}
          onEndReached={this.handleLoadMoreData}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={() =>
            this.setState({ movies: [], page: 1 }, this.getMovies)
          }
          extraData={movies}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: STATUS_BAR_HEIGHT + 15,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  separator: {
    height: 1,
    width: '86%',
    backgroundColor: '#CED0CE',
    marginLeft: '14%',
  },
});
