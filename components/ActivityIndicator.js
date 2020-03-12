import React from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';

export default () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  }
})