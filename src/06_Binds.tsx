import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStyles } from './00_Share';

const ContactEditor = () => {
    const Styles = useStyles();
    
    return (<SafeAreaView style={Styles.safeArea}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={Styles.text}>Hello, World!</Text>
        </View>
    </SafeAreaView>);
};

export default ContactEditor;