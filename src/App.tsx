import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SampleApp from './sample';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import HelloWorld from './01HelloWorld';

const Stack = createNativeStackNavigator();

const Styles = StyleSheet.create({
  tableView: { backgroundColor: "white", flex: 1, paddingTop: 0 },
  tableViewCell: { paddingHorizontal: 20, justifyContent: 'center', height: 44, borderBottomColor: "#eee", borderBottomWidth: 1 },
  text: { fontSize: 17 }
});

const Screens: { name: string; label: string; component: () => Node; }[] = [
  { name: "Sample", label: "React Native Sample", component: SampleApp },
  { name: "HelloWorld", label: "01 - Hello World", component: HelloWorld }
]

const ScreenListItem = ({ name, label, navigation }) => {
  const [isSelected, setIsSelected] = useState(false);
  const backgroundColor = isSelected ? Styles.tableViewCell.borderBottomColor : Styles.tableView.backgroundColor;
  return (<View style={[Styles.tableViewCell, { backgroundColor: backgroundColor }]}>
    <Pressable onPress={() => navigation.navigate(name)} onPressIn={() => setIsSelected(true)} onPressOut={() => setIsSelected(false)}>
      <Text style={Styles.text}>{label}</Text>
    </Pressable>
  </View>);
}

const HomeScreen = ({ navigation }) => {
  return (
    <View style={Styles.tableView}>
      <FlatList data={Screens} renderItem={({ item }) => <ScreenListItem name={item.name} label={item.label} navigation={navigation} />} />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Toolbox' }} />
        <Stack.Screen name="Sample" component={SampleApp} />
        <Stack.Screen name="HelloWorld" component={HelloWorld} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}