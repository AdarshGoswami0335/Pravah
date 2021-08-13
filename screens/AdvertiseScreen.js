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
const {width, height} = Dimensions.get('window');

const AdvertiseScreen = props => {
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [upload, setUpload] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const id = props.route.params.id;

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
      <View style={{marginTop: height / 2.7}}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  const submitHandler = async () => {
    setLoading(true);
    const res = await fetch('https://arcane-island-23682.herokuapp.com/ad', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        link: link,
        image: imgUrl,
      }),
    });
    setLoading(false);
    alert('Add added successfully');
    props.navigation.goBack();
  };

  const imageHandler = async () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 800,
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
    alert('Image has been uploaded to Server');
  };

  return (
    <ScrollView style={{margin: 10}}>
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
        head="Link :"
        value={link}
        onChangeText={val => {
          setLink(val);
        }}
      />

      <Button
        mode="contained"
        color={Colors.primary}
        style={{marginVertical: 10}}
        onPress={submitHandler}>
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

export default AdvertiseScreen;
