import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';

import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import TopNavWithBack from '../../components/TopNavWithBack';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../navigation/AuthProvider';
import Theme from '../../constants/Theme';
import axios from 'axios';
import PopUp from '../../components/PopUp';

import config_ip from "../../config_ip"





const EditProfileScreen = ({navigation, ...props}) => {
  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  const {colors} = useTheme();
  const {userData, setUserData, user} = useContext(AuthContext);
  const[firstName, setFirstName] = useState(null);
  const[lastName, setLastName] = useState(null);
  const[email, setEmail] = useState(null);
  const[phone, setPhone] = useState("+9234000000");
  const[country, setCountry] = useState("Pakistan");
  const[city, setCity] = useState("Islamabad");
  const [popVisible, setPopVisible] = useState(false);

  const setFields = async() => {
    
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setEmail(userData.email);
    setImage(userData.photoURL);
  }

  useEffect(()=>{
    setFields();
  }, []);

  const handleSubmit = async() => {

    let tmp = {
      uid: userData.uid,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phone,
      photoURL: userData.photoURL,
      providerId: userData.providerId,
    };

    await setUserData(tmp);
    user.updateProfile({displayName: firstName + ' ' + lastName});

    axios.post(`http://192.168.190.98:3000/users/updateUser`, tmp, {
      headers: {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
    
        }
      }
    })
    .then(res => {
      console.log(res.data);
      setPopVisible(true);
      alert("Details Updated Successfully!")
    })
    .catch(e => e.message)

  }

  const takePhotoFromCamera = async() => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      quality: 0.7,
      allowsEditing: true
    };

    let response = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7
    });
    await setImage(response.uri);
    // await setUserData({
    //   uid: userData.uid,
    //   firstName: userData.firstName,
    //   lastName: userData.lastName,
    //   email: userData.email,
    //   phoneNumber: userData.phoneNumber,
    //   photoURL: response.uri,
    //   providerId: userData.providerData,
    // });
    this.bs.current.snapTo(1);
  }

  const choosePhotoFromLibrary = async() => {
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7
    });
    await setImage(response.uri);
    // await setUserData({
    //   uid: userData.uid,
    //   firstName: userData.firstName,
    //   lastName: userData.lastName,
    //   email: userData.email,
    //   phoneNumber: userData.phoneNumber,
    //   photoURL: response.uri,
    //   providerId: userData.providerData,
    // });
    console.log(response);
    this.bs.current.snapTo(1);
  }

  bs = React.createRef();
  fall = new Animated.Value(1);

  if (popVisible)
    return (<PopUp makeVisible={popVisible} changeVisibility={setPopVisible(false)}/>);

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} 
      onPress={takePhotoFromCamera}
      >
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} 
      onPress={choosePhotoFromLibrary}
      >
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}
        >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  

  return (
    <View style={styles.container}>
          <TopNavWithBack navigation={navigation} screenTitle="Edit Profile"/>
      <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
    }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity 
          onPress={() => this.bs.current.snapTo(0)}
          >
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: image,
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontFamily: "Nexa Bold",}}>
          {userData.firstName} {userData.lastName}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            value={lastName}
            onChangeText={(text) => setLastName(text)} 
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color={colors.text} size={20} />
          <TextInput
            editable={false}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            value={email}
            editable={false}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="globe" color={colors.text} size={20} />
          <TextInput
            value={country}
            onChangeText={(text) => setCountry(text)}
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Icon name="map-marker-outline" color={colors.text} size={20} />
          <TextInput
            value={city}
            onChangeText={(text) => setCity(text)}
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <TouchableOpacity style={styles.commandButton} 
        onPress={() => handleSubmit()}
        >
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  commandButton: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: Theme.COLORS.PRIMARY,
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "white",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    fontFamily: "Nexa Regular",
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
    fontFamily: "Nexa Regular",
  },
  panelButton: {
    padding: 13,
    borderRadius: 50,
    backgroundColor: Theme.COLORS.PRIMARY,
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    // fontWeight: 'bold',
    color: 'white',
    fontFamily: "Nexa Bold",
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
    fontFamily: "Nexa Regular",
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    fontFamily: "Nexa Regular",
  },
});
