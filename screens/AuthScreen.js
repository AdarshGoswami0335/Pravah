import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Colors from '../Colors/Colors';
import OTPTextView from 'react-native-otp-textinput';
import auth from '@react-native-firebase/auth';
import * as AuthAction from '../store/actions/AuthAction';
import {useDispatch} from 'react-redux';
const {width, height} = Dimensions.get('window');

const AuthScreen = props => {
  const dispatch = useDispatch();
  const [verify, setVerify] = useState(false);
  const [confirm, setConfirm] = useState();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  const OtpSendHandler = async () => {
    setLoading(true);
    const confirmation = await auth().signInWithPhoneNumber('+91' + mobile);
    setVerify(true);
    setLoading(false);
    setConfirm(confirmation);
  };

  if (confirm) {
    auth().onAuthStateChanged(function async(user) {
      // handle it
      if (user) {
        dispatch(AuthAction.authentication(mobile));
        props.navigation.navigate('Home');
        setVerify(false);
      } else {
        console.log('no user');
      }
    });
  }

  const verifyHandler = async () => {
    setLoading(true);
    try {
      await confirm.confirm(code);
      dispatch(AuthAction.authentication(mobile));
      const res = await fetch(
        'https://arcane-island-23682.herokuapp.com/loginOnly',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            mobile: mobile,
          }),
        },
      );
      props.navigation.navigate('Home');
      setVerify(false);
      setLoading(false);
    } catch (error) {
      Alert.alert('Invalid Code', 'Please Try Again');
    }
    setLoading(false);
  };

  const resendHandler = () => {
    setVerify(false);
  };

  if (loading) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: height / 2.2,
        }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (verify) {
    return (
      <ImageBackground
        source={require("../images/background.png")}
        style={styles.background}>
        <View style={styles.card}>
          <Text style={styles.text}>Verify Your Phone Number</Text>

          <OTPTextView
            handleTextChange={e => setCode(e)}
            containerStyle={{
              alignSelf: 'center',
              marginVertical: 10,
            }}
            textInputStyle={styles.roundedTextInput}
            tintColor={Colors.primary}
            inputCount={6}
            offTintColor="#d6d6d6"
            autoFocus={true}
          />

          <View style={styles.VerifybtnContainer}>
            <TouchableOpacity style={styles.Verifybtn} onPress={verifyHandler}>
              <Text style={styles.btnText}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Resendbtn} onPress={resendHandler}>
              <Text style={styles.btnText}>Resend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
  return (
    <ImageBackground
    source={require("../images/background.png")}
      style={styles.backgroundVerify}>
      <Text style={styles.heading}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="grey"
          onChangeText={val => {
            setName(val);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="number-pad"
          placeholderTextColor="grey"
          maxLength={10}
          onChangeText={val => {
            setMobile(val);
          }}
        />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={OtpSendHandler}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.botttomContainer}>
        <Text style={styles.bottomText}>Welcome to</Text>
        <Text style={styles.bottomSpecialText}> Pravah</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    marginHorizontal: width / 30,
    marginBottom: 10,
  },
  backgroundVerify: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: height / 24,
    fontFamily: 'OpenSans-Bold',
    marginLeft: -height / 3.3,
    marginTop: height / 3,
    marginBottom: height / 20,
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    height: height / 13,
    width: width / 1.3,
    borderColor: 'grey',
    borderWidth: 0.5,
    marginBottom: height / 35,
    borderRadius: height / 13,
    fontFamily: 'OpenSans-Regular',
    padding: 12,
    color:"black"
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: height / 65,
    width: width / 1.3,
    alignItems: 'center',
    borderRadius: height / 13,
  },
  Verifybtn: {
    backgroundColor: Colors.primary,
    padding: height / 65,
    width: width / 3,
    alignItems: 'center',
    borderRadius: height / 13,
    marginHorizontal: 10,
  },
  Resendbtn: {
    backgroundColor: 'purple',
    padding: height / 65,
    width: width / 3,
    alignItems: 'center',
    borderRadius: height / 13,
    marginHorizontal: 10,
  },
  btnContainer: {
    alignItems: 'center',
  },
  VerifybtnContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 25,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
  },
  botttomContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  bottomSpecialText: {
    color: Colors.primary,
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
    fontSize: 15,
  },
  bottomText: {
    color: 'black',
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f6f6f6',
    marginVertical: 20,
    height: height / 3,
    width: width / 1.04,
    alignSelf: 'center',
    marginTop: height / 2.7,
    borderRadius: 15,
    justifyContent: 'flex-end',
  },
  textInputContainer: {
    marginBottom: 10,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
    color: 'black',
    fontFamily: 'OpenSans-Bold',
  },
});

export default AuthScreen;
