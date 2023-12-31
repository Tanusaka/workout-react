import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, Alert } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { BASE_URL } from '../config';
import { createStackNavigator } from '@react-navigation/stack';


var new_mssg_id = 0;
var loopcount = 1;

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [messagesid, setmessagesid] = useState(0);



  
  useEffect(() => {

    load_chat();

  }, []);




  const load_chat = () => {
 

    try {
      setTimeout(async () => {

        const Token = await AsyncStorage.getItem('userToken');
        const userid = await AsyncStorage.getItem('_userId');


        if (Token !== null) {


          const data = {
            "user_id": 3,
            "other_user_id": 4,
            "limit": 0,
            "offset": 0
          };

          
          axios.post(`${BASE_URL}/chats/get`, data, { headers: { 'Authorization': 'Bearer ' + Token } }).then(res => {
            const user_chat_push = [];

            const Chat_all = res.data["messages"];
            for (let userObject of Chat_all) {
              console.log(userObject);

              if (userObject["receiver_id"] != userid) {

                var senser_id = 1
                var reciver_id = 2

              }
              if (userObject["receiver_id"] == userid) {
                var senser_id = 2
                var reciver_id = 1

              }
                user_chat_push.push({
                  _id: senser_id,
                  text: userObject["message_text"],
                  createdAt: new Date(),
                  user: {
                    _id: reciver_id,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                  }
                })

              if (new_mssg_id < parseInt(userObject["message_id"])) 
              {
                new_mssg_id = userObject["message_id"];
              }

              setMessages(user_chat_push);

            }
            setMessages(messages => []);
            console.log(messages);
            // setMessages(user_chat_push);

          }).catch(e => {
            console.log(e);
            Alert.alert('Message not available2', 'Cannot move permission denied'[
              { text: 'Okay' }
            ]);
          });
        }
      })
    } catch (e) {
      console.log(e);
    }


  }




  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );

  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };
  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

