import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Colors from '../Colors/Colors';
const {width, height} = Dimensions.get('window');

const FavouriteScreen = props => {
  const [favArray, setFavArray] = useState([]);
  const mobile = useSelector(state => state.auth.mobile);
  const [count, setCount] = useState(0);

  const loadFavs = useCallback(async () => {
    const res = await fetch(
      'https://arcane-island-23682.herokuapp.com/getFav',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          phone: mobile,
        }),
      },
    );
    const favs = await res.json();
    setFavArray(favs);
  }, [count, favArray]);


  useEffect(() => {
    const focus = props.navigation.addListener('willFocus', loadFavs);
    return () => {
      //ocus.remove();
    };
  }, [loadFavs]);

  useEffect(() => {
    loadFavs();
  }, [loadFavs]);



  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.push('Details', {
            id: item.id,
          });
        }}
        activeOpacity={0.75}>
        <View style={styles.dashboard}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Avatar.Image
                size={height / 9}
                source={{uri: item.image}}
                style={styles.avatar}
              />
              <Text style={styles.name}>{item.name}</Text>
            </View>

            <Text style={styles.other}>{item.dob} {item.yob}</Text>
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
                  props.navigation.navigate('Details', {
                    id: item.id,
                  });
                }}>
                See Profile
              </Button>
              <TouchableOpacity
                style={styles.dynamicbtn}
                onPress={async () => {
                  const res = await fetch(
                    'https://arcane-island-23682.herokuapp.com/deleteFav',
                    {
                      method: 'POST',
                      headers: {
                        'content-type': 'application/json',
                      },
                      body: JSON.stringify({
                        id: item.id,
                        phone: mobile,
                      }),
                    },
                  );
                  const resData = await res.json();
                  setFavArray(resData);
                }}>
                <Icon name="md-trash" size={35} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Favourites</Text>
        </View>
        <FlatList
          data={favArray}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.primary,
    fontFamily: 'OpenSans-Bold',
    fontSize: 22,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    margin: 15,
    borderRadius: 2,
  },
  dashboard: {
    backgroundColor: 'white',
    padding: 5,
    margin: 15,
    borderRadius: 18,
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
    marginLeft: 20,
  },
  other: {
    color: 'black',
    fontFamily: 'OpenSans-Bold',
    fontSize: 19,
    alignSelf: 'center',
    marginTop: -height / 13,
  
  },
  adddata: {
    color: 'white',
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: -height / 13,
    marginLeft: height / 13,
  },
  btn: {
    marginHorizontal: 12,
    borderRadius: 3,
    height: height / 17,
    backgroundColor: Colors.primary,
  },
  profilebtn: {
    marginTop: height / 30,
    marginBottom: height / 25,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  dynamicbtn: {
    marginTop: height / 40,
    borderRadius: height / 15,
    width: height / 15,
    height: height / 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FavouriteScreen;
