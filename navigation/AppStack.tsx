import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import BookmarkScreen from "../screens/BookmarkScreen";
import ExploreScreen from "../screens/ExploreScreen";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createMaterialBottomTabNavigator();

function AppStack() {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			activeColor="#000"
			barStyle={{ backgroundColor: "white" }}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ color }) => (
						<MaterialIcons name="home" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Search"
				component={ExploreScreen}
				options={{
					tabBarLabel: "Search",
					tabBarIcon: ({ color }) => (
						<MaterialIcons name="search" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="BookMark"
				component={BookmarkScreen}
				options={{
					tabBarLabel: "Bookmarks",
					tabBarIcon: ({ color }) => (
						<MaterialIcons name="bookmark-border" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarLabel: "Profile",
					tabBarIcon: ({ color }) => (
						<MaterialIcons name="person" color={color} size={26} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

export default AppStack;
