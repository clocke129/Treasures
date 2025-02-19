import React from 'react';
import { StyleSheet, View } from 'react-native';
import ReadingPlanViewer from '../../components/ReadingPlanViewer';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ReadingPlanViewer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
