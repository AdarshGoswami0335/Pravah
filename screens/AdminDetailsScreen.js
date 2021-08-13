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

const AdminDetailsScreen = props => {
  const id = props.route.params.id;
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
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
  const approvHandler = async () => {
    const res = await fetch(
      'https://arcane-island-23682.herokuapp.com/approve',
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
    alert('Data Approved Successfully');
  };

  const rejectHandler = async () => {
    const res = await fetch(
      'https://arcane-island-23682.herokuapp.com/reject',
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
    alert('Data Rejected Successfully');
  };

  const premiumHandler = async () => {
    const res = await fetch(
      'https://arcane-island-23682.herokuapp.com/premium',
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
    alert('Data Added To Premium Successfully');
  };

  const editHandler = () => {
    props.navigation.navigate('Edit', {
      id: data.id,
    });
  };

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
{/*
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
      <View style={styles.action1}>
        <View style={styles.mainBtn}>
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.premiumBtn}
            onPress={premiumHandler}>
            <Text style={styles.textBtn}>Premium</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainBtn}>
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.editBtn}
            onPress={editHandler}>
            <Text style={styles.textBtn}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.action}>
        <View style={styles.mainBtn}>
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.btn}
            onPress={approvHandler}>
            <Text style={styles.textBtn}>Aproov</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainBtn}>
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.btn1}
            onPress={rejectHandler}>
            <Text style={styles.textBtn}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}></Modal>
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
    backgroundColor: 'green',
    height: '100%',
  },
  premiumBtn: {
    backgroundColor: 'purple',
    height: '100%',
  },
  editBtn: {
    backgroundColor: '#262626',
    height: '100%',
  },
  btn1: {
    backgroundColor: '#d63031',
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
    width: '45%',
    paddingHorizontal: 5,
  },
  dot: {
    color: Colors.primary,
  },
  action: {
    width: width,
    flexDirection: 'row',
    height: height / 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  action1: {
    width: width,
    flexDirection: 'row',
    height: height / 14,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
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

export default AdminDetailsScreen;
