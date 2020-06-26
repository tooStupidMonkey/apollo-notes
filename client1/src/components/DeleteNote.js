import React from 'react';
import { Mutation } from '@apollo/react-components';
import {View, Button} from 'react-native'
import {REMOVE_NOTES, GET_NOTES} from '@/utils/queries'

export default ({id}) => {
  
      return (
        <Mutation 
          mutation={REMOVE_NOTES}
          refetchQueries={[{ query: GET_NOTES }]}
          onCompleted = {()=>{
            toastr.info('Note has been deleted');
          }}
      >
          {(deleteNote) => (
            <View>
                <Button
                    title="Delete"
                    onPress={e => {
                    e.preventDefault();
                    deleteNote({
                        variables : {noteId: id}
                        });
                    }}
                />
            </View>
          )}
        </Mutation>
      );
    };