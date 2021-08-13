import React, {useEffect, useState, useCallback} from 'react';
import {Dimensions, Text, View, Image, ScrollView, Linking} from 'react-native';
import {ActivityIndicator, Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import Colors from '../Colors/Colors';
const {height, width} = Dimensions.get('window');

const SammelanScreen = props => {
  const [sammelan, setSammelan] = useState({});
  const [loading,setLoading] = useState(false);
  const loadSammelan = useCallback(async () => {
    setLoading(true)
    const res = await fetch(
      'https://arcane-island-23682.herokuapp.com/getSammelan',
      {
        method: 'GET',
      },
    );
    const resData = await res.json();
     await setSammelan(resData[0]);
    setLoading(false)
  }, []);

  useEffect(() => {
    loadSammelan();
  }, []);
  const joinHandler = () => {
    Linking.openURL(sammelan.link);
  };

  if(loading){
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }
 
    return (
      <ScrollView
        style={{
          margin: 15,
        }}>
        <Image
          source={{uri: sammelan.image}}
          style={{
            width: width / 1.2,
            marginHorizontal: 12,
            height: height / 3,
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontFamily: 'OpenSans-Bold',
            fontSize: 17,
            textAlign: 'center',
            marginVertical: 10,
          }}>
          {sammelan.txt}
        </Text>
        <Button
          color={Colors.primary}
          mode="contained"
          onPress={joinHandler}
          style={{
            marginTop: 15,
          }}>
          शामिल हो
        </Button>
      </ScrollView>
    );
};

export default SammelanScreen;
