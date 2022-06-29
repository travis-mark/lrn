import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { MyIcon, MyTextInput, useStyles } from './00_Share';

const ContactEditor = () => {
    const Styles = useStyles();
    const [name, setName] = React.useState('Mel Kesler');
    const [phone, setPhone] = React.useState('(717) 645-1192');
    const [birthday, setBirthday] = React.useState('1980-07-26');
    const [email, setEmail] = React.useState('mekesler@gmail.com');
    const [comment, setComment] = React.useState('');
    
    return (<SafeAreaView style={Styles.safeArea}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ flex: 1, flexBasis: 60, flexGrow: 0, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <MyIcon name="person"></MyIcon>
                <MyTextInput onChangeText={newText => setName(newText)} placeholder='Name' style={{ flexGrow: 1, margin: 8 }}>{ name }</MyTextInput>
            </View>
            <View style={{ flex: 1, flexBasis: 60, flexGrow: 0, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <MyIcon name="phone"></MyIcon>
                <MyTextInput onChangeText={newText => setPhone(newText)} placeholder='Phone' style={{ flexGrow: 1, margin: 8 }}>{ phone }</MyTextInput>
            </View>
            <View style={{ flex: 1, flexBasis: 60, flexGrow: 0, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <MyIcon name="calendar"></MyIcon>
                <MyTextInput onChangeText={newText => setBirthday(newText)} placeholder='Birthday' style={{ flexGrow: 1, margin: 8 }}>{ birthday }</MyTextInput>
            </View>
            <View style={{ flex: 1, flexBasis: 60, flexGrow: 0, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <MyIcon name="mail"></MyIcon>
                <MyTextInput onChangeText={newText => setEmail(newText)} placeholder='E-mail' style={{ flexGrow: 1, margin: 8 }}>{ email }</MyTextInput>
            </View>
            <View style={{ flex: 1, flexGrow: 1, flexDirection: "row" }}>
                <MyTextInput onChangeText={newText => setComment(newText)} placeholder='Comments' multiline={true} style={{ flexGrow: 1, margin: 8 }}>{ comment }</MyTextInput>
            </View>
        </View>
    </SafeAreaView>);
};

export default ContactEditor;