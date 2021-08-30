import React from "react";

import CategoryScreen from "../screens/CategoryScreen";
import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import BookmarkScreen from "../screens/BookmarkScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BlogScreen from "../screens/BlogScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export const HomeScreenNavigator = () => {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen
				name="Category"
				component={CategoryScreen}
				//TODO: If you want to render each category header based on params passed then you have to do typescript typing into the params to access them here
				// options={({ route }) => ({ title: route.params?.category ? route.params.category : "" })}
			/>
			<Stack.Screen
				name="Blog"
				component={BlogScreen}
				options={{ title: "" }}
			/>
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
