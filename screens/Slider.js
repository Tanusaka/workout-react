import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import Video from 'react-native-video';

export default function Slider() {



  // const [slider,setSlider]=useState([])
  // useEffect(()=>{
  //     getSlider();
  //   },[])

  // const getSlider=async()=>{
  //   const result=(await GlobalApi.getSlider()).data;

  //   const resp=result.data.map((item)=>({
  //       id:item.id,
  //       name:item.attributes.name,
  //       image:item.attributes.image.data.attributes.url
  //   }))

  //   setSlider(resp)
  // }
  return (


    <View style={styles.container}>
    <View style={{height:'100%',backgroundColor:'black'}}>
      <Video        
        source={require('../assets/background.mp4')}
        style={styles.video}
        ref={(ref) => {
          this._player = ref
      }} 
      />
    </View>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
},
});