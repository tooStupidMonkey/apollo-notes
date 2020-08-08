import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {IS_LOGGED_IN} from '@/utils/queries'
import Notes from '@/pages/Notes'
import Users from '@/pages/Users'
import EditNote from '@/pages/EditNote'
import EditUser from '@/pages/EditUser'
import AddNote from '@/pages/AddNote'
import SignIn from '@/pages/SignIn'
import SignUp from '@/pages/SignUp'
import ErrorNotification from '@/components/ErrorNotification'
import {View} from 'react-native'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function UsersStack() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Users" component={Users} />
            <Stack.Screen name="Edit User" component={EditUser} />
            <Stack.Screen name="Edit Note" component={EditNote} />
        </Stack.Navigator>
    ) 
}

export function AuthorizedStack() {
    return (      
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Users list" component={UsersStack} />
                <Tab.Screen name="Add Note" component={AddNote} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export function AuthorizationTabs() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Sign in" component={SignIn} />
                <Tab.Screen name="SignUp" component={SignUp} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export function AplicationStack() {
    const { data } = useQuery(IS_LOGGED_IN);

    if (data && data.isLoggedIn) {
        return <AuthorizedStack />
    } 
    return <AuthorizationTabs />
}