import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const FamilyDetailsCard = (props) => {
  return (
    <View style={styles.card}>
    <View style={{flexDirection:'row'}}>
    <Text><MaterialIcons name='family-restroom' size={25} color='dodgerblue'/></Text> 
      <Text style={styles.heading}>  पारिवारिक</Text>
      </View>
      <View style={styles.row}>
      <View style={styles.column}>
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
     
       </View>
      <View style={styles.column}>
    
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
export default FamilyDetailsCard;
