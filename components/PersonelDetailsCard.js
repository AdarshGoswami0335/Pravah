import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const ThinCard = (props) => {
  return (
    <View style={styles.card}>
    <View style={{flexDirection:'row'}}>
  
     
      </View>
      <View style={styles.row}>
      <View style={styles.column}>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>नाम :</Text>
          <Text style={styles.od}>{props.name}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>जन्म समय:</Text>
          <Text style={styles.od}>{props.birthTime}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>लिंग :</Text>
          <Text style={styles.od}>{props.gender}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>कद :</Text>
          <Text style={styles.od}>{props.height} </Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>रंग</Text>
          <Text style={styles.od}>{props.color}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>जन्म तारीख :</Text>
          <Text style={styles.od}>{props.dob}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>जन्म स्थान :</Text>
          <Text style={styles.od}>{props.birthplace}</Text>
        </View>
      
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>मांगलिक :</Text>
          <Text style={styles.od}>{props.manglik}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>प्रोफाइल ID</Text>
          <Text style={styles.od}>{props.id}</Text>
        </View>
       
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>व्हाट्सएप्प मोबाइल नंबर</Text>
          <Text style={styles.od}>{props.whatsappMobile}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>पता :</Text>
          <Text style={styles.od}>{props.address}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>कार्य स्थल</Text>
          <Text style={styles.od}>{props.workplace}</Text>
        </View>
      
      </View>
      <View style={styles.column}>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>मासिक आय</Text>
          <Text style={styles.od}>₹ {props.income}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>पारिवारिक व्यवसाय </Text>
          <Text style={styles.od}>{props.familyBusiness}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>शैक्षणिक योग्यता</Text>
          <Text style={styles.od}>{props.he}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>व्ययसाय(स्वयं)</Text>
          <Text style={styles.od}>{props.occupation}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>पिता जी का नाम</Text>
          <Text style={styles.od}>{props.father}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>माता जी का नाम</Text>
          <Text style={styles.od}>{props.mother}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>भाई-बहन</Text>
          <Text style={styles.od}>{props.siblings}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>वैवाहिक स्तिथि</Text>
          <Text style={styles.od}>{props.status}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>दादाजी</Text>
          <Text style={styles.od}>{props.dada}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>नानाजी</Text>
          <Text style={styles.od}>{props.nana}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>मोबाइल नंबर :</Text>
          <Text style={styles.od}>{props.mobile}</Text>
        </View>
      </View>
    
     

      </View>
      
    </View>
  );
};
const styles = StyleSheet.create({
  card:{
    width:'100%',
    backgroundColor:'white',
    marginVertical:5,
    padding:10,
    borderRadius:5,
    borderColor:"grey",
    borderWidth:1
},
heading:{
    color:'black',
    fontSize:20,
    marginBottom:10,
    fontFamily:"NotoSerif-Bold",
},
attr:{
    color:'grey',
    fontSize:13,
    fontFamily:"NotoSerif-Bold",
    marginBottom:4
},
od:{
    color:'black',
    fontSize:15,
    fontFamily:"NotoSerif-Bold",
},
    smallContainer:{
        margin:5,
        marginVertical:5
    },
    row:{
        flexDirection:'row'
    },
    column:{
        width:'50%'
    }
});
export default ThinCard;
