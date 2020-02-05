import React from 'react';
import { FlatList, ActivityIndicator, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Movie from './Movie';

class MovieList extends React.Component {
  renderItem = ({ item }) => (
    <Movie {...item} navigation={this.props.navigation} />
  );

  renderFooter = () => {
    return (
      <View style={styles.footer}>
        {this.props.fetching_from_server ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };

  render() {
    return (
      <View>
        <FlatList
        renderItem={this.renderItem}
        data={this.props.movies}
        keyExtractor={item => item.imdbID}
        onEndReached={() => this.props.loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={this.renderFooter.bind(this)}
      />
        </View>
    );
  }
}

export default MovieList;

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

MovieList.propTypes = {
  movies: PropTypes.array,
};
