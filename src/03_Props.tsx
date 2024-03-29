import React, { useState } from 'react';
import { View, FlatList, Image, Pressable, Text } from 'react-native';
import { MyTextInput } from './00_Share';
import { Colors, Styles } from './Style';

let todos = [
    { text: "Item 1" },
    { text: "Item 2" },
    { text: "Item 3" },
    { }
];

const TodoApp = () => {
    const [data, setData] = useState(todos);

    const addText = () => {
        const newObject = {}
        const newArray = data.concat([newObject]);
        setData(newArray);
    };


    const setText = (index: number, text: string) => {
        const newObject = Object.assign({}, data[index], {text: text});
        const newArray = data.slice(0, index).concat([newObject]).concat(data.slice(index+1, data.length));
        setData(newArray);
    };

    const delText = (index: number) => {
        const newArray = data.slice(0, index).concat(data.slice(index+1, data.length));
        setData(newArray);
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={[Styles.tableViewCell, {flex: 1, flexDirection: 'row', paddingHorizontal: 8}]}>
                <MyTextInput onChangeText={newText => setText(index, newText)} placeholder='Add Todo' style={{flexGrow: 1, margin: 8}}>{ item.text }</MyTextInput>
                <Pressable onPress={() => delText(index)}>
                    <View style={[ Styles.imageView, { minWidth: 44, minHeight: 44, backgroundColor: Colors.destructive, borderRadius: 8, margin: 8 }]}>
                        <View style={[{ padding: 8 }]}>
                            <Image source={ require('./trash.png') } />
                        </View>
                    </View>
                </Pressable>
            </View>
        );
    };

    const footer = () => {
        return (
            <Pressable onPress={() => addText()}>
                <View style={[Styles.imageView, { minWidth: 44, minHeight: 44, backgroundColor: Colors.app, borderRadius: 8, margin: 8 }]}>
                    <View style={[{ padding: 8 }]}>
                        <Text style={[Styles.text, { color: 'white' }]}>Add Item</Text>
                    </View>
                </View>
            </Pressable>
        );
    };

    return (
        <View style={Styles.tableView}>
            <FlatList renderItem={renderItem} data={data} ListFooterComponent={footer} />
        </View>
    )
};

export default TodoApp;