import React from 'react'
import { useApolloClient } from '@apollo/react-hooks';
import { Button, AsyncStorage} from 'react-native'

export default () => {
    const client = useApolloClient();
    return (
        <Button
            title="Log out"
            onPress={async (e) => { 
                try {
                    client.writeData({ data: { isLoggedIn: false} });
                    await AsyncStorage.removeItem(
                      'AUTH_TOKEN'
                    );
                } catch (error) {
                    console.log('Error', error)
                }
                e.preventDefault()
            }}
        />
    )
}