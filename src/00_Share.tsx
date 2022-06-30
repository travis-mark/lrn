import React, { useEffect, useState } from 'react';
import { Appearance, TextInput, View, Image, Pressable } from 'react-native';

interface Palette { app: string; background: string; border: string; destructive: string; error: string; gray: string; label: string; }

const light: Palette = {
    app: "rgb(88,86,214)",
    background: "white",
    border: "#eee",
    destructive: "red",
    error: "red",
    gray: "rgb(108, 108, 112)",
    label: "black",
};

const dark: Palette = {
    app: "rgb(88,86,214)",
    background: "black",
    border: "#eee",
    destructive: "red",
    error: "red",
    gray: "rgb(174, 174, 178)",
    label: "white",
};

const minTappableSize = 48;

const styles = (colors: Palette) => {
    return {
        tableView: { backgroundColor: colors.background, flex: 1, paddingTop: 0 },
        tableViewCell: { paddingHorizontal: 20, justifyContent: 'center', minHeight: minTappableSize, borderBottomColor: colors.border, borderBottomWidth: 1 },
        imageView: { flex: 1, alignItems: 'center', justifyContent: 'center' },
        text: { fontSize: 17, color: colors.label },
        textLarge: { fontSize: 34, color: colors.label },
        textInput: { borderColor: colors.border, borderRadius: 8, borderWidth: 2, color: colors.label, fontSize: 17, minHeight: minTappableSize, padding: 8 },
        textInputFocused: { borderColor: colors.app, borderRadius: 8, borderWidth: 2, color: colors.label, fontSize: 17, minHeight: minTappableSize, padding: 8 },
        safeArea: { flex: 1, paddingTop: -64, backgroundColor: colors.background }
    };
};

function useColors() {
    const initialColors = Appearance.getColorScheme() === "dark" ? dark : light;
    const [colors, setColors] = useState(initialColors);
    const callback = ({colorScheme}: any) => {
        setColors(colorScheme === "dark" ? dark : light);
    }
    useEffect(() => {
        const appearanceSubscription = Appearance.addChangeListener(callback);
        return () => appearanceSubscription.remove();
    });
    return colors;
}

function useStyles() {
    const initialStyle = styles(Appearance.getColorScheme() === "dark" ? dark : light);
    const [style, setStyle] = useState(initialStyle);
    const callback = ({colorScheme}: any) => {
        const style = styles(colorScheme === "dark" ? dark : light);
        setStyle(style);
    }
    useEffect(() => {
        const appearanceSubscription = Appearance.addChangeListener(callback);
        return () => appearanceSubscription.remove();
    });
    return style;
}

const MyTextInput = (props) => {
    const Colors = useColors();
    const Styles = useStyles();
    const [isFocused, setIsFocused] = useState(false);
    const style = isFocused ? Styles.textInputFocused : Styles.textInput;
    return <TextInput selectionColor={Colors.app} {...props} onBlur={() => setIsFocused(false)} onFocus={() => setIsFocused(true)} style={[style, props.style]}>{ props.children}</TextInput>
}

function useIcon(name) {
    const requireIcon = (name: string, isDarkMode: boolean) => {
        if (name == "calendar") { 
            return isDarkMode ? require("../img/calendar-dark.png") : require("../img/calendar.png");
        }
        if (name == "mail") { 
            return isDarkMode ? require("../img/mail-dark.png") : require("../img/mail.png");
        }
        if (name == "person") { 
            return isDarkMode ? require("../img/person-dark.png") : require("../img/person.png");
        }
        if (name == "phone") { 
            return isDarkMode ? require("../img/phone-dark.png") : require("../img/phone.png");
        }
    }
    const isDarkMode = Appearance.getColorScheme() === "dark";
    const [icon, setIcon] = useState(requireIcon(name, isDarkMode));
    const callback = ({colorScheme}: any) => {
        setIcon(requireIcon(name, colorScheme === "dark"));
    }
    useEffect(() => {
        const appearanceSubscription = Appearance.addChangeListener(callback);
        return () => appearanceSubscription.remove();
    });
    return icon;
}

const MyIcon = ({name}) => {
    const icon = useIcon(name);

    return (<View style={{ width: 48, height: 48 }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image style={{ width: 24, height: 24 }} source={ icon } />
        </View>
    </View>);
}

const MyButton = (props) => {
    const Styles = useStyles();
    const Colors = useColors();

    return (<Pressable onPress={props.onPress} style={[{ minWidth: 44, minHeight: 44, backgroundColor: Colors.app, borderRadius: 8, margin: 8 }, props.style]}>
        <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 8 }]}>
            {props.children}
        </View>
    </Pressable>);
}

export { useColors, useStyles, MyTextInput, MyIcon, MyButton };