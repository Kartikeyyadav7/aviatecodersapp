import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthParamList } from "../types/AuthParamList";
import LoginScreen from "../../screens/LoginScreen";
import SignupScreen from "../../screens/SignupScreen";

interface AuthStackProps {}

const Stack = createNativeStackNavigator<AuthParamList>();

export const AuthStack: React.FC<AuthStackProps> = ({}) => {
	return (
		<NavigationContainer>
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
		</NavigationContainer>
	);
};
