import { View, Text } from 'react-native'
import React, { useEffect,useState } from 'react'
import { FlatList } from 'react-native'
import { Ionicons } from 'react-native-vector-icons/FontAwesome';
import Colors from '../styles/Colors';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { BASE_URL,IMAGE_URL } from '../config';
import { white } from 'react-native-paper/lib/typescript/src/styles/colors';
import Feather from 'react-native-vector-icons/Feather';
import { Dimensions } from "react-native";
var width = Dimensions.get('window').width; //full width


export default function CourseContent({course,sectionid}) {
  const [lesson, setLessonList] = useState([]);

    const navigation=useNavigation();

    useEffect(()=>{
      getSectionList();
    },[])

      const getSectionList=async()=>{
  
        try {
          const Token = await AsyncStorage.getItem('userToken');
       
          if (Token !== null) {
    
  
            const data = {
              "id":sectionid
            };
            console.log(sectionid);
            
  
            axios.post(`${BASE_URL}courses/sections/lessons`,data,{headers: {'Authorization': 'Bearer '+Token}}).then(res =>{
              
              const lessons_All =res.data["data"];
           
              console.log(lessons_All);
              
                  const result=lessons_All.map((item)=>
                  ({
                    lessonid:item.id,
                    lessonname:item.lessonname,
                    lessonmedia:item.lessonmedia,
                    lessondescription:item.lessondescription
                }))
                setLessonList(result);
                
              
      
            }).catch(e => {
              console.log(e);
            });
    
          }
        } catch (e) {
          console.log(e);
        }
      }
   
  
    

   
    const checkUserProgress=(contentId)=>{
      // return userProgress.find(item=>item.courseContentId==contentId)
    }
    
    const onChapterPress=(Lesson)=>{
  
      navigation.navigate('LessonDetails',
      {  Lesson:Lesson,
      })
  
    }
  
  return (
    <View style={{marginTop:10}}>

<FlatList
        data={lesson}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity onPress={()=>onChapterPress(item)} style={{display:'flex',
        flexDirection:'row',backgroundColor:'#41c3ff',marginBottom:5
        ,padding:10,alignItems:'center',borderRadius:5, width:(width* .75)}}>
           <Feather name="check-square" color="#fff" size={20} style={{marginRight:20}}/>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color:'#fff'
                }}>
                {item.lessonname}
              </Text>
              <Feather name="chevrons-right" size={20}
            style={{position:'absolute',right:10,}}
            color="#fff" />
          </TouchableOpacity>
        )}
      />



    {/* <FlatList
    style={{marginTop:10}}
    data={lesson}
    renderItem={({item,index})=>(
        <TouchableOpacity onPress={()=>onChapterPress(item)} style={{display:'flex',
        flexDirection:'row',backgroundColor:Colors.white,marginBottom:5
        ,padding:13,alignItems:'center',borderRadius:5}}>
          
        { checkUserProgress(item.id)?  <Ionicons name="checkmark-circle" size={24} color={Colors.green }
         style={{marginRight:20}} />:
         <Text style={{fontWeight:'bold',fontSize:20,
         color:Colors.gray,marginRight:20}}>{index+1}</Text>}
            <Text style={{fontSize:15,fontWeight:'bold'}}>
                {item.sectionname}</Text>
            <Ionicons name="play-circle" size={24}
            style={{position:'absolute',right:10,}}
             color={Colors.primary} />
        </TouchableOpacity>
    )}
    /> */}
    </View>
  )
}