import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const HeaderHome = () => {
    const { container, headerText } = styles;
    return (
       <View style={container}>
           <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
           <Icon name="camera" size={20} color="#900" />
           <Text style={headerText}>Instagram</Text>
           </View>
          
           <Icon name="send-o" size={20} color="#900" />
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

export default HeaderHome
