import React, {useEffect} from 'react'
import {SafeAreaView, TextInput, Text, Button, View} from 'react-native'
import { useMutation } from '@apollo/react-hooks';
import { AsyncStorage } from 'react-native';
import { useApolloClient } from '@apollo/react-hooks';
import {CommonStyles} from '@/styles/index'
import { LOGIN_USER, NOTIFICATIONS } from '@/utils/queries'
import { useQuery } from '@apollo/react-hooks';

export default () => {
    const [email, onChangeEmail] = React.useState('test@com.com');
    const [password, onChangePassword] = React.useState('test');
    const client = useApolloClient();
    const { data } = useQuery(NOTIFICATIONS);

    const [signIn] = useMutation(LOGIN_USER, {
        onCompleted: async (data) => {
            console.log('data', data)
            await AsyncStorage.setItem(
                'AUTH_TOKEN',
                data.login
            );

            client.writeData({ data: { isLoggedIn: true, notifications: []} });
        },
        onError: async (error) => {
            console.log('error11', error)
            client.writeData({ data: { notifications: ['User not found']}})
            await AsyncStorage.removeItem('AUTH_TOKEN');
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
               <Button 
                    title={'Sign In'}
                    onPress={(e) => { 
                        e.preventDefault();
                        signIn({
                        variables: { 
                            email, 
                            password
                        }
                    })
                    }
                    }
               />
           </View>
       </SafeAreaView> 
    )
}