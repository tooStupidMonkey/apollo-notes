import React from 'react'
import {SafeAreaView, View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: "center",
        maxWidth: 150,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 6,
        },
        shadowOpacity: 0.97,
        shadowRadius: 7.49,
        elevation: 12,
    },
    marginLeft: (value) => ({marginTop: value}),
    nameContainer: {
        textAlign: 'center',
        
    }
})

export default ({user}) => {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <TouchableWithoutFeedback onPress={() => navigation.push('Edit User', user)}>
                <View style={Styles.container}>
                        <View>
                            <Icon
                                name="user"
                                size={55}
                            />
                        </View>
                        <View>
                            <Text style={{...Styles.nameContainer, ...Styles.marginLeft(10)}}>{user.firstName} {user.lastName}</Text>
                        </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}