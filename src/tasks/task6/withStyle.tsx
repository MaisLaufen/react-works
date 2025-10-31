import React from 'react';
import { View, StyleSheet } from 'react-native';

export const withStyledContainer = (WrappedComponent: React.ComponentType<any>, additionalStyles = {}) => {
  const StyledWrapper: React.FC<any> = (props) => {
    return (
      <View style={[styles.container, additionalStyles]}>
        <WrappedComponent {...props} />
      </View>
    );
  };

  return StyledWrapper;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 8,
    backgroundColor: '#393939',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Для Android
  },
});