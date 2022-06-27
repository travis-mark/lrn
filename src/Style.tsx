import { StyleSheet } from 'react-native';

const Colors = {
    app: "lightblue",
    background: "white",
    border: "#eee",
    destructive: "red",
    label: "black",
};

const Styles = StyleSheet.create({
    tableView: { backgroundColor: Colors.background, flex: 1, paddingTop: 0 },
    tableViewCell: { paddingHorizontal: 20, justifyContent: 'center', minHeight: 44, borderBottomColor: Colors.border, borderBottomWidth: 1 },
    imageView: { flex: 1, alignItems: 'center', justifyContent: 'center' }, 
    text: { fontSize: 17 },
    textInput: { borderColor: Colors.border, borderRadius: 8, borderWidth: 2, fontSize: 17, minHeight: 44, padding: 8 },
    textInputFocused: { borderColor: Colors.app, borderRadius: 8, borderWidth: 4, fontSize: 17, minHeight: 44, padding: 8 },
});

export { Styles, Colors };