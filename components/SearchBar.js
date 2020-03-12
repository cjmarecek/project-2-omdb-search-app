import React from 'react';
import { TextInput, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeText = searchTerm => {
      this.props.onSearch(searchTerm);
  };

  render() {
    return (
      <View >
        <TextInput style={styles.input}
          placeholder="Write your search here"
          onChangeText={this.onChangeText}
          value={this.props.searchTerm}
        />
      </View>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
