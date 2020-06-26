import React, { useState, useEffect } from 'react'
import {SafeAreaView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import Rating from '@/components/Rating'
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import {EDIT_USER} from '@/utils/queries'
import { useMutation } from '@apollo/react-hooks';
import {requestParams} from '@/utils/helpers'
import { useNavigation } from '@react-navigation/native';
import {CommonStyles} from '@/styles/index'
const { ReactNativeFile } = require('apollo-upload-client');

const styles = StyleSheet.create({
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    }
})

export default ({route}) => {
    const [firstName, setFirstName] = useState(route.params.firstName);
    const [lastName, setLastName] = useState(route.params.lastName);
    const [rating, setRating] = useState(route.params.rating);
    const [openCamera, setOpenCamera] = useState(false);
    const [image, setImage] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const navigation = useNavigation();

    const [editUser] = useMutation(EDIT_USER, {
        onCompleted: async (result) => {
            console.log('result', result)
        },
        onError: async (error) => {
            console.log('Edit error:', error)
        }
    })
    

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
        const file = new ReactNativeFile({
            uri: result.uri,
            name: 'a.jpg',
            type: result.type,
            });
          setImage(file);
        }
      };

    useEffect(() => {
        (async () => {
          if (Constants.platform.ios) {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
          })();
      }, []);

      if (openCamera && hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
      console.log('image', image)
    return (
        <SafeAreaView>
            <View 
                style={
                    {
                        display: 'flex',
                        alignItems: 'center'
                    }
                }
            >
                <View style={styles.imageContainer}>
                    <Button title="Update image" onPress={pickImage} />
                    {image && <Image source={{ uri: image.uri }} style={{ width: 150, height: 150, borderRadius: 100, marginTop: 20 }} />}
                </View>
                { openCamera &&  <View>
                    <Camera style={
                        {height: Dimensions.get('window').height}
                    } type={type}>
                        <View>
                        <TouchableOpacity
                            onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            );
                            }}>
                            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                        </TouchableOpacity>
                        </View>
                    </Camera>
                        </View> }
                <View
          
                >
                    <Text>First name:</Text>
                    <TextInput
                    value={firstName}
                    onChangeText={value =>setFirstName(value)}
                    style={{...CommonStyles.input, ...CommonStyles.marginTop(10)}}
                    ></TextInput>
                </View>
                <View
                    style={CommonStyles.marginTop(20)}
                >
                    <Text>Last name:</Text>
                    <TextInput
                    value={lastName}
                    onChangeText={value => setLastName(value)}
                    style={{...CommonStyles.input, ...CommonStyles.marginTop(10)}}
                    ></TextInput>
                </View>
                <View
                    style={CommonStyles.marginTop(15)}
                >
                    <Rating
                        action={setRating}
                        active={rating}
                    />
                </View>
                <View
                    style={{...CommonStyles.containerRow, ...CommonStyles.justifyContentCenter}}
                >
                    <Button
                        title="Cancel"
                        onPress={e => {
                        navigation.navigate('Users')
                    }}
                    />
                    <Button               
                        title="Save"
                        onPress={e => {
                            console.log('dss', {
                                id: route.params.id, 
                                firstName,
                                lastName,
                                rating,
                                file: image,
                            })
                            editUser({
                                variables: {
                                    id: route.params.id, 
                                    firstName,
                                    lastName,
                                    rating,
                                    file: image,
                                }
                            })
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}