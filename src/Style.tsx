import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    tableView: { backgroundColor: "white", flex: 1, paddingTop: 0 },
    tableViewCell: { paddingHorizontal: 20, justifyContent: 'center', height: 44, borderBottomColor: "#eee", borderBottomWidth: 1 },
    text: { fontSize: 17 }
});

const Colors = {
    background: "white",
    label: "black",
};

export { Styles, Colors };