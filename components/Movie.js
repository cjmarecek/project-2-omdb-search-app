import React from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const Movie = props => {
  return (
    
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        props.navigation.navigate('Detail', {
          imdbID: props.imdbID,
          title: props.Title,
          poster: props.Poster,
        })
      }}>
      <Image source={{ uri: props.Poster }} style={styles.image} />
      <View style={styles.titleYear}>
        <Text style={styles.title}>{props.Title}</Text>
        <Text>
          {props.Year} ({props.Type})
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Movie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  image: {
    width: 40,
    height: 40,
  },
  titleYear: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
  },
});

Movie.propTypes = {
  Poster: PropTypes.string,
  Title: PropTypes.string,
  Year: PropTypes.string,
  Type: PropTypes.string,
  imdbID: PropTypes.string,
};
