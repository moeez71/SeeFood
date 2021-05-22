import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ScrollView,ActivityIndicator, SafeAreaView, LogBox } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Text, Layout, List, ListItem, Button, Divider} from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import TopNavWithBack from '../../components/TopNavWithBack';
import BurgerLoader from '../../components/loaders/BurgerLoader';
import Theme from '../../constants/Theme';
import Settings from '../../Settings';
import { AuthContext } from '../../navigation/AuthProvider';
// LogBox.ignoreAllLogs()


const axiosClient = axios.create({
    baseURL: 'https://food-img-classifier.herokuapp.com',
    timeout: 50000, //50 seconds
});

const data = new Array(8).fill({
    title: 'Item',
    description: 'Description for Item',
  });
  
const hardPred = [
    {class: "pizza", prediction: 0.9},
    {class: "apple-pie", prediction: 0.8},
    {class: "cheese-cake", prediction: 0.6},
];
export default function CameraNew({navigation, route}) {

    const[image, setImage] = useState('');
    const[isLoading, setIsLoading] = useState(false);
    const[isErr, setIsErr] = useState(false);
    const[getPredictions, setPredictions] = useState([]);
    const[isClicked, setIsClicked] = useState(false);
    const[b64, setB64] = useState(null);
    const{userData} = useContext(AuthContext);

    const renderItem = ({ item, index }) => (
        <ListItem
          style={{elevation: 2,  borderRadius: 50, margin: 5}}
          title={()=><Text style={styles.listText}>{item.class}</Text>}
          description={() => <Text style={styles.subTxt}>Probability: {item.output}</Text>}
          accessoryRight={() => renderItemAccessory(item)}
        />
      );

      const renderItemAccessory = (item) => (
        <Button 
        size='small' 
        style={styles.seeBtn} 
        // onPress={()=>navigation.navigate('CameraRecipe', {foodName: item.class})}
        onPress={()=> handleClick(item)}
        >
        <Text style={{fontFamily: "Nexa Regular", color: "white"}}>See Recipe</Text>
        </Button>
      );

      const handleClick = async(item) => {
        await route.params.changeValue(item.class);
        await route.params.searchPress();
        await navigation.goBack();
      }
    
    const openCamera = async() => {
        
        let response = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
            base64: true
        })
        await setImage({
            uri: response.uri
        });
        // console.log(response);
        let base64Img = `data:image/jpg;base64,${response.base64}`;
        // await setB64(base64Img);
        uploadCloud(base64Img);
        classifyImg(response);

    }

    const openCameraRoll = async() => {
        
        
        let response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
            base64: true
        });
        await setImage({
            uri: response.uri
        });
        // console.log(response);
        let base64Img = `data:image/jpg;base64,${response.base64}`;
        // await setB64(base64Img);
        uploadCloud(base64Img);
        classifyImg(response);

    }

    const uploadCloud = async(base64Img) => {
        let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/hammadahm3d/image/upload';
        // let base64Img = `data:image/jpg;base64,${imgData.base64}`;
        // let base64Img = b64;
        let data = {
            "file": base64Img,
            "upload_preset": "ml_default",
          };

        var imgURL;
        // setIsLoading(true);
        await fetch(CLOUDINARY_URL, {
            body: JSON.stringify(data),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST',
          })
          .then(async r => {
            let data = await r.json()
            console.log(data.url)
            imgURL = await data.url;
            // setIsLoading(false);
      
          })
          .catch(err => console.log(err))

          //upload img url to mongodb

          let bodyData = {
              uid: userData.uid,
              link: imgURL
          };
          axios.put(`http://192.168.0.104:5010/gallery/add`, bodyData, {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
          })
          .then(res => console.log(res.data))
          .catch(e => console.error(e.message));
    }

    const classifyImg = (imgData) => {
        
        const uri = imgData.uri;
        let data = new FormData();
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];

        data.append('file', {
            uri: uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        });
        console.log('fetching!!')
        console.log(data);
        setIsLoading(true);
        setIsClicked(true);
        // axiosClient.get('/ping')
        // .then(res=> console.log(res.data))
        // .catch(e => console.log(e.message))
        
        axiosClient.post('/api/classify', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'

            }
        })
        .then(async(res) => {
            console.log(res.data);
            setPredictions(res.data.predictions);
            setIsLoading(false);
        })
        .catch(e => {
            console.log(e)
            setIsErr(true);
        })
    }

    if (isLoading)
      return (<BurgerLoader />);
   
    return(
        <SafeAreaView style={{ flex: 1 }}>
        <TopNavWithBack navigation={navigation} screenTitle="Capture Image"/>
        <ScrollView style={styles.container}>
            <Layout style={styles.container} >

                <View style={styles.actionsContainer}>

                    <View style={styles.callToActionContainer}>
                        <TouchableOpacity onPress={() => openCamera()}>
                            <Ionicon name='camera-outline' size={100}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> openCameraRoll()}>
                            <Ionicon name='image-outline' size={100}/>
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.imageContainer}>
                    <Image source={{uri: image.uri}}style={{height: 200, width: 200}}/>

                </View>


                <View style={styles.predictionsContainer}>
                    

                    <View>
                        <List
                        style={styles.container}
                        data={getPredictions}
                        renderItem={renderItem}
                        />
                    </View>
                </View>
            </Layout>

        </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: 10,
        backgroundColor: "white"
    },
    
    contentContainer: {
        paddingTop: 10,
        marginTop: 5,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 10,
        flex: 2,
        justifyContent: 'center',
    },
    actionsContainer: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        flex: 1,
    },
    imageContainer: {
        flex: 4,
        alignItems: 'center',
    
    },
    callToActionContainer: {
        flex: 1,
        flexDirection: "row",
    },
    feedBackContainer: {
        flex: 1,
    },
    
    feedBackActionsContainer: {
        flex: 1,
        flexDirection: "row"
    },
    
    predictionsContainer: {
        flex: 4,
        padding: 10,
        justifyContent: 'center',
    
    },
    
    predictionsContentContainer: {
        flex: 4,
        padding: 10,
    
    },
    seeBtn: {
        borderRadius: 50,  
        backgroundColor: 
        Theme.COLORS.PRIMARY, 
        borderColor:Theme.COLORS.PRIMARY, 
    },
    listText: {
        fontSize: 20,
        fontFamily: "Nexa Bold",
        marginLeft: 5,
    },
    subTxt: {
        fontSize: 14,
        marginLeft: 5,
        fontFamily: "Nexa Light",
    },
    
    });
    