import React, { useState } from 'react';
import { Mutation } from '@apollo/react-components';
import { GET_NOTES } from '@/utils/queries';
import { TextInput, Button, SafeAreaView, Text, View} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {CommonStyles, Note} from '@/styles/index'
import {EDIT_NOTE, RAIT_USER} from '@/utils/queries'
import Rating from '@/components/Rating'
import { useMutation } from '@apollo/react-hooks';

export default ({route}) => {
    const {id, note} = route.params;
    const [newNote, setNewNote] = useState();
    const navigation = useNavigation();
    const [raitUser] = useMutation(RAIT_USER, {
      onError: (error) => {
        console.log('On error: ', error)
      },
      onCompleted: (data) => {
        console.log('data: ', data)
      }
    });

    const defaultAction = (i) => {
      raitUser({
        id: 1,
        rating: i
      })
    }

    return (
      <Mutation 
        mutation={EDIT_NOTE}
        refetchQueries={[{ query: GET_NOTES }]}
        onCompleted = {() => navigation.navigate('Notes')}
        onError={(error)=>console.log('Server error', error)}
    >
        {(editNote, { data }) => (
          <SafeAreaView style={CommonStyles.container}>
              <Text>Edit note:</Text>
                <TextInput
                    style={CommonStyles.input}
                    onChangeText={(value) => { 
                        setNewNote(value)
                    }}
                    value={newNote}
                    defaultValue={note}
                />
                <Rating action={defaultAction} />
                <View style={Note.buttonsWrap}>
                  <Button
                    title="Cancel"
                    onPress={e => {
                      e.preventDefault();
                      navigation.navigate('Notes')

                  }}
                  />
                  <Button               
                      title="Save"
                      onPress={e => {
                          e.preventDefault();
                          editNote({ variables: { id, note: newNote } });

                      }}
                  />
                </View>
          </SafeAreaView>
        )}
      </Mutation>
    );
  };