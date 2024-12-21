import React from 'react';
import { TextInput } from 'react-native';
import styles from '../styles';

const Input = ({ placeholder, ...props }) => {
  return <TextInput style={styles.input} placeholder={placeholder} {...props} />;
};

export default Input;