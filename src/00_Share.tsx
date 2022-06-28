import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';

const light = {
    app: "rgb(88,86,214)",
    background: "white",
    border: "#eee",
    destructive: "red",
    error: "red",
    label: "black",
};

const dark = {
    app: "rgb(88,86,214)",
    background: "black",
    border: "#eee",
    destructive: "red",
    error: "red",
    label: "white",
};



function useColor(colorName: string) {
    const initialColor = Appearance.getColorScheme() === "dark" ? dark[colorName] : light[colorName];
    const [color, setColor] = useState(initialColor);
    const callback = ({colorScheme}: any) => {
        setColor(colorScheme === "dark" ? dark[colorName] : light[colorName]);
    }
    useEffect(() => {
        const appearanceSubscription = Appearance.addChangeListener(callback);
        return () => appearanceSubscription.remove();
    });
    return color;
}

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

export { useColor, useColors };