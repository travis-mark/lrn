import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { MyButton, useColors, useStyles } from './00_Share';

const Timer = () => {
    const Styles = useStyles();
    const Colors = useColors();
    const [laps, setLaps] = useState([0]);
    const [lastStart, setLastStart] = useState(null);
    const [count, setCount] = useState(0);
    const isActive = lastStart != null;
    const offset = () => {
        return isActive ? (new Date()).getTime() - lastStart.getTime() : 0;
    }
    const start = () => {
        setLastStart(new Date());
    };
    const stop = () => {
        setLaps(laps.slice(0, laps.length - 1).concat(laps[laps.length - 1] + offset()));
        setLastStart(null);
    };
    const lap = () => {
        setLaps(laps.slice(0, laps.length - 1).concat(laps[laps.length - 1] + offset()).concat(0));
        setLastStart(new Date());
    };
    const reset = () => {
        setLaps([0]);
        setLastStart(null);
    };
    const f02 = (n: number) => { return ("" + n).padStart(2, "0"); }
    const format = (ms) => {
        const h = ms > 3600000 ? Math.floor(ms / 3600000) : 0;
        const m = ms % 3600000 > 60000 ? Math.floor(ms % 3600000 / 60000) : 0;
        const s = Math.floor(ms % 60000 / 1000);
        const ss = Math.floor(ms % 1000 / 10);
        if (h > 0) {
            return `${f02(h)}:${f02(m)}:${f02(s)}.${f02(ss)}`
        } else if (m > 0) {
            return `${f02(m)}:${f02(s)}.${f02(ss)}`
        } else {
            return `${f02(s)}.${f02(ss)}`
        }
    }
    useEffect(() => {
        const timer = setInterval(() => {
            if (isActive) {
                setCount(count + 1);
            }
        }, 10);
        return () => clearInterval(timer);
    })
    const mainTime = offset() + laps[laps.length - 1];
    const renderLaps = ({item, index}) => {
        return (<View style={[Styles.tableViewCell, {height: 44, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={Styles.text}>Lap {index + 1}</Text>
            <Text style={Styles.text}>{format(item)}</Text>
        </View>);
    };
    return (<SafeAreaView style={Styles.safeArea}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", height: '100%' }}>
            <Text style={Styles.textLarge}>{format(mainTime)}</Text>
            <View style={[Styles.tableView, {width: '100%'}]}>
                <FlatList renderItem={renderLaps} data={laps.slice(0, laps.length - 1).concat([mainTime]).filter((l) => l > 0)} />
            </View>
            <View style={{ width: '100%', height: 60 }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-around", alignItems: "center" }}>
                    <MyButton style={{ width: '40%', backgroundColor: "green" }} onPress={isActive ? stop : start}>
                        <Text style={[Styles.text, { color: 'white' }]}>{isActive ? 'Stop' : 'Start'}</Text>
                    </MyButton>
                    <MyButton style={{ width: '40%', backgroundColor: "gray" }} onPress={isActive ? lap : reset}>
                        <Text style={[Styles.text, { color: 'white' }]}>{isActive ? 'Lap' : 'Reset'}</Text>
                    </MyButton>
                </View>
            </View>
        </View>
    </SafeAreaView>);
};

export default Timer;