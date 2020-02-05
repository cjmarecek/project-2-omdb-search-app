import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList
} from "react-native";
import Constants from "expo-constants";

// import MovieList from '../components/MovieList';
import Movie from "../components/Movie";

import { fetchMovies } from "../api";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      searchResults: [], //Data Source for the FlatList
      isLoading: false, //Loading state used while loading more data
      page: 1,
      totalResults: null,
      refreshing: false,
      
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    if (this.state.searchTerm.length >= 2) {
      this.setState({ isLoading: true }, async () => {
        const searchResults = await fetchMovies(
          this.state.searchTerm,
          this.state.page
        );
        if (
          typeof searchResults != "undefined" &&
          searchResults != null &&
          searchResults.length != null &&
          searchResults.length > 0
        ) {
          this.setState({
            searchResults: [...this.state.searchResults, ...searchResults],
            isLoading: false,
            refreshing: false
          });

        } else {
          this.setState({
            isLoading: false,
            searchResults: [],
            refreshing: false
          });
        }
      });
    } else {
      this.setState({
        searchResults: []
      });
    }
  };

  handleLoadMoreData = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1
      };
    });
    this.getMovies();
  };

  handleSearchChange = searchTerm => {
    this.setState({
      searchTerm: searchTerm,
      searchResults: [],
      page: 1,

    }),
      this.getMovies();
  };

  renderItem = ({ item }) => (
    <Movie {...item} navigation={this.props.navigation} />
  );

  renderFooter = () => {
    return (
      <View style={styles.footer}>
        {this.state.isLoading ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };

  renderEmpty = () => {
    return (
      <View>
        <Text>No results..</Text>
      </View>
    );
  };

  handleRefresh = () => {
    this.setState(
      {
        // searchResults: [],
        page: 1,
      },
      () => {
        this.getMovies();
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={this.state.searchTerm}
          placeholder="Write your search here"
          onChangeText={this.handleSearchChange}
        />
        {/* {this.state.searchResults.length === 0 ? <Text>No results</Text> : null} */}
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            renderItem={this.renderItem}
            data={this.state.searchResults}
            keyExtractor={item => item.imdbID}
            onEndReached={this.handleLoadMoreData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderFooter}
            ListEmptyComponent={this.renderEmpty()}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            extraData={this.state.searchResults}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 1
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  }
});
