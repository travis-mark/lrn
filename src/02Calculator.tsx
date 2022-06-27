import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Styles } from './Style';

const CalculatorButton = ({name, style, onPress}) => {
    const [isSelected, setIsSelected] = useState(false);
    const buttonBackgroundColor = isSelected ? Colors.label : Colors.background;
    const buttonForegroundColor = isSelected ? Colors.background : Colors.label;
    return (
        <Pressable style={[{ height: 44, width: 44 }, style]} onPress={() => onPress(name)} onPressIn={() => setIsSelected(true)} onPressOut={() => setIsSelected(false)}>
            <View style={{ position: "absolute", top: "5%", left: "5%", height: "90%", width: "90%", backgroundColor: "black" }} />
            <View style={{ position: "absolute", height: "90%", width: "90%", backgroundColor: buttonBackgroundColor }}>
                <Text style={[Styles.text, { padding: 8, color: buttonForegroundColor }]}>{name}</Text>
            </View>
        </Pressable>
    
    );
}

const CalculatorApp = () => {
    const [value, setValue] = useState([]);
    const push = (button) => {
        if (button == "C") {
            setValue("");
        } else if (button == "=") {
            setValue(eval(value));
        } else {
            setValue(value + button);
        }
    };
    return (    
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <View style={{ flexGrow: 1, backgroundColor: Colors.background, borderColor: Colors.label, borderWidth: 1, flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text style={[Styles.text, { padding: 8, color: Colors.label }]}>{value}</Text>
            </View>
            <View style={{padding: 8}}></View>
            <View style={{ flexGrow: 1 }}>
                <CalculatorButton name="C" style={{ position: 'absolute', top: '00%', left: '00%', height: '20%', width: '25%' }} onPress={push} />
                <CalculatorButton name="=" style={{ position: 'absolute', top: '00%', left: '25%', height: '20%', width: '25%' }} onPress={push} />
                <CalculatorButton name="/" style={{ position: 'absolute', top: '00%', left: '50%', height: '20%', width: '25%' }} onPress={push} />
                <CalculatorButton name="*" style={{ position: 'absolute', top: '00%', left: '75%', height: '20%', width: '25%' }} onPress={push} />
                <CalculatorButton name="7" style={{ position: 'absolute', top: '20%', left: '00%', height: '20%', width: '25%' }} onPress={push} />
                <CalculatorButton name="8" style={{ position: 'absolute', top: '20%', left: '25%', height: '20%', width: '25%' }} onPress={push} />
                <CalculatorButton name="9" style={{ position: 'absolute', top: '20%', left: '50%', height: '20%', width: '25%' }} onPress={push} />
                <CalculatorButton name="-" style={{ position: 'absolute', top: '20%', left: '75%', height: '20%', width: '25%' }} onPress={push} />
                <CalculatorButton name="4" style={{ position: 'absolute', top: '40%', left: '00%', height: '20%', width: '25%' }} onPress={push} />
                <CalculatorButton name="5" style={{ position: 'absolute', top: '40%', left: '25%', height: '20%', width: '25%' }} onPress={push} />
                <CalculatorButton name="6" style={{ position: 'absolute', top: '40%', left: '50%', height: '20%', width: '25%' }} onPress={push} />
                <CalculatorButton name="+" style={{ position: 'absolute', top: '40%', left: '75%', height: '20%', width: '25%' }} onPress={push} />
                <CalculatorButton name="1" style={{ position: 'absolute', top: '60%', left: '00%', height: '20%', width: '25%' }} onPress={push} />
                <CalculatorButton name="2" style={{ position: 'absolute', top: '60%', left: '25%', height: '20%', width: '25%' }} onPress={push} />
                <CalculatorButton name="3" style={{ position: 'absolute', top: '60%', left: '50%', height: '20%', width: '25%' }} onPress={push} />
                <CalculatorButton name="=" style={{ position: 'absolute', top: '60%', left: '75%', height: '40%', width: '25%' }} onPress={push} />
                <CalculatorButton name="0" style={{ position: 'absolute', top: '80%', left: '00%', height: '20%', width: '50%' }} onPress={push} />
                <CalculatorButton name="." style={{ position: 'absolute', top: '80%', left: '50%', height: '20%', width: '25%' }} onPress={push} />
            </View>
        </SafeAreaView>
    )
};

export default CalculatorApp;