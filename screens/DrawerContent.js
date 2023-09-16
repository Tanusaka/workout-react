// import React from 'react';
import React, { useEffect } from 'react';
import {useState} from "react";
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import{ AuthContext } from '../components/context';

export function DrawerContent(props) {

    let arry_permissions =null;
    const [courses, setcourses] = useState('0');

    useEffect(() => {
        setTimeout(async() => {

          try {
            const get_permissions = await AsyncStorage.getItem('permissions');
            if (get_permissions !== null) {
                
                
                arry_permissions =JSON.parse(get_permissions);
                setcourses(arry_permissions['courses'].read);


              }
          } catch(e) {
            console.log(e);
          }

        }, 10000);
      }, []);
      console.log(courses);


    const paperTheme = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext);

    return(
        <View style={{flex:1}} backgroundColor='#41c3ff' color ='#fff'>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent} >
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={require('../assets/propic.png')}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title  style={styles.title}>Dinuka Wijekoon</Title>
                                <Caption  style={styles.caption}>@j_doe</Caption>
                            </View>
                        </View>

                        {/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                        </View> */}
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                       

                    {courses ? (<DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="book" 
                                color='#fff'
                                size={size}
                                />
                            )}
                            label="Programs"
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {props.navigation.navigate('Home')}}
                        />) : null}

                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="book" 
                                color='#fff'
                                size={size}
                                />
                            )}
                            label="Programs"
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {props.navigation.navigate('Home')}}
                        /> */}
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="baby" 
                                color='#fff'
                                size={size}
                                />
                            )}
                            label="Workouts"
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color='#fff'
                                size={size}
                                />
                            )}
                            label="Habits"
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bike" 
                                color='#fff'
                                size={size}
                                />
                            )}
                            label="Exercises"
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {props.navigation.navigate('SettingsScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="food" 
                                color='#fff'
                                size={size}
                                />
                            )}
                            label="Meals"
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="food-fork-drink" 
                                color='#fff'
                                size={size}
                                />
                            )}
                            label="Foods"
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
                        

                        {courses ? (<DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="content-paste" 
                                color='#fff'
                                size={size}
                                />
                            )}
                            label="Courses"
                            labelStyle={{color: '#ffffff'}}
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />) : null}
                    </Drawer.Section>
                    
                    <Drawer.Section  >
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text style={styles.steelblue}>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color='#fff'
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    labelStyle={{color: '#ffffff'}}
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      color :'#fff',
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
        color :'#fff',
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
      color:'#fff'
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#41c3ff',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    steelblue: {
        color: "#fff",
      },
  });
