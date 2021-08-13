import React from 'react';
import { View,Text,TextInput,StyleSheet, Dimensions } from 'react-native';
import Colors from '../Colors/Colors';
const height=Dimensions.get('screen').height;
const FormCard=(props)=>{
   console.log(height/18);
   return(
    <View style={styles.smallView}>
    <Text style={styles.headTxt}>{props.head}</Text>
    <TextInput style={styles.txtInpt}  placeholderTextColor='grey' placeholder={props.placeholder} value={props.value} onChangeText={props.onChangeText} keyboardType={props.type}/>
    </View>
   )
}
const styles=StyleSheet.create({
    smallView:{
      marginVertical:5
    },
    txtInpt:{
        borderWidth:2,
        borderColor:Colors.primary,
        height:height/15,
        maxHeight:48,
        borderRadius:0,
        padding:10,
        color:'#262626',
        backgroundColor:'white',
         fontFamily:"NotoSerif-Bold",
    },
    headTxt:{
        color:'#262626',
        fontSize:16,
        fontFamily:"NotoSerif-Bold",
        marginBottom:5
    }
})
export default FormCard;