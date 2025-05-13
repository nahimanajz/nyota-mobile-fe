import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Animated } from 'react-native';

interface Props {
  isSyncing: boolean;
}

export const Loader: React.FC<Props> = ({ isSyncing }) => {
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (isSyncing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      rotateAnim.setValue(0);
    }
  }, [isSyncing]);

  if (!isSyncing) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator color="#0000ff" />
      <Text style={styles.text}>Syncing...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'hsla(27, 92.70%, 48.40%, 0.89)',
    padding: 8,
    borderRadius: 8,
    margin: 8,
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    marginLeft: 8,
    fontSize: 32,
    color: '#0000ff',
  },
});