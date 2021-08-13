import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {Button, Modal, Portal} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../Colors/Colors';
const {width, height} = Dimensions.get('window');

const AdminPanelScreen = props => {
  const [mobile, setMobile] = useState('');
  const [link, setLink] = useState('');
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState('');
  const [id, setId] = useState('');
  const [imageUrl, setImgUrl] = useState('');
  const [pending, setPending] = useState('');
  const [approved, setApproved] = useState('');
  const [total, setTotal] = useState('');
  const length = async () => {
    const res = await fetch(
      'https://arcane-island-23682.herokuapp.com/length',
      {
        method: 'GET',
      },
    );
    const resData = await res.json();
    const a = resData.filter(item => item.status === 'Approved').length;
    const p = resData.filter(item => item.status === 'Pending').length;
    const t = resData.length;
    setPending(p);
    setApproved(a);
    setTotal(t);
  };
  useEffect(() => {
    length();
  }, []);

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

  const adminUserHandler = async () => {
    setMobile('');
    alert('User Added to Admin Successfully');
    const res = await fetch(
      'https://arcane-island-23682.herokuapp.com/addAdmin',
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
  };

  const loadData = useCallback(async () => {
    const res = await fetch('https://arcane-island-23682.herokuapp.com/admin', {
      method: 'GET',
    });
    const arr = await res.json();
    setData(arr);
  }, []);
  useEffect(() => {
    loadData();
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          props.navigation.navigate('AdminDetails', {id: item.id});
        }}>
        <Text style={styles.name}>{item.name}</Text>
        <Feather name="arrow-right-circle" size={35} color={Colors.primary} />
      </TouchableOpacity>
    );
  };

  const linkHandler = async () => {
    const res = await fetch(
      'https://arcane-island-23682.herokuapp.com/sammelanUpdate',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          link: link,
        }),
      },
    );
    setLink("");
    alert("Link updated Successfully")
  };

  const imageUploader = async () => {
    setVisible(false);
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
    alert('Now you can update the slide');
  };

  const submitHandler = async () => {
    const res = await fetch(
      'https://arcane-island-23682.herokuapp.com/updateSlides',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          link: imageUrl,
        }),
      },
    ).then(() => {
      setVisible(false);
      alert('Slide has been updated');
    });
  };

  const slideHandler = id => {
    ImagePicker.openPicker({
      width: 1200,
      height: 800,
      cropping: true,
    }).then(image => {
      const imageUri = image.path;
      setImage(imageUri);
      setId(id);
      setVisible(true);
    });
  };

  return (
    <ScrollView>
      <View style={styles.btnContainer}>
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
        <Button
          mode="outlined"
          color="#262626"
          style={{marginVertical: 10, borderColor: 'green', borderWidth: 1}}
          onPress={() => {
            props.navigation.navigate('AdminOverview');
          }}>
          See All BioDatas
        </Button>
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            elevation: 5,
            width: '100%',
            borderRadius: 5,
            alignItems: 'center',
            marginVertical: 15,
          }}>
          <View
            style={{
              width: '33.33%',
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#f4f4f4',
              padding: 5,
            }}>
            <Text style={{color: 'gray', fontSize: 12, textAlign: 'center'}}>
              Pending BioDatas
            </Text>
            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
              {pending}
            </Text>
          </View>
          <View
            style={{
              width: '33.33%',
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#f4f4f4',
              padding: 5,
            }}>
            <Text style={{color: 'gray', fontSize: 12, textAlign: 'center'}}>
              Total BioDatas
            </Text>
            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
              {total}
            </Text>
          </View>
          <View
            style={{
              width: '33.33%',
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#f4f4f4',
              padding: 5,
            }}>
            <Text style={{color: 'gray', fontSize: 12, textAlign: 'center'}}>
              Approved BioDatas
            </Text>
            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
              {approved}
            </Text>
          </View>
        </View>
        <Button
          mode="contained"
          color={Colors.primary}
          style={{
            marginVertical: 10,
            borderColor: Colors.primary,
            borderWidth: 1,
          }}
          onPress={() => {
            props.navigation.navigate('Admin Data');
          }}>
          Add BioData
        </Button>
        <TextInput
          placeholder="Add Admin User"
          keyboardType="number-pad"
          placeholderTextColor="grey"
          style={styles.input}
          value={mobile}
          onChangeText={val => {
            setMobile(val);
          }}
        />
        {
          mobile.length === 10 ? 
          <Button
          mode="contained"
          color={Colors.primary}
          style={{
            marginVertical: 10,
            borderColor: Colors.primary,
            borderWidth: 1,
          }}
          onPress={adminUserHandler}>
          Add User
        </Button>:
        <View></View>
        }
        
        <Button
          mode="outlined"
          color={Colors.primary}
          style={{
            marginVertical: 10,
            borderColor: Colors.primary,
            borderWidth: 1,
          }}
          onPress={() => slideHandler(1)}>
          Upload 1st Image
        </Button>
        <Button
          mode="outlined"
          color={Colors.primary}
          style={{
            marginVertical: 10,
            borderColor: Colors.primary,
            borderWidth: 1,
          }}
          onPress={() => slideHandler(2)}>
          Upload 2nd Image
        </Button>
        <Button
          mode="outlined"
          color={Colors.primary}
          style={{
            marginVertical: 10,
            borderColor: Colors.primary,
            borderWidth: 1,
          }}
          onPress={() => slideHandler(3)}>
          Upload 3rd Image
        </Button>
        <Button
          mode="outlined"
          color={Colors.primary}
          style={{
            marginVertical: 10,
            borderColor: Colors.primary,
            borderWidth: 1,
          }}
          onPress={() => slideHandler(4)}>
          Upload 4th Image
        </Button>
        <Button
          mode="outlined"
          color={Colors.primary}
          style={{
            marginVertical: 10,
            borderColor: Colors.primary,
            borderWidth: 1,
          }}
          onPress={() => slideHandler(5)}>
          Upload 5th Image
        </Button>
        <Button
          mode="outlined"
          color={Colors.primary}
          style={{
            marginVertical: 10,
            borderColor: Colors.primary,
            borderWidth: 1,
          }}
          onPress={() => slideHandler(6)}>
          Upload 6th Image
        </Button>
        {imageUrl ? (
          <Button
            mode="contained"
            color={Colors.primary}
            style={{
              marginVertical: 10,
              borderColor: Colors.primary,
              borderWidth: 1,
            }}
            onPress={submitHandler}>
            Update Slides
          </Button>
        ) : (
          <View></View>
        )}
      </View>

      <View style={styles.btnContainer}>
        <TextInput
          placeholder="Add Samellan Link"
          style={styles.input}
          value={link}
          placeholderTextColor="grey"
          onChangeText={val => {
            setLink(val);
          }}
          onSubmitEditing={linkHandler}
        />
      </View>

      <Text style={styles.heading}>Pending Requests</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
  },
  name: {
    fontFamily: 'OpenSans-Bold',
    textAlignVertical: 'center',
    marginLeft: 15,
    fontSize: 18,
  },
  btnContainer: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  input: {
    borderColor: Colors.primary,
    borderWidth: 2,
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    padding: 10,
    marginVertical: 10,
  },
});

export default AdminPanelScreen;
