import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ErrorMessage from './ErrorMessage'
import PropTypes from 'prop-types';

export default EmptyListMessage = (props) => {
  if (props.error) {
    return <ErrorMessage error={props.error} />;
  } else {
    return (
      <View style={styles.container}>
        <Text>No results</Text>
      </View>
    );
  }
}
EmptyListMessage.propTypes = {
  error: PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  }
})