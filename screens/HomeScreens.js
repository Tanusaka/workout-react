import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import CourseList from './CourseList';
import Slider from './Slider';
import { ScrollView } from 'react-native';
import Video from 'react-native-video';

const HomeScreens = () => {

  const { colors } = useTheme();

  const theme = useTheme();
  
    return (
      <View style={styles.container}>
        <View style={styles.videoContainer}>
        <Video
       
        source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
        ref={(ref) => {
            this._player = ref
        }} 
      />
      </View>
        {/* <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <Text style={{color: colors.text}}>Dashboard Screen</Text> */}
        <ScrollView style={{padding:20}}>
        {/* <WelcomeHeader/> */}
        {/* <SearchBar/> */}
        <Slider/>
        {/* <VideoCourseList/> */}
        <CourseList type={'Basic'} />
        <CourseList type={'Intermidiate'} />
        <CourseList type={'Expert'} />
        <CourseList type={'Any'} />
        <View style={{height:100}}> 
          
        </View>
    </ScrollView> 
      </View>
    );
};

export default HomeScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  videoContainer: {
    flex: 1,
    backgroundColor: 'black',
},
video: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
},


});
