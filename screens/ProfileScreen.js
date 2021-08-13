import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import AboutCard from '../components/AboutCard';
import PersonelDetailsCard from '../components/PersonelDetailsCard';
import EducationCard from '../components/EducationCard';
import KundliCard from '../components/KundliCard';
import FamilyDetailsCard from '../components/FamilyDetailsCard';
import Colors from '../Colors/Colors';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const ProfileScreen = props => {
  const mobile = useSelector(state => state.auth.mobile);

  const [data, setData] = useState([]);

  const loadData = useCallback(async () => {
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
    setData(detailsData);
  }, []);
  useEffect(() => {
    loadData();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={{margin: 10, flex: 1}}>
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={{
              uri: item.image,
            }}
          />
          <View style={styles.details}>
            <View style={styles.boxes}>
              <Text
                style={{
                  fontFamily: 'NotoSerif-Bold',
                  fontSize: 20,
                  color: 'black',
                  marginRight: 10,
                }}>
                Status :
              </Text>
              <Text
                style={{
                  fontFamily: 'NotoSerif-Bold',
                  fontSize: 17,
                  color: item.status === 'Pending' ? 'gold' : item.status === "Rejected"?"red":'limegreen',
                  textAlign: 'center',
                }}>
                {item.status}
              </Text>
            </View>
            <View style={styles.boxes}>
              <Text
                style={{
                  fontFamily: 'NotoSerif-Bold',
                  fontSize: 18,
                  color: 'black',
                }}>
                PROFILE VIEWS
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: 'OpenSans-Bold',
                  color: Colors.primary,
                }}>
                {item.profile_views}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <PersonelDetailsCard
            name={item.name}
            birthTime={item.birth_time}
            gender={item.gender}
            height={item.height}
            dob={item.dob}
            color={item.color}
            he={item.education}
            occupation={item.work}
            income={item.income}
            familyBusiness={item.family_business}
            birthplace={item.birthplace}
            manglik={item.manglik}
            gotra={item.gotra}
            father={item.father}
            mother={item.mother}
            siblings={item.siblings}
            dada={item.dada}
            status={item.marital_status}
            nana={item.nana}
            whatsappMobile={item.whatsapp}
            id={item.id}
            workplace={item.workplace}
            mobile={item.mobile_no}
            address={item.address}
          />

          {/*<EducationCard
            he={item.education}
            occupation={item.work}
            income={item.income}
            familyBusiness={item.family_business}
          />
          <KundliCard
            birthplace={item.birthplace}
            manglik={item.manglik}
            gotra={item.gotra}
          />
          <FamilyDetailsCard
            father={item.father}
            mother={item.mother}
            siblings={item.siblings}
            dada={item.dada}
            status={item.marital_status}
            nana={item.nana}
          />
          <AboutCard
            whatsappMobile={item.whatsapp}
            id={item.id}
            workplace={item.workplace}
            mobile={item.mobile_no}
            address={item.address}
          />*/}
        </View>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    height: Dimensions.get('screen').height / 8,
    borderBottomWidth: 1,
    borderColor: 'white',
    maxHeight: 108,
    marginBottom: 5,
  },
  boxes: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('screen').height / 12,
    maxHeight: 76,
    width: '48%',
    marginVertical: 10,
  },
  image: {
    height: height / 8,
    width: height / 8,
    borderRadius: height / 4,
    marginVertical: 5,
    alignSelf: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    elevation: 10,
    margin: 15,
    alignSelf: 'center',
  },
});

export default ProfileScreen;
