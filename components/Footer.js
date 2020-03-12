import React from 'react';
import { StyleSheet, View } from 'react-native';
import ActivityIndicator from './ActivityIndicator';
import PropTypes from 'prop-types';

export default Footer = props => {
  return (
    <View style={styles.container}>
      {props.isLoading ? <ActivityIndicator /> : null}
    </View>
  );
};

Footer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
