import React, {useEffect, useRef} from 'react';
import {Dimensions, Text, View, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Colors/Colors';
import * as AuthAction from '../store/actions/AuthAction';
import Video from 'react-native-video';
const {height, width} = Dimensions.get('window');

const TutorialScreen = props => {
  const video = useRef(null);
  return (
    <ScrollView>
      <View style={styles.videoContainer}>
          
        <Video
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }} // Can be a URL or a localfile.
          ref={video} // Store reference
          onBuffer={() => {}} // Callback when remote video is buffering
          onEnd={() => {}} // Callback when playback finishes
          onError={() => {}} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
          repeat={true}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available.

          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    margin: 20,
    alignItems:"center"
  },
  backgroundVideo: {
    width: '96%',
    height: height/3.4,
    borderRadius:3,
    borderBottomLeftRadius:6,
  },
  textContainer: {
    margin: 15,
  },
  text: {
    fontSize: 18,
    color:"black",
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
  },
});

export default TutorialScreen;
