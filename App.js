/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const App = () => {
    const { container, headerText, subHeader, input } = styles;
    const [users, setUsers] = useState([]);
    useEffect(() => {
        console.log(firestore);
        const unsubscribe = firestore().collection('users').onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            setUsers(data);
        })

        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={container}>
                <Text style={headerText}>Earthlycart</Text>
                <Text style={subHeader}>LOGIN</Text>
{/* 
                <View>
                    <TextInput style={input} />
                </View> */}
                <Text>
                {JSON.stringify(users)}
                </Text>
               
                {users && users.map(user => <Text key={user.id}>{user.name}</Text>)}
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subHeader: {
        fontSize: 15,
        fontWeight: '900'
    },
    input: {
       paddingHorizontal: 8,
       height: 40,
       fontWeight: "normal",
       borderWidth: 1,
       borderColor: '#ced4da',
       borderRadius: 5,
       width: 200,
       color: 'black'
    }
});

export default App;
