import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Avatar, Button, Portal, Modal} from 'react-native-paper';
import Colors from '../Colors/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Searchbar, RadioButton} from 'react-native-paper';
const {width, height} = Dimensions.get('window');

const AdminOverviewScreen = props => {
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const [gender, setGender] = useState('');
  const [manglik, setManglik] = useState('');
  const [data, setData] = useState();
  const [searchData, setSearchData] = useState();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <View style={{marginTop: height / 2.7}}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  const searchHandler = val => {
    if (val) {
      const newData = data.filter(item => {
        const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase();
        const valData = val.toLowerCase();
        return itemData.indexOf(valData) > -1;
      });
      if (newData.length === 0) {
        const newDataByCity = data.filter(item => {
          const itemDataCity = item.city
            ? item.city.toLowerCase()
            : ''.toLowerCase();
          const valDataCity = val.toLowerCase();
          return itemDataCity.indexOf(valDataCity) > -1;
        });
        setSearchData(newDataByCity);
        console.log(newDataByCity);
      } else {
        setSearchData(newData);
      }
    } else {
      setSearchData(data);
    }
  };

  const premiumHandler = () => {};

  const rejectHandler = () => {};

  const editHandler = () => {};

  const removeAd = async (id) => {
    const res = await fetch(
      'https://arcane-island-23682.herokuapp.com/removeAd',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
        }),
      },
    )
    alert('Ad Removed Successfully');
  };

  const loadData = useCallback(async () => {
    try {
      const res = await fetch('https://arcane-island-23682.herokuapp.com/', {
        method: 'GET',
      });
      const resData = await res.json();
      setData(resData);
      setSearchData(resData);
    } catch (error) {
      throw error;
    }
  }, []);
  useEffect(() => {
    loadData();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.normal}>
        <Image
          resizeMode="cover"
          source={{uri: item.image}}
          style={styles.premiumImage}
        />

        <View style={styles.textContainer}>
          <Text style={styles.text}>नाम : {item.name}</Text>
          <Text style={styles.text}>
            ID : {item.id}{' '}
            {/*Ja wa id aayi no wali jon se user search bhi ho jaat h */}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <Button
            mode="outlined"
            color={Colors.primary}
            onPress={() => {
              props.navigation.navigate('AdminDetails', {
                id: item.id,
              });
            }}
            style={{
              marginHorizontal: 8,
              borderColor: Colors.primary,
              borderWidth: 1,
            }}>
            See Profile
          </Button>
          <Button
            mode="outlined"
            color={Colors.primary}
            onPress={() => {
              props.navigation.navigate('Advertise', {
                id: item.id,
              });
            }}
            style={{
              marginHorizontal: 8,
              borderColor: Colors.primary,
              borderWidth: 1,
            }}>
            Add Advertisement
          </Button>

          {/*<Button
          mode="outlined"
          color={Colors.primary}
          onPress={editHandler}
          style={{
            marginHorizontal: 8,
            borderColor: Colors.primary,
            borderWidth: 1,
          }}>
          Edit
        </Button>*/}
        </View>
        <View style={styles.btnContainer}>
          <Button
            mode="outlined"
            color={Colors.primary}
            onPress={() => {
              removeAd(item.id);
            }}
            style={{
              marginHorizontal: 8,
              borderColor: Colors.primary,
              borderWidth: 1,
              marginVertical: 15,
            }}>
            Remove Ad
          </Button>
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={{flex: 1, marginBottom: 10}}>
      <View style={{flexDirection: 'row'}}>
        <Searchbar
          placeholder="Search...."
          onChangeText={val => {
            searchHandler(val);
          }}
          inputStyle={{color: 'black', fontFamily: 'OpenSans-Bold'}}
          style={{
            borderColor: Colors.primary,
            borderWidth: 2,
            marginVertical: 8,
            width: '94%',
            marginLeft: 10,
            backgroundColor:"white"
          }}
        />
      </View>
      <FlatList
        data={searchData}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dashboard: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 20,
    marginBottom: 15,
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingBottom: 10,
  },
  king: {
    height: 50,
    width: 50,
    marginTop: -height / 1.6,
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    borderRadius: 12,
  },
  heading: {
    fontFamily: 'OpenSans-Bold',
    textAlign: 'center',
    fontSize: 25,
    marginVertical: 10,
  },
  subHeading: {
    fontFamily: 'NotoSerif-Bold',
    fontSize: 20,
    marginVertical: 10,
  },
  text: {
    color: 'black',
    fontFamily: 'NotoSerif-Bold',
    fontSize: 19,
    marginBottom: 5,
  },
  textContainer: {
    marginLeft: 20,
    marginVertical: 10,
    marginBottom: 15,
  },
  premiumImage: {
    height: '65%',
    width: '100%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  avatar: {
    marginVertical: 25,
    marginLeft: 25,
    resizeMode: 'cover',
  },
  name: {
    color: 'black',
    fontFamily: 'OpenSans-Bold',
    fontSize: 19,
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: height / 20,
    marginHorizontal: 15,
  },
  other: {
    color: 'black',
    fontFamily: 'OpenSans-Bold',
    fontSize: 19,
    alignSelf: 'center',
    marginTop: -height / 13,
    marginRight: height / 15,
  },
  profilebtn: {
    marginTop: height / 30,
    marginBottom: height / 25,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  premium: {
    backgroundColor: 'white',
    borderColor: '#FFDC1A',
    borderWidth: 3,
    height: height / 1.6,
    marginHorizontal: 10,
    borderRadius: 15,
    marginBottom: 25,
  },
  normal: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 2,
    height: height / 1.3,
    marginHorizontal: 10,
    borderRadius: 15,
    marginBottom: 25,
  },
  btn: {
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderBottomWidth: 3,
    marginTop: -10,
    borderColor: '#FFDC1A',
  },
  normalbtn: {
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  options: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    marginTop: 6,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1.5,
    fontFamily: 'OpenSans-Bold',
    padding: 10,
    fontSize: 16,
    marginVertical: 20,
  },
});

export default AdminOverviewScreen;
