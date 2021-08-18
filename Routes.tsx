import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

interface RoutesProps {}

const Stack = createNativeStackNavigator();
export const Routes: React.FC<RoutesProps> = ({}) => {
	return (
		<View>Hi</View>
		// <NavigationContainer>
		// 	<Stack.Navigator></Stack.Navigator>
		// </NavigationContainer>
	);
};
