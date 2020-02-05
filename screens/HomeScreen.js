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
      refreshing: false
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    if (this.state.searchTerm.length > 2) {
      this.setState({ isLoading: true }, async () => {
        const searchResults = await fetchMovies(
          this.state.searchTerm,
          this.state.page
        );
        if (
          typeof searchResults.Search != "undefined" &&
          searchResults.Search != null &&
          searchResults.Search.length != null &&
          searchResults.Search.length > 0
        ) {
          this.setState({
            searchResults:
              this.state.page === 1
                ? searchResults.Search
                : [...this.state.searchResults, ...searchResults.Search],
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
        isLoading: false,
            searchResults: [],
            refreshing: false
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

  renderItem = ({ item }) => (
    <Movie {...item} navigation={this.props.navigation} />
  );

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

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
    // this.setState(
    //   {
    //     searchResults: [],
    //     page: 1
    //   },
    //   () => {
    this.getMovies();
    console.log(this.state.searchResults);
    //   }
    // );
  };

  handleSearchChange = searchTerm => {
    this.setState({
      searchTerm: searchTerm,
      searchResults: [],
      page: 1
    });
    this.getMovies();
  };

  renderHeader = () => {
    return (
      <TextInput
        style={styles.input}
        placeholder="Write your search here"
        value={this.state.searchTerm}
        onChangeText={this.handleSearchChange}
        value={this.state.value}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            renderItem={this.renderItem}
            data={this.state.searchResults}
            keyExtractor={item => item.imdbID}
            ListHeaderComponent={this.renderHeader}
            ItemSeparatorComponent={this.renderSeparator}
            ListEmptyComponent={this.renderEmpty}
            ListFooterComponent={this.renderFooter}
            onEndReached={this.handleLoadMoreData}
            //onEndReached={() => hasMore && refine()}
            onEndReachedThreshold={0.5}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            extraData={this.state}
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
  },
  separator: {
    height: 1,
    width: "86%",
    backgroundColor: "#CED0CE",
    marginLeft: "14%"
  }
});
