import { View, Text } from 'react-native'
import React, { useEffect, useState ,Alert} from 'react'
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import Colors from '../styles/Colors';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { BASE_URL,IMAGE_URL } from '../config';
import axios from 'axios';

export default function CourseList({type}) { 
    const [courseList,setCourseList]=useState([])
    const navigation=useNavigation();
    useEffect(()=>{
         
        getCourseList();
    },[])

    const getCourseList=async()=>{


        
        try {
            const Token = await AsyncStorage.getItem('userToken');
         
            if (Token !== null) {
              
        
              axios.get(`${BASE_URL}courses`,{headers: {'Authorization': 'Bearer '+Token}}).then(res =>{


                const course_all =res.data["data"];
                const course_select = [];

                for (let userObject of course_all) {
                 
                  
                    if(type =='Basic' && userObject.courselevel=="BL")
                    {
                      console.log(userObject.courseimage);
                      var id= userObject.id;
                      var coursename=userObject.coursename;
                      var courseintro=userObject.courseintro;
                      var courseimage=userObject.courseimage;
                      var price=userObject.price;
                      
                      course_select.push({
                        id: id,
                        coursename:coursename,
                        courseintro: courseintro,
                        courseimage:courseimage,
                        price:price,
                      })
                    }
                    if(type =='Intermidiate' && userObject.courselevel=="IL")
                    {
                      
                      var id= userObject.id;
                      var coursename=userObject.coursename;
                      var courseintro=userObject.courseintro;
                      var courseimage=userObject.courseimage;
                      var price=userObject.price;
                      
                      course_select.push({
                        id: id,
                        coursename:coursename,
                        courseintro: courseintro,
                        courseimage:courseimage,
                        price:price,
                      })
                    }
                    if(type =='Expert' && userObject.courselevel=="EL")
                    {
                      
                      var id= userObject.id;
                      var coursename=userObject.coursename;
                      var courseintro=userObject.courseintro;
                      var courseimage=userObject.courseimage;
                      var price=userObject.price;
                      
                      course_select.push({
                        id: id,
                        coursename:coursename,
                        courseintro: courseintro,
                        courseimage:courseimage,
                        price:price,
                      })
                    }
                    if(type =='Any' && userObject.courselevel=="AL")
                    {
                      
                      var id= userObject.id;
                      var coursename=userObject.coursename;
                      var courseintro=userObject.courseintro;
                      var courseimage=userObject.courseimage;
                      var price=userObject.price;
                      
                      course_select.push({
                        id: id,
                        coursename:coursename,
                        courseintro: courseintro,
                        courseimage:courseimage,
                        price:price,
                      })
                    }
                      
                }
                
                const result=course_select.map((item)=>
                ({


                  id:item.id,
                  coursename:item.coursename,
                  description:item.courseintro,
                  courseimage:item.courseimage,
                  price:item.price,


              }))
              console.log(BASE_URL);
            setCourseList(result);
                
                  
      
              }).catch(e => {
                console.log(e);
                // Alert.alert('Message not available2', 'Cannot move permission denied'[
                //   { text: 'Okay' }
                // ]);
              });
      
            }
          } catch (e) {
            console.log(e);
          }
       
        // setCourseList(result); 
        // console.log(result);
    }

    const onPressCourse=(course)=>{
        
        navigation.navigate('course-detail',{courseData:course,
          courseType:'text'})
    }
  return (
    <View style={{marginTop:10}}>
    <Text style={{fontSize:20,fontWeight:'bold' ,
    textTransform:'capitalize',
    marginBottom:5,color:'#41c3ff'}}>
        {type} Course</Text>

      <FlatList
      data={courseList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item})=>(
        <TouchableOpacity style={{backgroundColor:Colors.white,marginRight:10,
        borderRadius:10}} onPress={()=>onPressCourse(item)}>
            <Image source={{url:IMAGE_URL+''+item.courseimage}}  
            style={{width:180,height:100,  
            borderTopLeftRadius:10,borderTopRightRadius:10,
            resizeMode:'cover'}} />
            <View style={{padding:10}}>
            <Text style={{fontWeight:'bold',fontSize:15}}>{item.coursename}</Text>
            <Text style={{color:Colors.gray,fontWeight:'300'}}>{item.price}.00</Text>

            </View>
           
        </TouchableOpacity> 
      )}
      />
    </View>
  )
}