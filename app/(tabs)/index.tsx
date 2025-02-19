import React from 'react';
import { StyleSheet, View } from 'react-native';
import BiblePassageSearch from '../../components/BiblePassageSearch';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <BiblePassageSearch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
