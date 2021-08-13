import React, {useEffect} from 'react';
import {Dimensions, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import Colors from '../Colors/Colors';
import * as AuthAction from '../store/actions/AuthAction';
const {height, width} = Dimensions.get('window');

const StartScreen = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const value = await AsyncStorage.getItem('mobile');
        if (value !== null) {
          props.navigation.replace('Home');
          dispatch(AuthAction.autoLogin(value));
        } else {
          props.navigation.replace('Home');
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    tryLogin();
  }, [dispatch]);
  return (
    <View
      style={{
        marginTop: height / 2.4,
      }}>
      <ActivityIndicator color={Colors.primary} size="large" />
    </View>
  );
};

export default StartScreen;
