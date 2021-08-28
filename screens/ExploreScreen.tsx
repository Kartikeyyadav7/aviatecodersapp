import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";

interface ExploreScreenProps {}

const logout = async () => {
	try {
		await auth().signOut();
	} catch (e) {
		console.log(e);
	}
};

const ExploreScreen: React.FC<ExploreScreenProps> = ({}) => {
	return (
		<View style={styles.container}>
			{/* <ScrollView
	  contentInsetAdjustmentBehavior="automatic"
	  style={{height: '100%'}}
	>
	  <Markdown>
		{posts}
	  </Markdown>
	</ScrollView>	 */}
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
export default ExploreScreen;
