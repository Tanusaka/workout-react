import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Ionicons} from 'react-native-vector-icons/FontAwesome';
import Colors from '../styles/Colors';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {BASE_URL, IMAGE_URL} from '../config';
import SectionLesstionContent from './SectionLessonContent';
export default function CourseContent({course, userProgress, courseType}) {
  const [section, setSectionList] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getSectionList();
  }, []);

  const getSectionList = async () => {
    try {
      const Token = await AsyncStorage.getItem('userToken');

      if (Token !== null) {
        const data = {
          id: course.route.params.courseData.id,
        };

        axios
          .post(`${BASE_URL}courses/get`, data, {
            headers: {Authorization: 'Bearer ' + Token},
          })
          .then((res) => {
            const course_all = res.data['data'];
            const section = course_all['sections'];
            // console.log(section);

            const result = section.map((item) => ({
              sectionname: item.sectionname,
              sectionid: item.id,
            }));
          
            setSectionList(result);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{marginTop: 30}}>
      <Text style={{fontWeight: 'bold', fontSize: 20, color: '#41c3ff'}}>
        Course Content
      </Text>
      <FlatList
        data={section}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: Colors.white,
              marginBottom: 5,
              padding: 13,
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <View style={{padding: 10}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  textDecorationLine: 'underline',
                  color: '#41c3ff'
                }}>
                {item.sectionname}
              </Text>

              <View style={{padding: 5}}>
              <SectionLesstionContent  course={course} sectionid={item.sectionid}/>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* <FlatList
    style={{marginTop:10}}
    data={section}
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
  );
}
