import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BookmarkScreenProps {}

const BookmarkScreen: React.FC<BookmarkScreenProps> = ({}) => {
	return (
		<View style={styles.container}>
			<Text>Hello from the Bookmark screen</Text>
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

export default BookmarkScreen;
