import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';

interface Palette { app: string; background: string; border: string; destructive: string; error: string; label: string; }

const light: Palette = {
    app: "rgb(88,86,214)",
    background: "white",
    border: "#eee",
    destructive: "red",
    error: "red",
    label: "black",
};

const dark: Palette = {
    app: "rgb(88,86,214)",
    background: "black",
    border: "#eee",
    destructive: "red",
    error: "red",
    label: "white",
};

const styles = (colors: Palette) => {
    return {
        tableView: { backgroundColor: colors.background, flex: 1, paddingTop: 0 },
        tableViewCell: { paddingHorizontal: 20, justifyContent: 'center', minHeight: 44, borderBottomColor: colors.border, borderBottomWidth: 1 },
        imageView: { flex: 1, alignItems: 'center', justifyContent: 'center' },
        text: { fontSize: 17, color: colors.label },
        textInput: { borderColor: colors.border, borderRadius: 8, borderWidth: 2, fontSize: 17, minHeight: 44, padding: 8 },
        textInputFocused: { borderColor: colors.app, borderRadius: 8, borderWidth: 2, fontSize: 17, minHeight: 44, padding: 8 },
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

export { useColors, useStyles };