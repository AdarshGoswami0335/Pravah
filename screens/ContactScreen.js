import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Colors from '../Colors/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');

const ContactScreen = () => {
  const [mobile, setMobile] = useState('8989997652');
  const [whatsapp,setWhatsapp] = useState("");
  const [instagram, setinstagram] = useState(
    'https://instagram.com/pravahapp?utm_medium=copy_link',
  );
  const [facebook, setfacebook] = useState(
    'https://m.facebook.com/102291055360961/',
  );

  const whatsAppLink=useCallback(async()=>{
    const res=await fetch('https://arcane-island-23682.herokuapp.com/getOtherLinks',{
      method:'GET'
    })
    const resData=await res.json();
     setWhatsapp(resData[3].link);
  },[])
  useEffect(()=>{
    whatsAppLink()
  },[])

  const callHandler = () => {
    Linking.openURL(`tel:${mobile}`);
  };
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>
        If you have any problem or queries Please Contact Us
      </Text>
      <View style={styles.container}>
        <Text style={styles.normalText}>
          Call Us :<Text style={styles.specialtext}> {mobile}</Text>
        </Text>
        <Text style={styles.normalText}>
          Email Us :
          <Text style={styles.specialtext}>pravahsarang@gmail.com</Text>
        </Text>
      </View>
      <View style={styles.socialMedia}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(facebook);
          }}>
          <Ionicons
            name="md-logo-facebook"
            size={35}
            color={Colors.primary}
            style={{marginHorizontal: 15}}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(instagram);
          }}>
          <Ionicons
            name="md-logo-instagram"
            size={35}
            color={Colors.primary}
            style={{marginHorizontal: 15}}></Ionicons>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Linking.openURL(whatsapp);
          }}>
          <Ionicons
            name="md-logo-whatsapp"
            size={35}
            color={Colors.primary}
            style={{marginHorizontal: 15}}></Ionicons>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.68}
        onPress={callHandler}>
        <Text style={styles.btnText}>Call Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: height / 33,
  },
  btnText: {
    color: 'black',
    fontSize: height / 45,
    fontFamily: 'OpenSans-Bold',
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    elevation: 10,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    fontSize: height / 36,
    color: 'black',
    marginTop: -height / 10,
  },
  normalText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: height / 36,
    color: 'black',
    marginBottom: height / 33,
    marginTop: height / 66,
    width: width / 1.2,
    textAlign: 'center',
  },
  specialtext: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    fontSize: height / 36,
    color: Colors.primary,
    margin: height / 33,
  },
  container: {
    padding: height / 66,
    margin: height / 66,
    alignItems: 'center',
  },
  socialMedia: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: height / 15,
    marginVertical: height / 25,
  },
});

export default ContactScreen;
