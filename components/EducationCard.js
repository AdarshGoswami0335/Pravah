import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const EducationCard = (props) => {
  return (
    <View style={styles.card}>
    <View style={{flexDirection:'row'}}>
    <Text><FontAwesome5 name='graduation-cap' size={25} color='#BFC9CA'/></Text> 
      <Text style={styles.heading}> शिक्षा एवं आय</Text>
      </View>
      <View style={styles.row}>
      <View style={styles.column}>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>शैक्षणिक योग्यता</Text>
          <Text style={styles.od}>{props.he}</Text>
        </View>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>व्ययसाय(स्वयं)</Text>
          <Text style={styles.od}>{props.occupation}</Text>
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
        margin:5
    },
    row:{
        flexDirection:'row'
    },
    column:{
        width:'50%'
    }
});
export default EducationCard;
