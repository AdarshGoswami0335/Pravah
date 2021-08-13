import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-paper';
import Colors from '../Colors/Colors';
const {width, height} = Dimensions.get('window');

const OthersScreen = props => {
  const [url, setUrl] = useState();
  const loadData = useCallback(async () => {
    const res = await fetch(
      'https://arcane-island-23682.herokuapp.com/getOtherLinks',
      {
        method: 'GET',
      },
    );
    const resData = await res.json();
    setUrl(resData[0].link);
  }, []);
  useEffect(() => {
    loadData();
  }, []);
  if (url) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Button
          mode="contained"
          style={{borderRadius: 12, marginTop: height / 2.6}}
          color={Colors.primary}
          onPress={() => {
            Linking.openURL(url);
          }}>
          Go to Our Website
        </Button>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="deeppink" />
        <Text>Please Wait...</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({});

export default OthersScreen;
