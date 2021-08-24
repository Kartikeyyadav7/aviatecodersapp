import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = ({}) => {
	return (
		<View style={styles.container}>
			<Text>Hello from the Profile screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ProfileScreen;
