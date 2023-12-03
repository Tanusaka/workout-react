
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
    Button
} from 'react-native';
import Colors from '../styles/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import CourseContent from './CourseContent';


const CourseDetail = () => {
    const param = useRoute().params;
    const [course, setCourse] = useState([])
    const navigation = useNavigation();
    const [userProgress, setUserProgress] = useState([]);

    useEffect(()=>{
      
        console.log(param.courseData);
        // setCourse(param?.courseData);
        // param.courseData.id?getCourseProgress():null;
    },[])



    return (

        <View style={{ padding: 20, paddingTop: 60 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome name="arrow-left" size={24} color="#41c3ff" />
            </TouchableOpacity>
            <View>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold'
                }}>{course.name}</Text>
                <Text style={{ color: Colors.gray }}>By Tubeguruji</Text>
                <Image source={{ uri: course.image }}
                    style={{ height: 150, marginTop: 10, borderRadius: 10 }} />
                <Text style={{
                    marginTop: 10,
                    fontSize: 16, fontWeight: 'bold'
                }}>About Course</Text>
                <Text numberOfLines={4}
                    style={{ color: Colors.gray }}>{course.description}</Text>
            </View>
            {/* <CourseContent course={course} 
         userProgress={userProgress}
         courseType={param.courseType} /> */}
        </View>
    );



};

export default CourseDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
