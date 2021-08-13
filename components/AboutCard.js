import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const AboutCard = (props) => {
  return (
    <View style={styles.card}>
    <View style={{flexDirection:'row'}}>
    <Text><FontAwesome5 name='clipboard-list' size={25} color='orangered'/></Text> 
      <Text style={styles.heading}>  संपर्क</Text>
      </View>
      <View style={styles.row}>
      <View style={styles.column}>
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
      </View>
      <View style={styles.column}>
        <View style={styles.smallContainer}>
          <Text style={styles.attr}>कार्य स्थल</Text>
          <Text style={styles.od}>{props.workplace}</Text>
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
        margin:5
    },
    row:{
        flexDirection:'row'
    },
    column:{
        width:'50%'
    }
});
export default AboutCard;
