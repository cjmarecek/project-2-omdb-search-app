import React from 'react';
import { ScrollView, Image, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default function MovieDetail(props) {
  const { Title, Year, Rated, Runtime, Poster, Plot, Ratings } = props.movie;
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: Poster }} style={styles.image} />
      <Text style={styles.title}>{Title}</Text>
      <Text style={styles.paragraph}>
        {'('}
        {Year}
        {')'}
      </Text>
      <Text style={styles.paragraph}>
        {Rated}, {Runtime}
      </Text>
      <Text style={styles.paragraphItalic}>{Plot}</Text>
      {typeof Ratings[0] !== 'undefined' ? (
        <Text style={styles.paragraph}>
          {Ratings[0].Source} {Ratings[0].Value}
        </Text>
      ) : null}
      {typeof Ratings[1] !== 'undefined' ? (
        <Text style={styles.paragraph}>
          {Ratings[1].Source} {Ratings[1].Value}
        </Text>
      ) : null}
      {typeof Ratings[2] !== 'undefined' ? (
        <Text style={styles.paragraph}>
          {Ratings[2].Source} {Ratings[2].Value}
        </Text>
      ) : null}
    </ScrollView>
  );
}
MovieDetail.propTypes = {
  movie: PropTypes.shape({
    imdbID: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Poster: PropTypes.string,
    Year: PropTypes.string,
    Rated: PropTypes.string,
    Runtime: PropTypes.string,
    Plot: PropTypes.string,
    Ratings: PropTypes.arrayOf(
      PropTypes.PropTypes.shape({
        Source: PropTypes.string,
        Value: PropTypes.string,
      }),
    ),
  }),
};

MovieDetail.defaultProps = {
  Poster: 'N/A',
  Year: 'N/A',
  Rated: 'N/A',
  Runtime: 'N/A',
  Plot: 'N/A',
  Ratings: [{ Source: 'N/A', Value: 'N/A' }],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
  },
  image: {
    width: 365,
    height: 370,
    margin: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    padding: 5,
  },
  paragraph: {
    fontSize: 15,
    padding: 5,
  },
  paragraphItalic: {
    fontStyle: 'italic',
    fontSize: 15,
    padding: 5,
  },
});
