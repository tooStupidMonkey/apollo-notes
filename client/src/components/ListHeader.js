import React from 'react'
import {View, Text} from 'react-native'
import {Note, CommonStyles} from '@/styles/index'

export default ({totalResults}) => {
    return (
        <View style={Note.header}>
            <Text style={{...CommonStyles.textAlignCenter, ...Note.headerText}}>Total amount: {totalResults}</Text>
        </View>
    );
}