import React, { useState } from "react";
import { Mutation } from "react-apollo";
import {Text, TextInput, Button, SafeAreaView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {CommonStyles} from "@/styles/index";
import {CREATE_NOTES, GET_NOTES} from "@/utils/queries";

export default () => {
    const [note, setNote] = useState("");
    const navigation = useNavigation();
    return (
        <Mutation
          mutation={CREATE_NOTES}
          refetchQueries={[{ query: GET_NOTES }]}
          onCompleted = {()=>{
            navigation.navigate("Users");
          }}
        >
          {(createNote, { loading, error, data }) => {
            if (loading) return <Text>Loading...</Text>;
            if (error) return <Text>Error :(</Text>;
      
            return (
              <SafeAreaView style={CommonStyles.container}>
                <Text>Create note:</Text>
                <TextInput
                  style={CommonStyles.input}
                  autoFocus={true}
                  onChangeText={text => setNote(text)}
                />
                <Button
                    title="Create"
                    onPress={() => createNote({ variables: {
                        note
                      }})
                    }
                />
              </SafeAreaView>
            );
          }}
        </Mutation>
    );
};