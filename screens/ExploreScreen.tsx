import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ExploreScreenProps {}

const ExploreScreen: React.FC<ExploreScreenProps> = ({}) => {
	return (
		<View style={styles.container}>
			<Text>Hello from the Explore screen</Text>
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

export default ExploreScreen;
