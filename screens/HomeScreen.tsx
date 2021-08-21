import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";

interface HomeScreenProps {}

const logout = async () => {
	try {
		await auth().signOut();
	} catch (e) {
		console.log(e);
	}
};

const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
	return (
		<View style={styles.container}>
			<Text>Hello from the inside</Text>
			<TouchableOpacity
				onPress={() => {
					logout();
				}}
			>
				<Text style={styles.redirectTextLink}>Logout</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	redirectTextLink: {
		fontFamily: `Adamina-Regular`,
		fontSize: 18,
		color: "purple",
	},
});

export default HomeScreen;
