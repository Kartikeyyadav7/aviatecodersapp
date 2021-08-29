import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import {
	HomeScreenNavigator,
	BookmarkScreenNavigator,
	ExploreScreenNavigator,
	ProfileScreenNavigator,
} from "./AppInsiderStack";

const Tab = createMaterialBottomTabNavigator();

function AppStack() {
	return (
		<Tab.Navigator
			initialRouteName="HomeScreen"
			activeColor="#000"
			barStyle={{
				backgroundColor: "#fff",
				shadowRadius: 2,
				shadowOffset: {
					width: 0,
					height: -3,
				},
				shadowColor: "#000000",
				elevation: 4,
			}}
		>
			<Tab.Screen
				name="HomeScreen"
				component={HomeScreenNavigator}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ color }) => (
						<MaterialIcons name="home" color={color} size={26} />
					),
					title: "Home",
				}}
			/>
			<Tab.Screen
				name="ExploreScreen"
				component={ExploreScreenNavigator}
				options={{
					tabBarLabel: "Search",
					tabBarIcon: ({ color }) => (
						<MaterialIcons name="search" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="BookMarkScreen"
				component={BookmarkScreenNavigator}
				options={{
					tabBarLabel: "Bookmarks",
					tabBarIcon: ({ color }) => (
						<MaterialIcons name="bookmark-border" color={color} size={26} />
					),
				}}
			/>
			<Tab.Screen
				name="ProfileScreen"
				component={ProfileScreenNavigator}
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
