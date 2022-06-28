import React from 'react';
import { Text, View } from 'react-native';
import { Styles } from './Style';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColors } from './00_Share';

const AppearancePicker = () => {
    const { background, label } = useColors();
    return (<SafeAreaView style={[Styles.safeArea, {backgroundColor: background}]}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={[Styles.text, {color: label }]}>Hello, world!</Text>
        </View>
    </SafeAreaView>);
};

export default AppearancePicker;