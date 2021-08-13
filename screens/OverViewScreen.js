import React, {useState, useCallback, useEffect} from 'react';
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
  Linking,
} from 'react-native';
import {Avatar, Button, Portal, Modal} from 'react-native-paper';
import Colors from '../Colors/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Searchbar, RadioButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');

const OverviewScreen = props => {
  const mobile = useSelector(state => state.auth.mobile);
  const [showProfile, setShowProfile] = useState(true);
  const [search, setSearch] = useState();
  const [visible, setVisible] = useState(false);
  const [gender, setGender] = useState('');
  const [manglik, setManglik] = useState('');
  const [minYob, setMinYob] = useState('');
  const [maxYob, setMaxYob] = useState('');
  const [id, setId] = useState('');
  const [data, setData] = useState();
  const [searchdata, setSearchData] = useState();
  const [premiumData, setPremiumData] = useState();
  const [reset, setReset] = useState(false);
  const [premium, setPremium] = useState(true);
  const [profile, setprofile] = useState({});

  const loadProfile = useCallback(async () => {
    const res = await fetch(
      'https://arcane-island-23682.herokuapp.com/profiles',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          loginNo: mobile,
        }),
      },
    );
    const detailsData = await res.json();
    if (detailsData.length !== 0) {
      setShowProfile(true);
      setprofile(detailsData[0]);
    } else {
      setShowProfile(false);
    }
    //(detailsData[0])
    console.log(detailsData);
  }, []);
  useEffect(() => {
    loadProfile();
  }, []);

  const hideModal = () => {
    setVisible(false);
  };
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    height: Dimensions.get('screen').height / 1.4,
    margin: 20,
    marginBottom: Dimensions.get('screen').height / 15,
  };
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
        setPremium(false);
      } else {
        setSearchData(newData);
        setPremium(false);
      }
    } else {
      setSearchData(data);
      setPremium(true);
    }
  };

  const filterHandler = async () => {
    if (id.length !== 0) {
      setVisible(false);
      const res = await fetch(
        'https://arcane-island-23682.herokuapp.com/filterData',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            minYob: undefined,
            maxYob: undefined,
            manglik: undefined,
            gender: undefined,
          }),
        },
      );
      const resData = await res.json();
      setReset(true);
      setPremium(false);
      setSearchData(resData);
    } else {
      setVisible(false);
      const res = await fetch(
        'https://arcane-island-23682.herokuapp.com/filterData',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            minYob: minYob,
            maxYob: maxYob,
            manglik: manglik,
            gender: gender,
          }),
        },
      );
      const resData = await res.json();
      setReset(true);
      setPremium(false);
      setSearchData(resData);
    }
  };

  const loadData = useCallback(async () => {
    try {
      const res = await fetch('https://arcane-island-23682.herokuapp.com/', {
        method: 'GET',
      });
      const resData = await res.json();
      const premium = await resData.filter(bio => bio.user_type === 'Premium');
      setPremiumData(premium);
      console.log(premiumData);
      setData(resData);
      setSearchData(resData);
    } catch (error) {
      throw error;
    }
  }, []);
  useEffect(() => {
    loadData();
  }, []);

  const resetHandler = async () => {
    setMaxYob('');
    setMaxYob('');
    setGender('');
    setManglik('');
    setReset(false);
    setPremium(true);
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
  };

  const renderPremiumItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.premium}
          activeOpacity={0.6}
          onPress={() => {
            if (mobile) {
              props.navigation.navigate('Details', {
                id: item.id,
              });
            } else {
              props.navigation.navigate('Auth');
            }
          }}>
          <Image
            resizeMode="contain"
            source={{uri: item.image}}
            style={styles.premiumImage}
          />

          <View style={styles.textContainer}>
            <Text style={styles.text}>
              नाम : {item.name} ({item.id}){' '}
            </Text>
            <Text style={styles.text}>
              जन्म तिथि :- {item.dob} {item.yob}
            </Text>
            <Text style={styles.text}>मांगलिक स्थिति :- {item.manglik}</Text>
            <Text style={styles.text}>निवास :- {item.city}</Text>
          </View>

          <Button
            mode="contained"
            color={Colors.primary}
            style={styles.btn}
            onPress={() => {
              if (mobile) {
                props.navigation.navigate('Details', {
                  id: item.id,
                });
              } else {
                props.navigation.navigate('Auth');
              }
            }}>
            See Profile
          </Button>
          <Image
            source={{uri: 'https://i.imgur.com/dh8leLc.jpg'}}
            style={styles.king}
            resizeMode="cover"
          />
        </TouchableOpacity>
        {item.ad_image === 'No' ? (
          <View></View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              Linking.openURL(item.ad_link);
            }}>
            <Image
              source={{uri: item.ad_image}}
              style={{
                width: width / 1.1,
                height: height / 3.5,
                marginHorizontal: 20,
                alignSelf: 'center',
                marginVertical: 20,
                borderRadius: 10,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.normal}
          activeOpacity={0.6}
          onPress={() => {
            if (mobile) {
              props.navigation.navigate('Details', {
                id: item.id,
              });
            } else {
              props.navigation.navigate('Auth');
            }
          }}>
          <Image
            resizeMode="contain"
            source={{uri: item.image}}
            style={styles.premiumImage}
          />

          <View style={styles.textContainer}>
            <Text style={styles.text}>
              नाम : {item.name} ({item.id}){' '}
            </Text>
            <Text style={styles.text}>
              जन्म तिथि :- {item.dob} {item.yob}
            </Text>
            <Text style={styles.text}>मांगलिक स्थिति :- {item.manglik}</Text>
            <Text style={styles.text}>निवास :- {item.city}</Text>
          </View>

          <Button
            mode="contained"
            color={Colors.primary}
            style={styles.normalbtn}
            onPress={() => {
              if (mobile) {
                props.navigation.navigate('Details', {
                  id: item.id,
                });
              } else {
                props.navigation.navigate('Auth');
              }
            }}>
            See Profile
          </Button>
        </TouchableOpacity>
        {item.ad_image === 'No' ? (
          <View></View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              Linking.openURL(item.ad_link);
            }}>
            <Image
              source={{uri: item.ad_image}}
              style={{
                width: width / 1.1,
                height: height / 3.5,
                marginHorizontal: 20,
                alignSelf: 'center',
                marginVertical: 20,
                borderRadius: 10,
              }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={{flex: 1, marginBottom: 10}}>
      <View style={{flexDirection: 'row'}}>
        <Searchbar
          placeholder="नाम अथवा शहर"
          placeholderTextColor="grey"
          onChangeText={val => {
            searchHandler(val);
          }}
          inputStyle={{color: 'black', fontFamily: 'OpenSans-Bold'}}
          style={{
            borderColor: Colors.primary,
            borderWidth: 2,
            marginVertical: 8,
            width: '80%',
            marginLeft: 10,
            backgroundColor:"white"
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}>
            <Icon name="filter-outline" size={35} color="black" />
          </TouchableOpacity>
          <Text>Filter</Text>
        </View>
      </View>
      {reset ? (
        <Button
          mode="outlined"
          color={Colors.primary}
          style={{margin: 12, borderColor: Colors.primary, borderWidth: 1.5}}
          labelStyle={{
            fontFamily: 'OpenSans-Bold',
          }}
          onPress={resetHandler}>
          Reset Filters
        </Button>
      ) : (
        <View></View>
      )}
      <Button
        mode="contained"
        color={Colors.primary}
        style={{margin: 12,borderRadius:8}}
        labelStyle={{
          fontFamily: 'OpenSans-Bold',
        }}
        onPress={() => {
          if (mobile) {
            props.navigation.navigate('Add');
          } else {
            props.navigation.navigate('Auth');
          }
        }}>
        Add Your Bio Data
      </Button>

      {showProfile ? (
        <View style={styles.dashboard}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Avatar.Image
                size={height / 9}
                source={{uri: profile.image}}
                style={styles.avatar}
              />
              <Text style={styles.name}>{profile.name}</Text> 
            </View>

            <Text style={{
               color: profile.status === 'Pending' ? 'gold' : profile.status === "Rejected"?"red":'limegreen',
               fontFamily: 'OpenSans-Bold',
               fontSize: 19,
               alignSelf: 'center',
               marginTop: -height / 13,
               marginRight: height / 27,
            }}>{profile.status}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              }}>
              <Button
                color={Colors.primary}
                style={styles.profilebtn}
                labelStyle={{
                  fontFamily: 'OpenSans-Bold',
                }}
                onPress={() => {
                  props.navigation.navigate('Profile');
                }}>
                Your Profile
              </Button>
            </View>
          </View>
        </View>
      ) : (
        <View></View>
      )}
      {!premium ? (
        <View></View>
      ) : (
        <FlatList
          data={premiumData}
          renderItem={renderPremiumItem}
          keyExtractor={(item, index) => item.id}
        />
      )}

      <FlatList
        data={searchdata}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id}
      />

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text style={styles.heading}>Filters</Text>
          <Text style={styles.subHeading}>चयन करे :</Text>
          <RadioButton.Group
            onValueChange={newValue => setGender(newValue)}
            value={gender}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: width / 7,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.options}>युवक</Text>
                <RadioButton value="पुरूष" color={Colors.primary} uncheckedColor="black" />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.options}>युवती</Text>
                <RadioButton value="स्त्री" color={Colors.primary} uncheckedColor="black" />
              </View>
            </View>
          </RadioButton.Group>
          <Text style={styles.subHeading}>मांगलिक :</Text>
          <RadioButton.Group
            onValueChange={newValue => setManglik(newValue)}
            value={manglik}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.options}>हा</Text>
                <RadioButton value="हा" color={Colors.primary} uncheckedColor="black" />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.options}>नही</Text>
                <RadioButton value="नही" color={Colors.primary} uncheckedColor="black" />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.options}>आंशिक मांगलिक</Text>
                <RadioButton value="आंशिक मांगलिक" color={Colors.primary} uncheckedColor="black" />
              </View>
            </View>
          </RadioButton.Group>

          <TextInput
            style={styles.input}
            placeholder="Profile Id"
            keyboardType="number-pad"
            placeholderTextColor="grey"
            color="black"
            onChangeText={val => {
              setId(val);
            }}></TextInput>

          <Text style={styles.subHeading}>जन्म सन :</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: height / 25,
            }}>
            <TextInput
              style={styles.input}
              placeholder="जन्म सन से"
              keyboardType="number-pad"
              placeholderTextColor="grey"
              color="black"
              maxLength={4}
              onChangeText={val => {
                setMinYob(val);
              }}></TextInput>
            <TextInput
              style={styles.input}
              placeholder="जन्म सन तक"
              maxLength={4}
              keyboardType="number-pad"
              placeholderTextColor="grey"
              color="black"
              onChangeText={val => {
                setMaxYob(val);
              }}></TextInput>
          </View>
          <Button
            color={Colors.primary}
            onPress={filterHandler}
            mode="contained">
            Submit
          </Button>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 45,
  },
  normal: {
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 2,
    height: height / 1.6,
    marginHorizontal: 10,
    borderRadius: 15,
    marginBottom: 50,
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

export default OverviewScreen;
