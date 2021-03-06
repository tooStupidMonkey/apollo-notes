import {StyleSheet} from 'react-native'; 
import { Dimensions } from 'react-native';

export const CommonStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        padding: 10,
    },
    input: {
        width: Dimensions.get('window').width - 20,
        height: 40,
        borderColor: '#eeddff',
        borderRadius: 2,
        borderWidth: 1,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    marginTop10: {
        marginTop: 10
    },
    button: {
        width: 120,
        height: 40,
        backgroundColor: 'red'
    },
    textAlignCenter: {
        textAlign: 'center'
    } 
})

export const Note = StyleSheet.create({
    item: {
        width: Dimensions.get('window').width - 40
    },
    buttonsWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    header: {
        display: 'flex',
        flex: 1,
        alignContent: 'center',
        marginBottom: 15,
    },
    headerText: {
       fontSize: 20,
       fontWeight: 'bold'     
    }
})

export const ErrorStyles = StyleSheet.create({
    error: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold', 
        fontSize: 19
    },
    errorWrap: {
        position: 'absolute',
        top: 60,
        width: Dimensions.get('window').width,
        zIndex: 1,
    },
    errorItem: {
        width: Dimensions.get('window').width - 60,
        minHeight: 40,
        left: (Dimensions.get('window').width - 60) / 12,
        marginTop: 15,
        backgroundColor: '#FF0000',
        borderRadius: 4,
        padding: 15,
        shadowColor: "rgba(255,0,0,1)",
        shadowOffset: {
            width: 7,
            height: 7,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        zIndex: 2
    }
})
