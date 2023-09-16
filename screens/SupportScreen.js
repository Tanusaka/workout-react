import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreens from '../screens/ChatScreen';

const ChatStack = createStackNavigator();

const SupportScreen = ({ronavigation}) => {


  const id = ChatStack.params;
  console.log(ChatStack.params);
  return (

  <ChatStack.Navigator>
    <ChatStack.Screen
      name="123"
      component={ChatScreens}
      options={({route}) => ({
        title: route.params?.id,
        headerBackTitleVisible: false,
      })}
    />
  </ChatStack.Navigator>

);
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
