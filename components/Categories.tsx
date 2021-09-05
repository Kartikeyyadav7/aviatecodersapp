import React from "react";
import {
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
} from "react-native";

const categories = ["Web Development", "Javascript", "React Native"];

const Categories = ({ navigation }: any) => {
	return (
		<ScrollView
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			style={styles.container}
		>
			{categories.map((category, index) => (
				<TouchableOpacity
					key={index}
					onPress={() =>
						navigation.navigate(
							"Category",
							// category,
							{ name: "Custom profile header", category: category }
						)
					}
					style={styles.category}
				>
					<Text style={styles.textStyle}>{category}</Text>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		// paddingBottom: 40,
	},
	textStyle: {
		color: "#000",
		fontSize: 19,
		// paddingTop: 20,
		fontFamily: "SourceSerifPro-Regular",
		height: 28,
	},
	category: {
		borderRadius: 12,
		padding: 10,
		margin: 10,
		backgroundColor: "#ffffff",
		shadowColor: "rgba(22, 15, 19, 0.9)",
		shadowOpacity: 1,
		elevation: 10,
		shadowRadius: 20,
		shadowOffset: { width: 10, height: 15 },
	},
});

export default Categories;
