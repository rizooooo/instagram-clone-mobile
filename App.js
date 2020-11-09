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
    Image,
    PermissionsAndroid, Platform,
    Dimensions,
    TouchableOpacity
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
import HeaderAlbum from './src/components/header-album';
import { stories, posts } from './src/core/constants';
import Post from './src/components/post';

import CameraRoll from "@react-native-community/cameraroll";

import RNFS from 'react-native-fs';
// var RNFS = require('react-native-fs');

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
        return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
}

async function savePicture() {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
        return;
    }
    CameraRoll.saveToCameraRoll(tag, [type]);
};

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
                <AlbumStack.Screen
                    name="Home"
                    component={AlbumsScreen}
                    options={{
                        headerStyle: {
                            height: 50
                        },
                        headerTitle: props => <HeaderAlbum {...props} />
                    }} />
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
        <Image style={{ borderRadius: 50 }} source={item.image} />
        <Text>{item.name}</Text>
    </View>
)

const ListStoriesContainer = () => (
    <View>
        <FlatList
            showsHorizontalScrollIndicator={false}
            style={{
                marginVertical: 0,
                padding: 10,
            }}
            horizontal={true}
            data={stories}
            renderItem={({ item }) => <IgStories item={item} />}
        />
    </View>
);

function HomeScreen() {
    return (
        <View style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#fff', height: '100%' }}>

            {/* <Text>Home!</Text> */}

            <View style={{ flex: 1 }}>

                <FlatList
                    ListHeaderComponent={ListStoriesContainer}
                    data={posts}
                    renderItem={({ item }) => <Post item={item} />}
                />
                {/* <Text>Images</Text> */}
            </View>
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
        <View style={{ width: Dimensions.get('window').width, height: 300 }}>
            <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={{
                flex: 1,
                width: null,
                height: null
            }} />
        </View>
    );
}

function AlbumsScreen() {
    const [photos, setPhotos] = useState([]);
    const [photo, setPhoto] = useState(null);
    useEffect(() => {
        hasAndroidPermission();
        CameraRoll.getPhotos({
            first: 30,
            assetType: 'Photos',
        }).then(p => {
            setPhotos(p.edges)
            setPhoto(p.edges[0].node.image.uri)
        })
    }, [])

    // <Image key={i} width={200} height={200} source={p.node.image.uri} />
    return (
        <View style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <View style={{ flex: 1.3 }}>
                {photo && <Image style={{
                    flex: 1,
                    width: null,
                    height: 100,
                    resizeMode: 'cover'
                }} source={{ uri: photo }} />}
            </View>
            <FlatList
                style={{ flex: 1 }}
                keyExtractor={(item, index) => index}
                numColumns={4}
                data={photos}
                contentContainerStyle={{ justifyContent: 'flex-start', flexDirection: 'column' }}
                renderItem={(item, i) => <View key={item.item.node.image.uri} style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                    <TouchableOpacity onPress={() => setPhoto(item.item.node.image.uri)}>
                        <Image style={{
                            flex: 1,
                            width: null,
                            height: 100,
                            resizeMode: 'cover'
                        }} source={{ uri: item.item.node.image.uri }} />
                    </TouchableOpacity>

                </View>}
            />
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
