import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default ErrorMessage = (props) => {
  return (
    <View style={styles.container}>
      <Text>{props.error.Error}</Text>
    </View>
  )
}

ErrorMessage.propTypes = {
  error: PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 20,
  }
})