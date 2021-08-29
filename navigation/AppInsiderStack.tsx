import React from "react";

import CategoryScreen from "../screens/CategoryScreen";
import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import BookmarkScreen from "../screens/BookmarkScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export const HomeScreenNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="Category" component={CategoryScreen} />
		</Stack.Navigator>
	);
};

export const ExploreScreenNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Explore" component={ExploreScreen} />
		</Stack.Navigator>
	);
};

export const BookmarkScreenNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Bookmark" component={BookmarkScreen} />
		</Stack.Navigator>
	);
};
export const ProfileScreenNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Profile" component={ProfileScreen} />
		</Stack.Navigator>
	);
};
