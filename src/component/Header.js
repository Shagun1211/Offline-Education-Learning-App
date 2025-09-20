import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({ setScreen }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setScreen('Home')}>
        <Text style={styles.link}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('About')}>
        <Text style={styles.link}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('Contact')}>
        <Text style={styles.link}>Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    paddingVertical: 12,
    marginTop:50,
  },
  link: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Header;
