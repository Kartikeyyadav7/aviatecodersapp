import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthParamList } from "../types/AuthParamList";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";

interface AuthStackProps {}

const Stack = createNativeStackNavigator<AuthParamList>();

const AuthStack: React.FC<AuthStackProps> = ({}) => {
	return (
		<Stack.Navigator
			screenOptions={{
				header: () => null,
			}}
			initialRouteName="SignupScreen"
		>
			<Stack.Screen
				// options={{
				//   headerTitle: "Sign In"
				// }}
				name="LoginScreen"
				component={LoginScreen}
			/>
			<Stack.Screen
				// options={{
				//   headerTitle: "Sign Up"
				// }}
				name="SignupScreen"
				component={SignupScreen}
			/>
		</Stack.Navigator>
	);
};

export default AuthStack;
