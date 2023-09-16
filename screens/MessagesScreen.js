import React, { useEffect } from 'react';
import { useState } from "react";
import moment from 'moment';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL } from '../config';
import axios from 'axios';
import { DarkTheme } from '@react-navigation/native';





// const Messages = [
//   {
//     id: '1',
//     userName: 'Jenny Doe',
//     userImg: require('../assets/users/user-3.jpg'),
//     messageTime: '4 mins ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
//   {
//     id: '2',
//     userName: 'John Doe',
//     userImg: require('../assets/users/user-1.jpg'),
//     messageTime: '2 hours ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
//   {
//     id: '3',
//     userName: 'Ken William',
//     userImg: require('../assets/users/user-4.jpg'),
//     messageTime: '1 hours ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
//   {
//     id: '4',
//     userName: 'Selina Paul',
//     userImg: require('../assets/users/user-6.jpg'),
//     messageTime: '1 day ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
//   {
//     id: '5',
//     userName: 'Christy Alex',
//     userImg: require('../assets/users/user-7.jpg'),
//     messageTime: '2 days ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
// ];


const MessagesScreen = ({navigation}) => {


 const chat_id = (id_user) => {
    setTimeout(async () => {
      await AsyncStorage.setItem('_userId', id_user);
   
    }, 1000);
    };



  const [Messages, setMessages] = useState([{
    id: '',
    userName: '',
    userImg: '',
    messageTime: '',
    messageText:
      '',
  }]);



  useEffect(() => {
    setTimeout(async () => {
  
      try {
        const Token = await AsyncStorage.getItem('userToken');
     
        if (Token !== null) {
  
          // console.log(Token);
          // var user_id= 2;


          const data = {
            "user_id":3
          };
          
          

          axios.post(`${BASE_URL}chats`,data,{headers: {'Authorization': 'Bearer '+Token}}).then(res =>{
            const Messages_user = [];
            const Message_all =res.data["threads"];
            console.log(Message_all);

            if (Message_all !== null || Message_all !==[] ) {
  
              let time_ago ='';
            let massage_user ='[No Nessages Available]';

            for (let userObject of Message_all) {

              console.log(userObject["timestamp"]);
              if(userObject["timestamp"] != null || userObject["timestamp"] != '')
              {
              time_ago =moment(userObject["timestamp"]).local().startOf('seconds').fromNow();
                  if(time_ago =="Invalid date")
                  {
                    time_ago =" ";
                  }
              }
              else
              {
               time_ago =" ";
              }
              
              if(userObject["message_text"] !=null || userObject["message_text"] != '')
              {
                massage_user =userObject["message_text"]
                if(massage_user == null)
                {
                  massage_user ="[No Nessages Available]";
                }
              
              }
              else
              {
                massage_user ="[No Nessages Available]";
              }

              var id= userObject["linkedprofileid"];
              var userName=userObject["firstname"]+' '+userObject["lastname"];
              var userImg=require('../assets/users/user-1.jpg');
              var messageTime =  time_ago;
              var messageText=massage_user;


              Messages_user.push({
                id: id,
                userName:userName,
                userImg: userImg,
                messageTime:messageTime,
                messageText:messageText,
              })


              
          
          }
          setMessages(Messages_user);
            
              }
              else
              {
                Alert.alert('Message not available1', 'Cannot move permission denied' [
                    {text: 'Okay'}
                ]);  
              }
  
          }).catch(e => {
            console.log(e);
            Alert.alert('Message not available2', 'Cannot move permission denied'[
              { text: 'Okay' }
            ]);
          });
  
        }
      } catch (e) {
        console.log(e);
      }
  
    }, 100);
  }, []);






  return (
    <Container>
      <FlatList
        data={Messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card onPress={() => {chat_id(item.id); navigation.navigate('Chat', { userName: item.userName,id:item.id })}}>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={item.userImg} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.userName}</UserName>
                  <PostTime>{item.messageTime}</PostTime>
                </UserInfoText>
                <MessageText>{item.messageText}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
