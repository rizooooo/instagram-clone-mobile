import React from 'react'
import { Image, StyleSheet, View, Text, Dimensions } from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
const Post = ({ item: { avatar, username, image, location } }) => {
    return (
        <View style={{ backgroundColor: '#fff', marginBottom: 50 }}>
            <View style={{ display: 'flex', flexDirection: 'row' ,alignSelf: 'stretch', padding: 10 , justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={avatar} style={{ borderRadius: 100 }} />
                        <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>{username}</Text>
                        {/* <Text>location</Text> */}
                        </View>
                       
                    </View>
                    <EntypoIcon name={'dots-three-vertical'} />
            </View>
            <View style={{ width: Dimensions.get('window').width, height: 300 }}>
                <Image source={image} style={{
                    flex: 1,
                    width: null,
                    height: null
                }} />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 8 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <FAIcon size={25} style={{ marginHorizontal: 6 }} name={'heart-o'} />
                    <FAIcon size={25} style={{ marginHorizontal: 6 }} name={'comment-o'} />
                    <FAIcon size={25} style={{ marginHorizontal: 6 }} name={'send-o'} />
                </View>
                <FAIcon name={'bookmark-o'} size={25} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        // width: 80,
        flexDirection: 'row',
        height: '100%',
        alignSelf: 'stretch',
        // backgroundColor: 'red',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    }
});

export default Post;