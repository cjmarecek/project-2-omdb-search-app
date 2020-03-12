import React from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default MovieListItem = (props) =>{
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        props.navigation.navigate('Detail', {
          imdbID: props.imdbID,
          title: props.Title,
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

MovieListItem.propTypes = {
  imdbID: PropTypes.string.isRequired,
  Title: PropTypes.string.isRequired,
  Poster: PropTypes.string,
  Year: PropTypes.string,
  Type: PropTypes.string,
};

MovieListItem.defaultProps = {
  Poster: '',
  Year: '',
  Type: '',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 2,
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


