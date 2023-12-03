import React from 'react';
import {
  UserImg_chat, MessageText_chat, TextSection, UserImgWrapper, UserInfo
} from '../styles/MessageStyles';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreens  from './HomeScreens';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import MessagesScreen from './MessagesScreen';
import ChatScreen from '../screens/ChatScreen';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const MassageStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


function LogoTitle() {
  return (
    <UserInfo>
      <UserImgWrapper>
        <UserImg source={item.userImg} />
      </UserImgWrapper>
      <TextSection>
        <MessageText>{item.messageText}</MessageText>
      </TextSection>
    </UserInfo>

  );
}

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#41c3ff',
        tabBarIcon: ({ color }) => (
          <Icon name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={DetailsStackScreen}
      options={{
        tabBarLabel: 'Updates',
        tabBarColor: '#41c3ff',
        tabBarIcon: ({ color }) => (
          <Icon name="notifications" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Messages"
      component={MassageStackScreen}
      options={{
        tabBarLabel: 'Chats',
        tabBarColor: '#41c3ff',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="chat" color={color} size={26} />
        ),
      }}
    />


    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: 'Explore',
        tabBarColor: '#41c3ff',
        tabBarIcon: ({ color }) => (
          <Icon name="aperture" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#41c3ff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <HomeStack.Screen name="Home" component={HomeScreens} options={{
      title: 'Dashboard',
      headerLeft: () => (
        <Icon.Button name="menu" size={25} backgroundColor="#41c3ff" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }} />
  </HomeStack.Navigator>
);

const DetailsStackScreen = ({ navigation }) => (
  <DetailsStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#41c3ff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <DetailsStack.Screen name="Notification" component={DetailsScreen} options={{
      headerLeft: () => (
        <Icon.Button name="menu" size={25} backgroundColor="#41c3ff" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }} />
  </DetailsStack.Navigator>
);

const MassageStackScreen = ({ navigation }) => (
  <MassageStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#41c3ff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    },


  }}>
    <MassageStack.Screen name="Messages" component={MessagesScreen} options={{
      headerLeft: () => (
        <Icon.Button name="menu" size={25} backgroundColor="#41c3ff" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }} />
    <MassageStack.Screen
      name="Chat"
      component={ChatScreen}
      
      options={({ route }) => ({
        params:route.params.id,
        headerTitle: () => (
          <UserInfo>
            <UserImgWrapper>
              <UserImg_chat source={require('../assets/users/user-1.jpg')} />
            </UserImgWrapper>
            <TextSection>
              <MessageText_chat>{route.params.userName}</MessageText_chat>
            </TextSection>
          </UserInfo>
        ),
        headerBackTitleVisible: false,

      })}
    />
  </MassageStack.Navigator>
);









