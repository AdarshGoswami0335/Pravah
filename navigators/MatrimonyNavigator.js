import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ContactScreen from '../screens/ContactScreen';
import Colors from '../Colors/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EmployementScreen from '../screens/EmployementScreen';
import OthersScreen from '../screens/OthersScreen';
import EducationScreen from '../screens/EducationScreen';
import OverViewScreen from '../screens/OverViewScreen';
import AdminPanelScreen from '../screens/AdminPanelScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BioDataDetailsScreen from '../screens/BioDataDetailsScreen';
import AuthScreen from '../screens/AuthScreen';
import StartScreen from '../screens/StartScreen';
import FormScreen from '../screens/FormScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import {Share, TouchableOpacity} from 'react-native';
import AdminAddData from '../screens/AdminAddData';
import AdminDetailsScreen from '../screens/AdminDetailsScreen';
import AdminOverviewScreen from '../screens/AdminOverviewScreen';
import SammelanScreen from '../screens/SammelanScreen';
import EditScreen from '../screens/EditScreen';
import AdvertiseScreen from '../screens/AdvertiseScreen';
import auth from '@react-native-firebase/auth';
import * as AuthAction from '../store/actions/AuthAction';
import TutorialScreen from '../screens/TutorialScreen';
import { useDispatch } from 'react-redux';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          title: 'PRAVAH',
          headerTintColor: '#262626',
          headerTitleStyle: {
            fontFamily: 'NotoSerif-Bold',
            letterSpacing: 2,
          },
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{marginHorizontal: 15}}>
              <Icon name="md-menu" size={30} color="#262626" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Favourite')}
              style={{marginHorizontal: 15}}>
              <Icon name="heart" size={30} color="#262626" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Admin"
        component={AdminPanelScreen}
        options={({navigation}) => ({
          title: 'Admin Panel',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
        })}
      />
      <Stack.Screen
        name="AdminOverview"
        component={AdminOverviewScreen}
        options={({navigation}) => ({
          title: 'Admin OverView',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
        })}
      />
      <Stack.Screen
        name="AdminDetails"
        component={AdminDetailsScreen}
        options={({navigation}) => ({
          title: 'ADMIN PANEL CHECK',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
        })}
      />
      <Stack.Screen
        name="Admin Data"
        component={AdminAddData}
        options={({navigation}) => ({
          title: 'Admin Panel',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
        })}
      />
      <Stack.Screen
        name="Edit"
        component={EditScreen}
        options={({navigation}) => ({
          title: 'EDIT DATA',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
        })}
      />
        <Stack.Screen
        name="Advertise"
        component={AdvertiseScreen}
        options={({navigation}) => ({
          title: 'Advertise Screen',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
        })}
      />
      <Stack.Screen
        name="Others"
        component={OthersScreen}
        options={({navigation}) => ({
          title: 'OTHERS',
          headerTintColor: '#262626',
          headerTitleStyle: {
            fontFamily: 'NotoSerif-Bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
        })}
      />
      <Stack.Screen
        name="Education"
        component={EducationScreen}
        options={({navigation}) => ({
          title: 'EDUCATION',
          headerTintColor: '#262626',
          headerTitleStyle: {
            fontFamily: 'NotoSerif-Bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
        })}
      />
      <Stack.Screen
        name="Employement"
        component={EmployementScreen}
        options={({navigation}) => ({
          title: 'EMPLOYEMENT',
          headerTintColor: '#262626',
          headerTitleStyle: {
            fontFamily: 'NotoSerif-Bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
        })}
      />
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={({navigation}) => ({
          title: 'LOGIN/SIGNUP',
          headerTintColor: 'white',
          fontFamily: 'OpenSans-Bold',
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={({navigation}) => ({
          title: 'PRAVAH',
          headerTintColor: '#262626',
          fontFamily: 'OpenSans-Bold',
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{marginHorizontal: 15}}>
              <Icon name="md-menu" size={30} color="#262626" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({navigation}) => ({
          title: 'YOUR PROFILE',
          headerTintColor: '#262626',
          headerTitleStyle: {
            fontFamily: 'NotoSerif-Bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{marginHorizontal: 15}}>
              <Icon name="md-menu" size={30} color="#262626" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Favourite')}
              style={{marginHorizontal: 15}}>
              <Icon name="heart" size={30} color="#262626" />
            </TouchableOpacity>
          ),
        })}
      />
 
    </Stack.Navigator>
  );
}

function BioDataStack() {
  return (
    <Stack.Navigator initialRouteName="BioData">
       
      <Stack.Screen
        name="BioData"
        component={OverViewScreen}
        options={({navigation}) => ({
          title: 'BIODATA',
          headerTintColor: '#262626',
          headerTitleStyle: {
            fontFamily: 'NotoSerif-Bold',
            letterSpacing: 0.5,
          },
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{marginHorizontal: 15}}>
              <Icon name="md-menu" size={30} color="#262626" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Favourite')}
              style={{marginHorizontal: 15}}>
              <Icon name="md-heart" size={30} color="#262626" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Favourite')}
              style={{marginHorizontal: 15}}>
              <Icon name="heart" size={30} color="#262626" />
            </TouchableOpacity>
          ),
        })}
      />
          <Stack.Screen
        name="Details"
        component={BioDataDetailsScreen}
        options={({navigation}) => ({
          title: 'Details',
          headerTintColor: '#262626',
          headerTitleStyle: {
            fontFamily: 'NotoSerif-Bold',
            letterSpacing: 0.5,
          },
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },

          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Favourite')}
              style={{marginHorizontal: 15}}>
              <Icon name="heart" size={30} color="#262626" />
            </TouchableOpacity>
          ),
        })}
      />

    </Stack.Navigator>
  );
}

function ContactStack() {
  return (
    <Stack.Navigator initialRouteName="Contact">
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={({navigation}) => ({
          title: 'CONTACT US',
          headerTintColor: '#262626',
          headerTitleStyle: {
            fontFamily: 'NotoSerif-Bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{marginHorizontal: 15}}>
              <Icon name="md-menu" size={30} color="#262626" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Favourite')}
              style={{marginHorizontal: 15}}>
              <Icon name="heart" size={30} color="#262626" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function AddBioDataStack() {
  return (
    <Stack.Navigator initialRouteName="Add">
      <Stack.Screen
        name="Add"
        component={FormScreen}
        options={({navigation}) => ({
          title: 'ADD YOUR PERSONAL DATA',
          headerTintColor: '#262626',
          headerTitleStyle: {
            fontFamily: 'NotoSerif-Bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{marginHorizontal: 15}}>
              <Icon name="md-menu" size={30} color="#262626" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function FavouriteStack() {
  return (
    <Stack.Navigator initialRouteName="Favourite">
      <Stack.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={({navigation}) => ({
          title: 'YOUR FAVOURITES',
          headerTintColor: '#262626',
          headerTitleStyle: {
            fontFamily: 'NotoSerif-Bold',
            letterSpacing: 0.5,
          },
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{marginHorizontal: 15}}>
              <Icon name="md-menu" size={30} color="#262626" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function TutorialStack() {
  return (
    <Stack.Navigator initialRouteName="Tutorial">
      <Stack.Screen
        name="Tutorial"
        component={TutorialScreen}
        options={({navigation}) => ({
          title: 'How to Use!',
          headerTintColor: '#262626',
          headerTitleStyle: {
            fontFamily: 'NotoSerif-Bold',
            letterSpacing: 0.5,
          },
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{marginHorizontal: 15}}>
              <Icon name="md-menu" size={30} color="#262626" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function SammelanStack() {
  return (
    <Stack.Navigator initialRouteName="Sammelan">
      <Stack.Screen
        name="Sammelan"
        component={SammelanScreen}
        options={({navigation}) => ({
          title: 'सम्मेलन',
          headerTintColor: '#262626',
          headerTitleStyle: {
            fontFamily: 'NotoSerif-Bold',
          },
          headerStyle: {
            backgroundColor: Colors.primary, // Specify the height of your custom header
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{marginHorizontal: 15}}>
              <Icon name="md-menu" size={30} color="#262626" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Favourite')}
              style={{marginHorizontal: 15}}>
              <Icon name="heart" size={30} color="#262626" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function MatrimonyNavigator() {
  const dispatch = useDispatch();
  return (
    <NavigationContainer>
      <Drawer.Navigator
       drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={() => {
               auth()
               .signOut()
               .then(() =>{
                dispatch(AuthAction.logout());
                props.navigation.navigate("Auth")
               });
             }}  labelStyle={{
              fontFamily:"OpenSans-Bold",
              color:"black",
              fontSize:17,
              alignSelf:"center",
              backgroundColor:Colors.primary,
              padding:10,
              
            }} />
            <DrawerItem label="Share App" onPress={async() => {
               try {
                const result = await Share.share({
                  message:
                    'ताम्रकार समाज के लिए बनाये गए प्रवाह ऐप को play store से डाउनलोड करें। ' + 
                    " https://play.google.com/store/apps/details?id=com.pravah.matrimony",
                });
                if (result.action === Share.sharedAction) {
                  if (result.activityType) {
                    // shared with activity type of result.activityType
                  } else {
                    // shared
                  }
                } else if (result.action === Share.dismissedAction) {
                  // dismissed
                }
              } catch (error) {
                alert(error.message);
              }
            }}  labelStyle={{
              fontFamily:"OpenSans-Bold",
              color:"white",
              fontSize:25,
              alignSelf:"center",
              backgroundColor:Colors.primary,
              padding:15,
              borderRadius:50
            }} />
           
          </DrawerContentScrollView>
        )
      }}
        drawerContentOptions={{
          activeTintColor: Colors.primary,
          inactiveTintColor: 'black',
          labelStyle: {
            fontFamily: 'NotoSerif-Bold',
            fontSize: 17,
          },
          
        }} >
        <Drawer.Screen
          name="Home"
          component={HomeStack}
          options={({navigation}) => ({
            drawerIcon: drawerConfig => (
              <Icon name="home" size={23} color="black" />
            ),
          })}
        />
        <Drawer.Screen
          name="BioData"
          component={BioDataStack}
          options={({navigation}) => ({
            drawerIcon: drawerConfig => (
              <Icon name="md-person-circle-outline" size={23} color="black" />
            ),
          })}
        />
        <Drawer.Screen
          name="Favourite"
          component={FavouriteStack}
          options={({navigation}) => ({
            drawerIcon: drawerConfig => (
              <Icon name="heart-outline" size={23} color="black" />
            ),
          })}
        />
        <Drawer.Screen
          name="Add"
          component={AddBioDataStack}
          options={({navigation}) => ({
            drawerIcon: drawerConfig => (
              <Icon name="md-add" size={23} color="black" />
            ),
            drawerLabel: 'Add BioData',
          })}
        />
          <Drawer.Screen
          name="How to Use!"
          component={TutorialStack}
          options={({navigation}) => ({
            drawerIcon: drawerConfig => (
              <AntDesign name="infocirlceo" size={23} color="black" />
            ),
          })}
        />
        <Drawer.Screen
          name="Sammelan"
          component={SammelanStack}
          options={({navigation}) => ({
            drawerIcon: drawerConfig => (
              <AntDesign name="addusergroup" size={23} color="black" />
            ),
          })}
        />
        <Drawer.Screen
          name="Contact Us"
          component={ContactStack}
          options={({navigation}) => ({
            drawerIcon: drawerConfig => (
              <Icon name="call" size={23} color="black" />
            ),
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MatrimonyNavigator;
