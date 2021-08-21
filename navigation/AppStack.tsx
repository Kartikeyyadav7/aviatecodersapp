import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppParamList } from "../types/AppParamList";
import HomeScreen from "../screens/HomeScreen";

interface AppStackProps {}

const Stack = createNativeStackNavigator<AppParamList>();

const AppStack: React.FC<AppStackProps> = ({}) => {
	return (
		<Stack.Navigator
			screenOptions={{
				header: () => null,
			}}
			initialRouteName="HomeScreen"
		>
			<Stack.Screen
				// options={{
				//   headerTitle: "Sign In"
				// }}
				name="HomeScreen"
				component={HomeScreen}
			/>
		</Stack.Navigator>
	);
};

export default AppStack;
