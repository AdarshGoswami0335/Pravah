import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ColorPropType,
  Alert,
  Linking,
  Share,
} from 'react-native';
import {Button} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import Colors from '../Colors/Colors';
const {width, height} = Dimensions.get('window');

const HomeScreen = props => {
  const [count, setCount] = useState(36);
  const mobile = useSelector(state => state.auth.mobile);
  const [adminCheck, setAdminCheck] = useState();
  const [bioDatas, setBioDatas] = useState([]);
  const [slides, setSlides] = useState([]);
  const [updateCheck, setUpdateCheck] = useState('');
  const video = useRef(null);

  const updateChecker = useCallback(async () => {
    const res = await fetch(
      'https://arcane-island-23682.herokuapp.com/update',
      {
        method: 'GET',
      },
    );
    const resData = await res.json();
    setUpdateCheck(resData[0].alert);
  }, []);
  useEffect(() => {
    updateChecker();
  }, []);
  const loadData = useCallback(async () => {
    try {
      const res = await fetch('https://arcane-island-23682.herokuapp.com/', {
        method: 'GET',
      });
      const resData = await res.json();

      setBioDatas(resData);
    } catch (error) {
      throw error;
    }
  }, []);

  if (updateCheck === 'Yes') {
    setUpdate(false);
    Alert.alert(
      'New Update Available',
      'Please update the app for new features',
      [
        {
          text: 'Cancel',
          onPress: () => setUpdate(false),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            Linking.openURL(
              'https://play.google.com/store/apps/details?id=com.pravah.matrimony',
            ),
        },
      ],
    );
  }

  useEffect(async () => {
    const check = await fetch(
      'https://arcane-island-23682.herokuapp.com/getAdmin',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          no: mobile,
        }),
      },
    );
    const checkData = await check.json();
    setAdminCheck(checkData);
  }, [adminCheck]);

  const loadCarousel = useCallback(async () => {
    const res = await fetch(
      'https://arcane-island-23682.herokuapp.com/getCarousel',
      {
        method: 'GET',
      },
    );
    const resData = await res.json();
    setSlides(resData);
    console.log(resData);
  }, []);

  useEffect(() => {
    loadCarousel();
  }, []);
  const carouselRef = useRef(null);

  //Automatic slider function (if used in future)
  /*useEffect(() => {
    if (count === 36) {
      carouselRef.current.snapToNext();
    } else if (count === 33) {
      carouselRef.current.snapToNext();
    } else if (count === 30) {
      carouselRef.current.snapToNext();
    } else if (count === 27) {
      carouselRef.current.snapToNext();
    } else if (count === 24) {
      carouselRef.current.snapToNext();
    } else if (count === 21) {
      carouselRef.current.snapToPrev();
    } else if (count === 18) {
      carouselRef.current.snapToPrev();
    } else if (count === 15) {
      carouselRef.current.snapToPrev();
    } else if (count === 12) {
      carouselRef.current.snapToPrev();
    } else if (count === 9) {
      setCount(36);
    }
    const intervalId = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [count, carouselRef]);*/

  useEffect(() => {
    setCount(36);
  }, []);

  useEffect(() => {
    loadData();
  }, []);
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => {
          props.navigation.navigate("BioData");
        }}
       >
        <Image
          source={{uri: item.image}}
          resizeMode="contain"
          style={styles.profileImage}
        />
        <Text style={styles.name}>{item.name}({item.id})</Text>
      </TouchableOpacity>
    );
  };
  const renderData = ({item, index}) => {
    return (
      <Image
        style={styles.image}
        source={{uri: item.link}}
        resizeMode="cover"
      />
    );
  };

  return (
    <ScrollView>
      {/*<Carousel
        ref={carouselRef}
        data={slides}
        renderItem={renderData}
        sliderWidth={width}
        itemWidth={height / 3}
      />*/}
        <View style={styles.videoContainer}>
       <Video
          source={require("../videos/homeVideo.mp4")} // Can be a URL or a localfile.
          ref={video} // Store reference
          onBuffer={() => {}} // Callback when remote video is buffering
          onEnd={() => {}} // Callback when playback finishes
          onError={() => {}} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
          repeat={true}
          resizeMode="cover"
        />
</View>
      <View style={{margin: 15, marginHorizontal: 32}}>
        <Text></Text>
        <Button
          mode="contained"
          color={Colors.primary}
          style={{borderColor: Colors.primary, borderWidth: 1,borderRadius:8}}
          onPress={() => {
            if (mobile) {
              props.navigation.navigate('Add');
            } else {
              props.navigation.navigate('Auth');
            }
          }}>
          Add BioData
        </Button>
      </View>
      <FlatList
        data={bioDatas}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.mainbtn}
          activeOpacity={0.75}
          onPress={() => {
            props.navigation.navigate('BioData');
          }}>
          <Image
            source={require('../images/parinay.jpg')}
            style={styles.btnImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainbtn}
          activeOpacity={0.75}
          onPress={() => {
            props.navigation.navigate('Education');
          }}>
          <Image
            source={require('../images/education.jpg')}
            style={styles.btnImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainbtn}
          activeOpacity={0.75}
          onPress={() => {
            props.navigation.navigate('Employement');
          }}>
          <Image
            source={require('../images/employement.jpg')}
            style={styles.btnImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainbtn}
          activeOpacity={0.75}
          onPress={() => {
            props.navigation.navigate('Sammelan');
          }}>
          <Image
            source={require('../images/sammelan.png')}
            style={styles.btnImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainbtn}
          activeOpacity={0.75}
          onPress={() => {
            props.navigation.navigate('Others');
          }}>
          <Image
            source={require('../images/others.jpg')}
            style={styles.btnImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      {mobile === "7772979222" ? (
        <Button
          mode="contained"
          color={Colors.primary}
          onPress={() => {
            props.navigation.navigate('Admin');
          }}>
          Admin Panel
        </Button>
      ) : (
        <View></View>
      )}
      {}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: height / 4.5,
    width: '100%',
    borderRadius: 5,
    marginTop: 10,
  },
  btnImage: {
    width: width / 1.1,
    height: height / 5,
    borderRadius: 15,
  },
  mainbtn: {
    marginBottom: 15,
  },
  btnContainer: {
    alignItems: 'center',
    marginTop: height / 25,
  },
  card: {
    backgroundColor: 'white',
    height: height / 5.1,
    width: width / 3,
    borderRadius: 8,
    marginHorizontal: height / 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:Colors.primary,
    borderWidth:2
  },
  profileImage: {
    height: 70,
    width: '100%',
    borderRadius: 8,
  },
  name: {
    fontFamily: 'NotoSerif-Bold',
    fontSize: 16,
    marginTop: 16,
  },
  videoContainer: {
    margin: 20,
    alignItems:"center",
   
  },
  backgroundVideo: {
    width: '96%',
    height: height/3.4,
    borderRadius:3,
    borderBottomLeftRadius:6
  },
});

export default HomeScreen;
