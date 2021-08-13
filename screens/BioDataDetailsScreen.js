import React, {useState, useEffect, useCallback} from 'react';
import {
  Dimensions,
  Alert,
  Image,
  BackHandler,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import Colors from '../Colors/Colors';
import {useSelector} from 'react-redux';
import AboutCard from '../components/AboutCard';
import PersonelDetailsCard from '../components/PersonelDetailsCard';
import EducationCard from '../components/EducationCard';
import KundliCard from '../components/KundliCard';
import FamilyDetailsCard from '../components/FamilyDetailsCard';
import {Modal, Portal} from 'react-native-paper';
import {captureScreen} from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import LottieView from 'lottie-react-native';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

const BioDataDetailsScreen = props => {
  const id = props.route.params.id;
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const mobile = useSelector(state => state.auth.mobile);
  const hideModal = () => {
    setVisible(false);
  };
  const containerStyle = {
    backgroundColor: 'transparent',
    padding: 20,
    height: Dimensions.get('screen').height / 3,
    margin: 20,
    marginBottom: Dimensions.get('screen').height / 15,
  };
  const favHandler = async () => {
    setVisible(true);
    setTimeout(hideModal, 2000);
    const res = await fetch(
      'https://arcane-island-23682.herokuapp.com/addToFav',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          id: data.id,
          name: data.name,
          dob: data.dob,
          yob: data.yob,
          image: data.image,
          phone: mobile,
        }),
      },
    );
  };

  const screenshotHandler = () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    }).then(
      uri => {
        console.log(uri);
        CameraRoll.saveToCameraRoll(uri);
        alert('Screenshot Saved to Gallery');
      },
      error => console.error('Oops, Something Went Wrong', error),
    );
  };
  const loadData = useCallback(async () => {
    const res = await fetch(
      'https://arcane-island-23682.herokuapp.com/details',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
        }),
      },
    );
    const detailsData = await res.json();
    setData(detailsData[0]);
  }, [id]);
  useEffect(() => {
    loadData();
  }, [id]);

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <Image
          style={styles.image}
          source={{uri: data.image}}
          resizeMode="contain"
        />
        <View style={styles.pravahContainer}>
          <Image
            source={require('../images/pravah.jpg')}
            style={{
              height: height / 11,
              width: width,
              borderRadius: 25,
              marginBottom:20
            }}
            resizeMode="contain"
          />
        </View>
        <View>
        <PersonelDetailsCard
            name={data.name}
            birthTime={data.birth_time}
            gender={data.gender}
            height={data.height}
            dob={data.dob}
            color={data.color}
            he={data.education}
            occupation={data.work}
            income={data.income}
            familyBusiness={data.family_business}
            birthplace={data.birthplace}
            manglik={data.manglik}
            gotra={data.gotra}
            father={data.father}
            mother={data.mother}
            siblings={data.siblings}
            dada={data.dada}
            status={data.marital_status}
            nana={data.nana}
            whatsappMobile={data.whatsapp}
            id={data.id}
            workplace={data.workplace}
            mobile={data.mobile_no}
            address={data.address}
          />
          {/*<PersonelDetailsCard
            name={data.name}
            birthTime={data.birth_time}
            gender={data.gender}
            height={data.height}
            dob={data.dob + ' ' + data.yob}
            color={data.color}
          />

          <EducationCard
            he={data.education}
            occupation={data.work}
            income={data.income}
            familyBusiness={data.family_business}
          />
          <KundliCard
            birthplace={data.birthplace}
            manglik={data.manglik}
            gotra={data.gotra}
          />
          <FamilyDetailsCard
            father={data.father}
            mother={data.mother}
            siblings={data.siblings}
            dada={data.dada}
            status={data.marital_status}
            nana={data.nana}
          />
          <AboutCard
            whatsappMobile={data.whatsapp}
            id={data.id}
            workplace={data.workplace}
            mobile={data.mobile_no}
            address={data.address}
          />*/}
        </View>

        <Text style={styles.littleheading}>
          अन्य कोई विशेष जानकारी/प्रथमिकता :
        </Text>
        <View style={styles.other}>
          <Text style={styles.description}>{data.others} </Text>
        </View>
      </ScrollView>

      <View style={styles.action}>
        <View style={styles.mainBtn}>
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.btn}
            onPress={favHandler}>
            <Text style={styles.textBtn}>Add To Fav</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainBtn}>
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.btn1}
            onPress={screenshotHandler}>
            <Text style={styles.textBtn}>Save BioData</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <LottieView
            source={require('../animations/favourite.json')}
            autoPlay
            loop
          />
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  other: {
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 25,
  },
  pravahContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 25,
  },
  pravahText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: -5,
    fontFamily: 'OpenSans-Bold',
    color: Colors.primary,
  },
  image: {
    width: '100%',
    height: height / 2.5,
    borderRadius: 3,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: height / 47,
  },
  safetytext: {
    color: 'white',
    fontSize: height / 40,
    marginBottom: height / 50,
  },
  safety: {
    paddingHorizontal: height / 50,
    paddingBottom: height / 47,
  },
  text: {
    fontSize: height / 33,
    color: 'black',
    padding: height / 66,
    fontWeight: 'bold',
  },
  textBtn: {
    fontSize: height / 31.5,
    padding: height / 75,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'OpenSans-Bold',
  },
  textBtn1: {
    fontSize: height / 31.5,
    padding: height / 75,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: Colors.primary,
    height: '100%',
  },
  btn1: {
    backgroundColor: '#262626',
    height: '100%',
  },
  price: {
    fontSize: height / 30,
    color: Colors.primary,
    padding: height / 66,
    fontWeight: 'bold',
  },
  description: {
    fontSize: height / 40,
    color: 'black', //
    padding: height / 90,
    fontFamily: 'OpenSans-Bold',
  },
  mainBtn: {
    width: '50%',
  },
  dot: {
    color: Colors.primary,
  },
  action: {
    width: width,
    flexDirection: 'row',
    height: height / 14,
  },
  card: {
    marginTop: height / 33,
  },
  quantityConatiner: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: height / 70,
    width: width / 4,
    marginLeft: height / 66,
    marginVertical: height / 66,
    justifyContent: 'center',
    marginBottom: height / 47,
  },
  btns: {
    borderRightColor: '#ccc',
    borderRightWidth: 2,
    marginRight: height / 132,
    paddingRight: height / 72,
    marginLeft: height / 66,
  },
  btnLeft: {
    borderLeftColor: '#ccc',
    borderLeftWidth: 2,
    marginRight: height / 66,
    paddingLeft: height / 72,
    marginLeft: height / 132,
  },
  normalDetailsTextQuantitys: {
    fontSize: height / 32,
  },
  brands: {
    shadowColor: Colors.primary,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: height / 72,
    elevation: height / 132,
    borderRadius: height / 66,
    backgroundColor: 'white',
    height: height / 9,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: height / 47,
    marginHorizontal: height / 66,
    marginBottom: height / 22,
  },
  brandImage: {
    height: height / 13,
    width: width / 5.7,
    borderRadius: height / 66,
    marginHorizontal: height / 33,
  },
  littleheading: {
    color: Colors.primary,
    paddingLeft: height / 170,
    fontWeight: 'bold',
  },
});

export default BioDataDetailsScreen;
