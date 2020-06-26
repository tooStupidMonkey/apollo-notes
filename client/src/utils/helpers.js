import React, { useEffect } from 'react';
import { SET_NOTIFICATION, NOTIFICATIONS } from '@/utils/queries'
import { useMutation } from '@apollo/react-hooks';
import { useApolloClient } from '@apollo/react-hooks';

export const dateConvert = (date) => {
    return new Date(Number(date)).toDateString()
}

export const pushNotificatins = (notifications) => {
    
        const client = useApolloClient();
        client.writeQuery({
            query: NOTIFICATIONS,
            data: { notifications },
          });
            //const client = useApolloClient();
            //client.writeData({ data: { notifications}})
            //const [setNotifications] = useMutation(SET_NOTIFICATION)
        // setNotifications({
        //     variables: { 
        //         notifications
        //     }
        // })
    
}

export const emptyNotifications = { data: { notifications: []}}

export const requestParams = (data) =>({
  variables: data
})