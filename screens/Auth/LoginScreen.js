import React, {useContext, useState} from 'react';
import { StyleSheet,TouchableOpacity,Platform, LogBox, ImageBackground, Dimensions, Image} from 'react-native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import SocialButton from '../../components/SocialButton';
import { AuthContext } from '../../navigation/AuthProvider';
import { ApplicationProvider, Layout, Text, Divider, Spinner } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import Theme from '../../constants/Theme';


LogBox.ignoreAllLogs()


const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {login, googleLogin, facebookLogin} = useContext(AuthContext);
  const[isValid, setIsValid] = React.useState({
    isValidEmail: true,
    isEmailFieldEmpty: true,
    isPasswordFieldEmpty: true,
  });
  const[isLoading, setIsLoading] = useState(false);

  const handleValidEmail = (val) => {

    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    setEmail(val);
    if(val.trim().length < 1)
      setIsValid({
        ...isValid,
        isValidEmail: true,
        isEmailFieldEmpty: true,
      });
    else 
      setIsValid({
        ...isValid,
        isValidEmail: re.test(val),
        isEmailFieldEmpty: false,
      });


  }

  const handleEmailChange = (val) => {

    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    setEmail(val);
    if(val.trim().length < 1)
      setIsValid({
        ...isValid,
        isValidEmail: true,
        isEmailFieldEmpty: true,
      });
    else 
      setIsValid({
        ...isValid,
        isValidEmail: re.test(val),
        isEmailFieldEmpty: false,
      });


  }

  const handlePasswordChange = (val) => {
    if (val.length < 1) {
      setIsValid({
        ...isValid,
        isPasswordFieldEmpty: true,
      })
    }
    else {
      setIsValid({
        ...isValid,
        isPasswordFieldEmpty: false,
      })
    }
    setPassword(val);
  }

  const handleValidPassword = (val) => {
    if (val.length < 1) {
      setIsValid({
        ...isValid,
        isPasswordFieldEmpty: true,
      })
    }
    else {
      setIsValid({
        ...isValid,
        isPasswordFieldEmpty: false,
      })
    }
    setPassword(val);
  }

  const handleLogin = async() => {
    await setIsLoading(true);
    await login(email, password);
    await setIsLoading(false)
  }

    return (
          <Layout style={styles.container}>
          <ImageBackground source={require('../../assets/images/bg.png')} style={styles.bgImage}>
          {/* <Text style={styles.titleText}>SeeFood</Text> */}
          <Image source={require('../../assets/images/shazam.png')} 
          style={styles.logo} 
          resizeMode="center"/>
          <Divider/>
          <FormInput
            labelValue={email}
            onChangeText={(userEmail) => handleEmailChange(userEmail)}
            placeholderText="Email"
            iconType="user"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            isFieldEmpty={isValid.isEmailFieldEmpty}
            isFieldValid={isValid.isValidEmail}
            onEndEditing={e => handleValidEmail(e.nativeEvent.text)}
          />
          {isValid.isValidEmail ? null : 
          <Text status="danger">invalid email</Text>}
          
    
          <FormInput
            labelValue={password}
            onChangeText={(userPassword) => handlePasswordChange(userPassword)}
            placeholderText="Password"
            iconType="lock"
            secureTextEntry={true}
            isFieldEmpty={isValid.isPasswordFieldEmpty}
            isFieldValid={isValid.isValidEmail}
            onEndEditing={e => handleValidPassword(e.nativeEvent.text)}

          />

    
          <FormButton
            buttonTitle="Sign In"
            isDisabled={isValid.isEmailFieldEmpty || isValid.isPasswordFieldEmpty}
            onPress={() => handleLogin()}
          />

          {isLoading? <Spinner/> : null }
    
          <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
            <Text style={styles.navButtonText}>Forgot Password?</Text>
          </TouchableOpacity>
    
          {Platform.OS === 'android' ? (
            /* <Layout> */
            <>
              <SocialButton
                buttonTitle="Sign In with Facebook"
                btnType="facebook-f"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                onPress={() => facebookLogin()}
              />
              {/* <Layout style={{backgroundColor: 'rgba(52, 52, 52, alpha)',}}></Layout> */}
              <SocialButton
                buttonTitle="Sign In with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={() => googleLogin()}
              />
              </>
            /* </Layout> */
          ) : null}
    
          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => navigation.navigate('SignupScreen')}
            >
            <Text style={styles.navButtonText}>
              Don't have an acount? Create here
            </Text>
          </TouchableOpacity>
          </ImageBackground>
          </Layout>
    );
  };

export default LoginScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    bgImage: {
      // flex: 1,
      padding: 20,
      resizeMode: "cover",
      width: Dimensions.get("screen").width,
      height: Dimensions.get("screen").height,
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      height: 200,
      width: 200,
      // resizeMode: 'cover',
    },
    titleText: {
      fontFamily: 'Nexa Bold',
      fontSize: 70,
      color: Theme.COLORS.PRIMARY,
      margin: 10,
    },
    text: {
      fontFamily: 'Nexa Regular',
      fontSize: 36,
      marginBottom: 10,
      fontWeight: 'bold',
      color: '#051d5f',
    },
    navButton: {
      marginTop: 15,
    },
    forgotButton: {
      marginVertical: 35,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#2e64e5',
      fontFamily: 'Nexa Regular',
    },
    errorMsg: {
      fontFamily: 'Nexa Regular',
      fontSize: 36,
      marginBottom: 10,
    },
  });
  