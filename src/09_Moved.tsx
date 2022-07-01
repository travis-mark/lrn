import React, { useRef, useState, useEffect} from 'react';
import { Text, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { MyButton, useColors, useStyles } from './00_Share';

const BounceBall = () => {
    const Styles = useStyles();
    const Colors = useColors();

    const height = useRef(new Animated.Value(0)).current;
    const anim = Animated.timing(height, { toValue: 1, duration: 1000, useNativeDriver: false  })
    const [finished, setFinished] = useState(true);
    const runBounceAnimation = () => {
        anim.reset();
        setFinished(false);
        anim.start(({finished}) => { setFinished(finished) });
    };

    return (<SafeAreaView style={Styles.safeArea}>
        
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
                <View style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: Colors.app }} />
                <Animated.View style={{ height: height.interpolate({
                    inputRange: [0.0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1.0],
                    outputRange: [0, 218.75, 375.0, 468.75, 500, 468.75, 375.0, 218.75, 0]
                }), width: 50 }} />
            </View>
            <MyButton onPress={finished ? runBounceAnimation : () => {}} style={{ backgroundColor: finished ? Colors.app : Colors.gray }}>
                <Text style={[Styles.text, { color: 'white' }]}>Bounce!</Text>
            </MyButton>
        </View>
    </SafeAreaView>);
};

export default BounceBall;