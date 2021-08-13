import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';

const KundliCard = (props) => {
  return (
    <View style={styles.card}>
    <View style={{flexDirection:'row'}}>
    <Text><AntDesign name='antdesign' size={25} color='gold'/></Text> 
      <Text style={styles.heading}>  कुंडली </Text>
      </View>
      <View style={styles.row}>
      <View style={styles.column}>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>जन्म स्थान :</Text>
          <Text style={styles.od}>{props.birthplace}</Text>
        </View>
      
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>मांगलिक :</Text>
          <Text style={styles.od}>{props.manglik}</Text>
        </View>
      </View>
      <View style={styles.column}>
      <View style={styles.smallContainer}>
          <Text style={styles.attr}>गोत्र(परिवार) :</Text>
          <Text style={styles.od}>{props.gotra}</Text>
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
export default KundliCard;
