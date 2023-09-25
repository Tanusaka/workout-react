import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#41c3ff' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/logo.gif')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: '#f0f4f5'
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Coaching app to better engage your clients.</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
                <LinearGradient
                    colors={['#63a4f9', '#41c3ff']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Get Started</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.35;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#41c3ff'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#41c3ff',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 200,
      paddingVertical: 100,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});

