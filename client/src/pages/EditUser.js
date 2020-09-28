import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import Rating from '@/components/Rating'
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import { EDIT_USER, GET_NOTES } from '@/utils/queries'
import { URL_IMAGES } from '@/utils/constans'
import { useMutation } from '@apollo/react-hooks';
import { requestParams } from '@/utils/helpers'
import { useNavigation } from '@react-navigation/native';
import { CommonStyles } from '@/styles/index'
const { ReactNativeFile } = require('apollo-upload-client');
import { useQuery } from '@apollo/react-hooks';
import NoteItem from '@/components/NoteItem'
import ListHeader from '@/components/ListHeader'
import styled from 'styled-components';

const EditImageButtonWrap = styled.View`
    position: absolute;
    bottom: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    background: rgba(238, 238, 238, .5);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    height: 50px;
    margin: 0;
    border-bottom-left-radius: 550px;
    border-bottom-right-radius: 550px;
    width: 150px;
    bottom: 1px;
`;

const EditImageButton = styled.Text`
  color: white;
  font-size: 13px;
  text-align: center;
  margin: 0;
  line-height: 50px;
`;



const styles = StyleSheet.create({
  imageConßtainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    position: 'relative',
  }
})

const getNotes = () => {
  const { loading, error, data } = useQuery(GET_NOTES);
  return data ? data.notes.notes : []
}

export default ({ route }) => {
  const [firstName, setFirstName] = useState(route.params.firstName);
  const [lastName, setLastName] = useState(route.params.lastName);
  const [rating, setRating] = useState(route.params.rating);
  const [notes, setNotes] = useState([]);
  const [openCamera, setOpenCamera] = useState(false);
  const [image, setImage] = useState(route.params.avatar ? { uri: URL_IMAGES + route.params.avatar } : null);
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
        name: 'avatar.jpg',
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

    // const { loading, error, data } = useQuery(GET_NOTES);
    // console.log('loading, error, data', loading, error, data)
  }, []);

  if (openCamera && hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView>
      <View
        style={
          {
            display: 'flex',
            alignItems: 'center',
            paddingBottom: 30
          }
        }
      >
        <View style={styles.imageContainer}>
          {image && <Image source={{ uri: image.uri }} style={{ width: 150, height: 150, borderRadius: 100, marginTop: 20, borderWidth: 1, borderColor: '#eee' }} />}
          <EditImageButtonWrap>
            <TouchableOpacity 
              onPress={pickImage} 
            >
              <EditImageButton>Update image</EditImageButton>
            </TouchableOpacity>
          </EditImageButtonWrap>
        </View>
        {openCamera && <View>
          <Camera style={
            { height: Dimensions.get('window').height }
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
        </View>}
        <View

        >
          <Text>First name:</Text>
          <TextInput
            value={firstName}
            onChangeText={value => setFirstName(value)}
            style={{ ...CommonStyles.input, ...CommonStyles.marginTop(10) }}
          ></TextInput>
        </View>
        <View
          style={CommonStyles.marginTop(20)}
        >
          <Text>Last name:</Text>
          <TextInput
            value={lastName}
            onChangeText={value => setLastName(value)}
            style={{ ...CommonStyles.input, ...CommonStyles.marginTop(10) }}
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
          style={{ ...CommonStyles.containerRow, ...CommonStyles.justifyContentCenter }}
        >
          <Button
            title="Cancel"
            onPress={e => navigation.navigate('Users')}
          />
          <Button
            title="Save"
            onPress={e => {
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
        <View>
          <FlatList
            data={getNotes()}
            renderItem={({ item }) => <NoteItem item={item} />}
            keyExtractor={item => String(item.id)}
            ListHeaderComponent={<ListHeader totalResults={getNotes().length} />}
            extraData={notes}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}