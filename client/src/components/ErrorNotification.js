import React from 'react'
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native'
import {ErrorStyles} from '@/styles/index'
import { useApolloClient } from '@apollo/react-hooks';
import { NOTIFICATIONS } from '@/utils/queries'
import { useQuery } from '@apollo/react-hooks';
import {emptyNotifications} from '@/utils/helpers'


export default ErrorNotification = () =>  {
    const {data} = useQuery(NOTIFICATIONS)
    const client = useApolloClient();

    setTimeout(()=>{
        client.writeData(emptyNotifications)
    }, 5000);

    const Errors = data.notifications.map((error, key) => (
        <TouchableOpacity 
            onPress={()=>{
                client.writeData(emptyNotifications)
            }}
            style={ErrorStyles.errorItem} key={key}
        >
            <Text style={ErrorStyles.error}>{error}</Text>
        </TouchableOpacity>)
        )
    return (
        <View style={ErrorStyles.errorWrap}>
            <View>{Errors}</View>
        </View>
    )
}