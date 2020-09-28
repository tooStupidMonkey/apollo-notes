import React from 'react'
import {TextInput, SafeAreaView, Button, View, Text } from 'react-native'
import { useMutation } from '@apollo/react-hooks';
import { AsyncStorage } from 'react-native';
import {CommonStyles} from '@/styles/index'
import {SIGN_UP_USER} from '@/utils/queries'
import { useApolloClient } from '@apollo/react-hooks';

export default () => {
    const [email, onChangeEmail] = React.useState('test2@com.com');
    const [password, onChangePassword] = React.useState('test');
    const [firstName, onChangeFirstName] = React.useState('Dick');
    const [lastName, onChangeLastName] = React.useState('FuckenTrahen');
    const client = useApolloClient();
    const [signUp] = useMutation(SIGN_UP_USER, {
        onCompleted: async (data) => {
            try {
                await AsyncStorage.setItem(
                  'AUTH_TOKEN',
                  data.signUp
                );
                client.writeData({ data: { isLoggedIn: true} });
            } catch (error) {
                console.log('Login Error', error)
            }
        },
        onError: async (error) => {
            return console.log('Error', error)
        }
    });

    return (
        <SafeAreaView style={CommonStyles.container}>
            <View>
                <Text>Login:</Text>
                <TextInput
                    style={CommonStyles.input}
                    onChangeText={email => onChangeEmail(email)}
                    value={email}
                /> 
           </View>
           <View>
               <Text style={CommonStyles.marginTop10}>Password:</Text>
               <TextInput 
                    style={CommonStyles.input}
                    secureTextEntry={true}
                    onChangeText={password => onChangePassword(password)}
                    value={password}
               />
           </View>
           <View>
               <Text style={CommonStyles.marginTop10}>First Namr:</Text>
               <TextInput 
                    style={CommonStyles.input}
                    onChangeText={firstName => onChangeFirstName(firstName)}
                    value={firstName}
               />
           </View>
           <View>
               <Text style={CommonStyles.marginTop10}>Last name:</Text>
               <TextInput 
                    style={CommonStyles.input}
                    onChangeText={lastName => onChangeLastName(lastName)}
                    value={lastName}
               />
           </View>
           <View>
           <Button 
                    title={'Sign Up'}
                        onPress={(e) => { 
                            e.preventDefault();
                            signUp({
                            variables: { 
                                email, 
                                password,
                                firstName,
                                lastName
                            }
                        })
                    }
                    }
               />    
           </View>
        </SafeAreaView>
    )
}
