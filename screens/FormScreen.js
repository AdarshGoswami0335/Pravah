import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  ScrollView,
  Picker,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Button, Portal, Modal} from 'react-native-paper';
import Colors from '../Colors/Colors';
import FormCard from '../components/FormCard';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
const {width, hgt} = Dimensions.get('window');

const FormScreen = props => {
  const [manglik, setManglik] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [color, setColor] = useState('');
  const [age, setAge] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState();
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [marital, setMarital] = useState('');
  const [income, setIncome] = useState('');
  const [education, setEducation] = useState('');
  const [work, setWork] = useState('');
  const [workplace, setWorkPlace] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [gotra, setGotra] = useState('');
  const [father, setFather] = useState('');
  const [dada, setDada] = useState('');
  const [nana, setNana] = useState('');
  const [mother, setMother] = useState('');
  const [siblings, setSiblings] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [familyBusiness, setfamilyBusiness] = useState('');
  const [whatsappMobile, setWhatsappMobile] = useState('');
  const [other, setOther] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [city, setCity] = useState('');
  const [upload, setUpload] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const loginNo = useSelector(state => state.auth.mobile);

  const hideModal = () => {
    setVisible(false);
  };
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    height: Dimensions.get('window').height / 2,
    margin: 20,
    marginBottom: Dimensions.get('window').height / 15,
  };

  if (loading) {
    return (
      <LottieView
        source={require('../animations/loading.json')}
        autoPlay
        loop
      />
    );
  }

  const validationHandler = () => {
    if (name.length === 0) {
      alert('कृपया अपना नाम भरे');
    } else if (mobile.length === 0) {
      alert('कृपया अपना मोबाइल नंबर भरे');
    } else if (whatsappMobile.length === 0) {
      alert('कृपया अपना व्हाट्सएप मोबाइल नंबर भरे');
    } else {
      setLoading(true);
      submitHandler();
    }
  };

  const submitHandler = async () => {
    await fetch('https://arcane-island-23682.herokuapp.com/insert', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        dada: dada,
        nana: nana,
        familyBusiness: familyBusiness,
        others: other,
        birthTime: birthTime,
        siblings: siblings,
        workPlace: workplace,
        whatsapp: whatsappMobile,
        name: name,
        gender: gender,
        height: height,
        color: color,
        dob: `${day} ${month}`,
        yob: year,
        manglik: manglik,
        mobile_no: mobile,
        image: imgUrl,
        maritalStatus: marital,
        birthplace: birthPlace,
        address: address,
        city: city,
        education: education,
        work: work,
        income: income,
        gotra: gotra,
        father: father,
        mother: mother,
        status: 'Pending',
        loginNo: loginNo,
        profileViews: 0,
      }),
    });
    setName('');
    setBirthPlace('');
    setWork('');
    setDay('');
    setWorkPlace('');
    setGender('');
    setManglik('');
    setColor('');
    setMarital('');
    setHeight('');
    setFather('');
    setMother('');
    setDada('');
    setCity('');
    setNana('');
    setSiblings('');
    setBirthTime('');
    setGotra('');
    setEducation('');
    setIncome('');
    setfamilyBusiness('');
    setAddress('');
    setMobile('');
    setWhatsappMobile('');
    setOther('');
    setCity('');
    setYear('');
    setImgUrl('');
    setMonth('');

    setLoading(false);
    alert('BioData Added Successfully');
    props.navigation.navigate('Home');
  };

  const imageHandler = async () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 1500,
      cropping: true,
    }).then(async image => {
      const imageUri = image.path;
      setImage(imageUri);
      setVisible(true);
    });
  };

  const imageUploader = async () => {
    setVisible(false);
    setUpload(true);
    const formData = new FormData();
    formData.append('profile', {
      name: image,
      uri: image,
      type: 'image/jpg',
    });
    const res = await fetch(
      'https://arcane-island-23682.herokuapp.com/upload',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
        body: formData,
      },
    );
    const imageUrl = await res.text();
    setImgUrl(imageUrl);
  };

  return (
    <ScrollView style={{margin: 10}}>
      <View style={styles.note}>
        <Text style={styles.noteHeading}>नोट-:</Text>
        <Text style={styles.noteText}>
          इस ऐप में हमारे द्वाराकेवल बायोडाटा का संकलन किया गया है| किसी भी
          संबंध को आगे बढ़ाने से पूर्व तथ्यों की पुष्टि स्वयं करें |
        </Text>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Image
            source={{uri: image}}
            style={{
              height: Dimensions.get('window').height / 3,
              width: Dimensions.get('window').width / 1.2,
              margin: 20,
              borderRadius: 10,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button color={Colors.accent} onPress={() => setVisible(false)}>
              Cancel
            </Button>
            <Button color={Colors.primary} onPress={imageUploader}>
              Confirm
            </Button>
          </View>
        </Modal>
      </Portal>
      <FormCard
        head="नाम :"
        value={name}
        onChangeText={val => {
          setName(val);
        }}
      />
      {upload === true ? (
        <Button
          color="green"
          labelStyle={{
            color: 'green',
          }}
          style={{
            borderWidth: 2,
            borderColor: 'green',
            marginVertical: 8,
          }}>
          Image Uploaded Successfully
        </Button>
      ) : (
        <Button
          mode="outlined"
          color={Colors.primary}
          style={{
            marginVertical: 10,
            borderColor: Colors.primary,
            borderWidth: 1,
          }}
          onPress={imageHandler}>
          फ़ोटो डाले
        </Button>
      )}

      <FormCard
        head="जन्मस्थान :"
        value={birthPlace}
        onChangeText={val => {
          setBirthPlace(val);
        }}
      />
      <FormCard
        head="व्यवसाय स्वयं का :"
        value={work}
        onChangeText={val => {
          setWork(val);
        }}
      />
      <FormCard
        head="जन्म दिनांक :"
        value={day}
        onChangeText={val => {
          setDay(val);
        }}
        type="number-pad"
      />
      <FormCard
        head="जन्म माह :"
        value={month}
        onChangeText={val => {
          setMonth(val);
        }}
        type="number-pad"
      />
      <FormCard
        head="जन्म वर्ष :"
        value={year}
        onChangeText={val => {
          setYear(val);
        }}
        type="number-pad"
      />
      <FormCard
        head="कार्य स्थल :"
        value={workplace}
        onChangeText={val => {
          setWorkPlace(val);
        }}
      />
      <Text style={styles.headTxt}>लिंग :</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={gender}
          style={{color: 'black'}}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
          <Picker.Item label="लिंग" value="लिंग" color={Colors.primary} />
          <Picker.Item label="पुरूष" color={Colors.primary} value="पुरूष" />
          <Picker.Item label="स्त्री" color={Colors.primary} value="स्त्री" />
        </Picker>
      </View>
      <Text style={styles.headTxt}>मांगलिक स्थिति :</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={manglik}
          style={{color: 'black'}}
          onValueChange={(itemValue, itemIndex) => setManglik(itemValue)}>
          <Picker.Item
            label="मांगलिक स्थिति"
            value="मांगलिक स्थिति"
            color={Colors.primary}
          />
          <Picker.Item label="मांगलिक" color={Colors.primary} value="मांगलिक" />
          <Picker.Item label="हा" color={Colors.primary} value="हा" />
          <Picker.Item label="नही" color={Colors.primary} value="नही" />
          <Picker.Item
            label="आंशिक मांगलिक"
            color={Colors.primary}
            value="आंशिक मांगलिक"
          />
        </Picker>
      </View>
      <Text style={styles.headTxt}>रंग :</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={color}
          style={{color: 'black'}}
          onValueChange={(itemValue, itemIndex) => setColor(itemValue)}>
          <Picker.Item label="रंग" value="रंग" color={Colors.primary} />
          <Picker.Item label="गोरा" color={Colors.primary} value="गोरा" />
          <Picker.Item label="गेहुआ" color={Colors.primary} value="गेहुआ" />
          <Picker.Item label="सावला" color={Colors.primary} value="सावला" />
        </Picker>
      </View>
      <Text style={styles.headTxt}>वैवाहिक स्तिथि :</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={marital}
          style={{color: 'black'}}
          onValueChange={(itemValue, itemIndex) => setMarital(itemValue)}>
          <Picker.Item
            label="वैवाहिक स्तिथि"
            color={Colors.primary}
            value="वैवाहिक स्तिथि"
          />
          <Picker.Item
            label="अविवाहित"
            color={Colors.primary}
            value="अविवाहित"
          />
          <Picker.Item
            label="तलाकशुदा"
            color={Colors.primary}
            value="तलाकशुदा"
          />
          <Picker.Item
            label="विधुर/विधवा"
            color={Colors.primary}
            value="विधुर/विधवा"
          />
          <Picker.Item
            label="दिव्यांग"
            color={Colors.primary}
            value="दिव्यांग"
          />
          <Picker.Item label="अन्य" color={Colors.primary} value="अन्य" />
        </Picker>
      </View>
      <Text style={styles.headTxt}>कद :</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={height}
          style={{color: 'black'}}
          onValueChange={(itemValue, itemIndex) => setHeight(itemValue)}>
          <Picker.Item label="कद" value="कद" color={Colors.primary} />
          <Picker.Item label="4ft 6in" value="4ft 6in" color={Colors.primary} />
          <Picker.Item label="4ft 7in" value="4ft 7in" color={Colors.primary} />
          <Picker.Item label="4ft 8in" value="4ft 8in" color={Colors.primary} />
          <Picker.Item label="4ft 9in" value="4ft 9in" color={Colors.primary} />
          <Picker.Item
            label="4ft 10in"
            value="4ft 10in"
            color={Colors.primary}
          />
          <Picker.Item
            label="4ft 11in"
            value="4ft 11in"
            color={Colors.primary}
          />
          <Picker.Item label="5ft" value="5ft" color={Colors.primary} />
          <Picker.Item label="5ft 1in" value="5ft 1in" color={Colors.primary} />
          <Picker.Item label="5ft 2in" value="5ft 2in" color={Colors.primary} />
          <Picker.Item label="5ft 3in" value="5ft 3in" color={Colors.primary} />
          <Picker.Item label="5ft 4in" value="5ft 4in" color={Colors.primary} />
          <Picker.Item label="5ft 5in" value="5ft 5in" color={Colors.primary} />
          <Picker.Item label="5ft 6in" value="5ft 6in" color={Colors.primary} />
          <Picker.Item label="5ft 7in" value="5ft 7in" color={Colors.primary} />
          <Picker.Item label="5ft 8in" value="5ft 8in" color={Colors.primary} />
          <Picker.Item label="5ft 9in" value="5ft 9in" color={Colors.primary} />
          <Picker.Item
            label="5ft 10in"
            value="5ft 10in"
            color={Colors.primary}
          />
          <Picker.Item
            label="5ft 11in"
            value="5ft 11in"
            color={Colors.primary}
          />
          <Picker.Item label="6ft" value="6ft" color={Colors.primary} />
          <Picker.Item label="6ft 1in" value="6ft 1in" color={Colors.primary} />
          <Picker.Item label="6ft 2in" value="6ft 2in" color={Colors.primary} />
          <Picker.Item label="6ft 3in" value="6ft 3in" color={Colors.primary} />
          <Picker.Item label="6ft 4in" value="6ft 4in" color={Colors.primary} />
          <Picker.Item label="6ft 5in" value="6ft 5in" color={Colors.primary} />
          <Picker.Item label="6ft 6in" value="6ft 6in" color={Colors.primary} />
          <Picker.Item label="6ft 7in" value="6ft 7in" color={Colors.primary} />
          <Picker.Item label="6ft 8in" value="6ft 8in" color={Colors.primary} />
          <Picker.Item label="6ft 9in" value="6ft 9in" color={Colors.primary} />
          <Picker.Item
            label="6ft 10in"
            value="6ft 10in"
            color={Colors.primary}
          />
          <Picker.Item
            label="6ft 11in"
            value="6ft 11in"
            color={Colors.primary}
          />
          <Picker.Item label="7ft" value="7ft" color={Colors.primary} />
        </Picker>
      </View>
      <FormCard
        head="पिताजी :"
        value={father}
        onChangeText={val => {
          setFather(val);
        }}
      />
      <FormCard
        head="माताजी :"
        value={mother}
        onChangeText={val => {
          setMother(val);
        }}
      />
      <FormCard
        head="दादाजी :"
        value={dada}
        onChangeText={val => {
          setDada(val);
        }}
      />
      <FormCard
        head="नानाजी :"
        value={nana}
        onChangeText={val => {
          setNana(val);
        }}
      />
      <FormCard
        head="भाई बहन :"
        value={siblings}
        onChangeText={val => {
          setSiblings(val);
        }}
      />
      <FormCard
        head="जन्म समय :"
        value={birthTime}
        onChangeText={val => {
          setBirthTime(val);
        }}
      />
      <FormCard
        head="गोत्र (परिवार) :"
        value={gotra}
        onChangeText={val => {
          setGotra(val);
        }}
      />
      <FormCard
        head="शैक्षणिक योग्यता् :"
        value={education}
        onChangeText={val => {
          setEducation(val);
        }}
      />
      <FormCard
        head="मासिक आय :"
        value={income}
        onChangeText={val => {
          setIncome(val);
        }}
        type="number-pad"
      />
      <FormCard
        head="पारिवारिक व्यवसाय :"
        value={familyBusiness}
        onChangeText={val => {
          setfamilyBusiness(val);
        }}
      />
      <FormCard
        head="Address/पता :"
        value={address}
        onChangeText={val => {
          setAddress(val);
        }}
      />
      <FormCard
        head="निवास (शहर का नाम) :"
        value={city}
        onChangeText={val => {
          setCity(val);
        }}
      />
      <FormCard
        head="फ़ोन नंबर :"
        value={mobile}
        onChangeText={val => {
          setMobile(val);
        }}
        type="number-pad"
      />
      <FormCard
        head="व्हाट्सएप नंबर :"
        value={whatsappMobile}
        onChangeText={val => {
          setWhatsappMobile(val);
        }}
        type="number-pad"
      />
      <FormCard
        head="अन्य कोई विशेष जानकारी/प्रथमिकता"
        value={other}
        onChangeText={val => {
          setOther(val);
        }}
      />

      <Button
        mode="contained"
        color={Colors.primary}
        style={{marginVertical: 10}}
        onPress={validationHandler}>
        Submit
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  note: {
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: 15,
  },
  noteHeading: {
    fontFamily: 'NotoSerif-Bold',
    fontSize: 25,
  },
  noteText: {
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  picker: {
    height: 50,
    width: 150,
    borderColor: Colors.primary,
    borderWidth: 2,
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  headTxt: {
    color: '#262626',
    fontSize: 16,
    fontFamily: 'NotoSerif-Bold',
    marginBottom: 5,
  },
});

export default FormScreen;
