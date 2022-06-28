import React from 'react';
import { Text, View } from 'react-native';
import { Styles } from './Style';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColors, useStyles } from './00_Share';

const AppearancePicker = () => {
    const { safeArea, text } = useStyles();
    return (<SafeAreaView style={safeArea}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={text}>Hello, world!</Text>
        </View>
    </SafeAreaView>);
};

export default AppearancePicker;