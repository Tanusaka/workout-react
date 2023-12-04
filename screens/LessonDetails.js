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
import CourseContent from './SectionContent';
import { BASE_URL,IMAGE_URL } from '../config';


const CourseDetail = (Lesson) => {
    const param = useRoute().params;
    const [course, setCourse] = useState([])
    const navigation = useNavigation();
    const [userProgress, setUserProgress] = useState([]);



    useEffect(()=>{

      
    },[])


    return (

        <View style={{ padding: 20, paddingTop: 60 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome name="arrow-left" size={24} color="#41c3ff" />
            </TouchableOpacity>
            <View>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginTop:20,
                    color:'#41c3ff',
                }}>{Lesson.route.params.Lesson.lessonname}</Text>
                {/* <Text style={{ color: Colors.gray }}>By Tubeguruji</Text> */}
                <Image source={{ uri: IMAGE_URL+''+Lesson.route.params.Lesson.lessonmedia }}
                    style={{ height: 150, marginTop: 10, borderRadius: 10 }} />
                <Text style={{
                    marginTop: 15,
                    fontSize: 16, fontWeight: 'bold',color:'#41c3ff'
                }}>Description</Text>
                <Text numberOfLines={4}
                    style={{ color: Colors.gray }}>{Lesson.route.params.Lesson.lessondescription}</Text>
            </View>
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
