import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import {
	View,
	Text,
	TextInput,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import StatusBarHead from "../components/StatusBarHead";
import { client } from "../lib/contentful";

const ExploreScreen = ({ navigation }: any) => {
	const [search, setSearch] = useState("");

	const [blog, setBlog] = useState<any | (() => any)>([]);

	useEffect(() => {
		client
			.getEntries({ content_type: "avaiteCoders" })
			.then((res: any) => {
				const result = res.items;
				setBlog(result);
			})
			.catch((err: any) => {
				console.log(err);
			});
	}, []);

	const filterList = (list: any) => {
		return list.filter((listItem: any) =>
			listItem.fields.title.toLowerCase().includes(search.toLowerCase())
		);
	};

	return (
		<View style={styles.container}>
			<StatusBarHead />
			<TextInput
				onChangeText={(search) => setSearch(search)}
				style={styles.searchBar}
				placeholder=" Search Here"
			/>
			<ScrollView showsVerticalScrollIndicator={false}>
				{filterList(blog).map((listItem: any, index: any) => (
					<TouchableOpacity
						style={styles.itemTextContainer}
						onPress={() =>
							navigation.navigate("HomeScreen", {
								screen: "Blog",
								params: { id: listItem.sys.id },
							})
						}
						key={index}
					>
						<Text style={styles.itemText}>{listItem.fields.title}</Text>
						<View style={styles.separator}></View>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	searchBar: {
		fontSize: 17,
		margin: 10,
		width: "90%",
		// height: 50,
		backgroundColor: "#F1F0F1",
		borderRadius: 12,
	},
	itemTextContainer: {
		width: `100%`,
		marginTop: 20,

		marginBottom: 5,
	},
	separator: {
		padding: 12,
		borderBottomColor: "#c4bfbe",
		borderBottomWidth: 1,
	},
	itemText: {
		textAlign: "center",
		fontSize: 17,
		color: "#000",
	},
});

export default ExploreScreen;
