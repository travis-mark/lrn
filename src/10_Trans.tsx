import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, Image, Pressable, Text, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyTextInput, useColors, useStyles } from './00_Share';

let todos = [
    { text: "Item 1", complete: false },
    { text: "Item 2", complete: false },
    { text: "Item 3", complete: false },
    { }
];



export const TodoApp2 = () => {
    const [data, setData] = useState(todos);
    const [anim, setAnim] = useState({});
    const Styles = useStyles();
    const Colors = useColors();

    const addText = () => {
        const newObject = {}
        todos = data.concat([newObject]);
        setData(todos);
    };

    const setText = (index: number, text: string) => {
        const newObject = Object.assign({}, data[index], {text: text});
        todos = data.slice(0, index).concat([newObject]).concat(data.slice(index+1, data.length));
        setData(todos);
    };

    const delText = (index: number) => {
        todos = data.slice(0, index).concat(data.slice(index+1, data.length));
        let newAnim = Object.assign({}, anim); 
        newAnim[index] = 'delete';
        setAnim(newAnim);
    }

    const FadeOutView = (props) => {
        const fadeAnim = useRef(new Animated.Value(1)).current
      
        useEffect(() => {
          Animated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }).start(({finished}) => {
            setData(todos);
            let newAnim = Object.assign({}, anim); 
            newAnim[props.index] = undefined;
            setAnim(newAnim);
          });
        }, [fadeAnim])
      
        return (
          <Animated.View style={{...props.style, opacity: fadeAnim }}>
            {props.children}
          </Animated.View>
        );
    }

    const renderItem = ({ item, index }) => {
        const renderBase = () => {
            return (<View style={[Styles.tableViewCell, {flex: 1, flexDirection: 'row', paddingHorizontal: 8}]}>
                <MyTextInput onChangeText={newText => setText(index, newText)} placeholder='Add Todo' style={{flexGrow: 1, margin: 8}}>{ item.text }</MyTextInput>
                <Pressable onPress={() => delText(index)}>
                    <View style={[ Styles.imageView, { minWidth: 44, minHeight: 44, backgroundColor: Colors.destructive, borderRadius: 8, margin: 8 }]}>
                        <View style={[{ padding: 8 }]}>
                            <Image source={ require('./trash.png') } />
                        </View>
                    </View>
                </Pressable>
            </View>);
        }
        return anim[index] === 'complete' ? <FadeOutView index={index}>{renderBase()}</FadeOutView> : renderBase();
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

    return (<SafeAreaView style={Styles.safeArea}>
        <View style={Styles.tableView}>
            <FlatList renderItem={renderItem} data={data} ListFooterComponent={footer} />
        </View>
    </SafeAreaView>);
};