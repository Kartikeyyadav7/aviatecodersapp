import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthParamList } from "../types/AuthParamList";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { NavigationContainer } from "@react-navigation/native";

interface AuthStackProps {}

const Stack = createNativeStackNavigator<AuthParamList>();

const AuthStack: React.FC<AuthStackProps> = ({}) => {
	useEffect(() => {
		GoogleSignin.configure({
			webClientId:
				"117683662084-1r32h7r8jm18gno47q727m40cnp5qfed.apps.googleusercontent.com",
		});
	}, []);
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
