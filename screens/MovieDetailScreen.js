import React from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator
} from "react-native";
import Constants from "expo-constants";
import { fetchMovie } from "../api";

export default class MovieDetailScreen extends React.Component {
  state = {
    movie: {
      Title: "N/A",
      Poster: "N/A",
      Year: "N/A",
      Rated: "N/A",
      Runtime: "N/A",
      Plot: "N/A",
      Ratings: [
        { Source: "N/A", Value: "N/A" },
        { Source: "N/A", Value: "N/A" },
        { Source: "N/A", Value: "N/A" }
      ]
    },
    isLoading: false //Loading state used while loading more data
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam("title"),
      headerBackTitleVisible: true,
      headerTruncatedBackTitle: true,
      headerTitleStyle: {
        fontWeight: "bold",
        left: 2 // THIS RIGHT HERE
      },
      headerLayoutPreset: "center"
    };
  };

  getMovie = async () => {
    this.setState({ isLoading: true }, async () => {
      const result = await fetchMovie(this.props.navigation.getParam("imdbID"));
      if (typeof result != "undefined" && result != null) {
        this.setState({
          movie: result,
          isLoading: false
        });
      } else {
        this.setState({
          isLoading: false,
          movie: {
            Title: "N/A",
            Poster: "N/A",
            Year: "N/A",
            Rated: "N/A",
            Runtime: "N/A",
            Plot: "N/A",
            Ratings: [
              { Source: "N/A", Value: "N/A" },
              { Source: "N/A", Value: "N/A" },
              { Source: "N/A", Value: "N/A" }
            ]
          }
        });
      }
    });
  };

  componentDidMount() {
    this.getMovie();
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    } else {
      return (
        <ScrollView style={styles.container}>
          <Image
            source={{ uri: this.props.navigation.getParam("poster") }}
            style={styles.image}
          />
          <Text style={styles.title}>{this.state.movie.Title}</Text>
          <Text style={styles.paragraph}>
            {"("}
            {this.state.movie.Year}
            {")"}
          </Text>
          <Text style={styles.paragraph}>
            {this.state.movie.Rated}, {this.state.movie.Runtime}
          </Text>
          <Text style={styles.paragraphItalic}>{this.state.movie.Plot}</Text>

          <Text style={styles.paragraph}>
            {this.state.movie.Ratings[0].Source}{" "}
            {this.state.movie.Ratings[0].Value}
          </Text>
          <Text style={styles.paragraph}>
            {this.state.movie.Ratings[1].Source}{" "}
            {this.state.movie.Ratings[1].Value}
          </Text>
          <Text style={styles.paragraph}>
            {this.state.movie.Ratings[2].Source}{" "}
            {this.state.movie.Ratings[2].Value}
          </Text>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 5
  },
  image: {
    width: 365,
    height: 370,
    margin: 1
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    padding: 5
  },
  paragraph: {
    fontSize: 15,
    padding: 5
  },
  paragraphItalic: {
    fontStyle: "italic",
    fontSize: 15,
    padding: 5
  }
});

// <Text style={styles.paragraph}>
//   {this.state.movie.Ratings[0].Source}{' '}
//   {this.state.movie.Ratings[0].Value}
// </Text>
// <Text style={styles.paragraph}>
//   {this.state.movie.Ratings[1].Source}{' '}
//   {this.state.movie.Ratings[1].Value}
// </Text>
// <Text style={styles.paragraph}>
//   {this.state.movie.Ratings[2].Source}{' '}
//   {this.state.movie.Ratings[2].Value}
// </Text>
