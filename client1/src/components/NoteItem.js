import React from 'react'
import {View, Text, Button} from 'react-native'
import {Note, CommonStyles} from '@/styles/index'
import { useNavigation } from '@react-navigation/native';
import DeleteNote from '@/components/DeleteNote'
import {dateConvert} from '@/utils/helpers'

export default ({item}) => {
    const {id, createdAt, note} = item;
    const navigation = useNavigation();
    return (
        <View style={Note.item}>
            <View>
                <View>
                    <Text>Note: {note}</Text>
                    <Text style={CommonStyles.marginTop10}>Date: {dateConvert(createdAt)}</Text>
                    <View style={Note.buttonsWrap}>
                        <Button
                            title="Edit"
                            onPress={() => (
                                navigation.push('Edit Note', item)
                            )}
                        />
                        <DeleteNote id={id} />
                    </View>
                </View>

            </View>
        </View>
    );
}