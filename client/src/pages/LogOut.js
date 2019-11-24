
import React from 'react'
import { Redirect } from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks';

const LogOut = () => {
    const client = useApolloClient();
    client.writeData({ data: { isLoggedIn: false } });
    localStorage.clear();
    return <Redirect to={'/'} />
}

export default LogOut;