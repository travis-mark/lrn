import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SampleApp from './sample';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Colors, Styles } from './Style';
import HelloWorld from './01_Intro';
import CalculatorApp from './02_React';
import TodoApp from './03_Props';
import DogsApp from './04_Image';

// TODO: Clipboard

const Stack = createNativeStackNavigator();

const Screens: { name: string; label: string }[] = [
  { name: "Sample", label: "React Native Sample" },
  { name: "HelloWorld", label: "01 - Hello World" },
  { name: "Calculator", label: "02 - Calculator" },
  { name: "Todo", label: "03 - Todo" },
  { name: "Image", label: "04 - Dogs!" }
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

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.app
  }
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Toolbox' }} />
          <Stack.Screen name="Sample" component={SampleApp} />
          <Stack.Screen name="HelloWorld" component={HelloWorld} />
          <Stack.Screen name="Calculator" component={CalculatorApp} />
          <Stack.Screen name="Todo" component={TodoApp} />
          <Stack.Screen name="Image" component={DogsApp} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}