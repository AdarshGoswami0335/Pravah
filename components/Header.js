import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from "../Colors/Colors";

const Header = props => {
      return <HeaderButton {...props} IconComponent={Ionicons} iconSize={28} color={Colors.secondary}/>
}

export default Header;

