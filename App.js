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
    TextInput,
    Button,
    FlatList,
    Image
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FaBeer } from 'react-icons/fa';
import Ionicons from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderHome from './src/components/header';
import { stories } from './src/core/constants';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {

    const HomeStack = createStackNavigator();
    function HomeStackScreen() {
        return (
            <HomeStack.Navigator>
                <HomeStack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerStyle: {
                            height: 50
                        },
                        headerTitle: props => <HeaderHome {...props} />
                    }}
                />
            </HomeStack.Navigator>
        );
    }

    const AlbumStack = createStackNavigator();
    function AlbumStackScreen() {
        return (
            <AlbumStack.Navigator>
                <AlbumStack.Screen name="Home" component={AlbumsScreen} />
            </AlbumStack.Navigator>
        );
    }


    const CameraStack = createStackNavigator();
    function CameraStackScreen() {
        return (
            <CameraStack.Navigator>
                <CameraStack.Screen name="Home" component={CameraScreen} />
            </CameraStack.Navigator>
        );
    }

    const LikesStack = createStackNavigator();
    function LikesStackkScreen() {
        return (
            <LikesStack.Navigator>
                <LikesStack.Screen name="Home" component={LikeScreen} />
            </LikesStack.Navigator>
        );
    }

    const UserStack = createStackNavigator();
    function UserStackScreen() {
        return (
            <UserStack.Navigator>
                <UserStack.Screen name="Home" component={SettingsScreen} />
            </UserStack.Navigator>
        );
    }
    // const HomeStack = createStackNavigator();
    // const HomeStack = createStackNavigator();
    // const HomeStack = createStackNavigator();
    // const HomeStack = createStackNavigator();
    return (
        <NavigationContainer>
            <Tab.Navigator tabBarOptions={{ showLabel: false }} screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
            }}>
                <Tab.Screen
                    options={{ tabBarIcon: () => <Icon name="home" size={25} color="#900" /> }}
                    name="Upcoming"
                    component={HomeStackScreen}
                />
                <Tab.Screen
                    options={{ tabBarIcon: () => <Icon name="search" size={25} color="#900" /> }}
                    name="images"
                    component={AlbumStackScreen}
                />
                <Tab.Screen
                    options={{ tabBarIcon: () => <Icon name="plus-square-o" size={25} color="#900" /> }}
                    name="Camera"
                    component={CameraStackScreen}
                />
                <Tab.Screen
                    options={{ tabBarIcon: () => <Icon name="heart" size={25} color="#900" /> }}
                    name="Likes"
                    component={LikesStackkScreen}
                />
                <Tab.Screen
                    options={{ tabBarIcon: () => <Icon name="user-circle" size={25} color="#900" /> }}
                    name="Darrell"
                    component={UserStackScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const IgStories = ({ item }) => (
    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 15 }}>
        <Image style={{ borderRadius: 50 }}  source={item.image} />
        <Text>{item.name}</Text>
    </View>
)

function HomeScreen() {
    return (
        <View style={{ display: 'flex', flexDirection: 'column' }}>
            {/* <Text>Home!</Text> */}
            <FlatList
                showsHorizontalScrollIndicator={false}
                style={{
                    marginVertical: 10,
                    paddingLeft: 10
                }}
                horizontal={true}
                data={stories}
                renderItem={({ item }) => <IgStories item={item} />}
            />
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
            <Icon name="rocket" size={25} color="#900" />
        </View>
    );
}

function LikeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Like!</Text>
            <Icon name="rocket" size={25} color="#900" />
        </View>
    );
}

function CameraScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>CameraScreen!</Text>
            <Icon name="rocket" size={25} color="#900" />
        </View>
    );
}

function AlbumsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>AlbumsScreen!</Text>
            <Icon name="rocket" size={25} color="#900" />
        </View>
    );
}

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
