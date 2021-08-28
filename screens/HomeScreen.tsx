import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	Alert,
	ScrollView,
	FlatList,
	Button,
} from "react-native";
import { client } from "../lib/contentful";

const HomeScreen = () => {
	const [blog, setBlog] = useState<any | (() => any)>([]);
	useEffect(() => {
		client
			.getEntries({ content_type: "avaiteCoders" })
			.then((res: any) => {
				res.items.map((items: any) => {
					// items.fields.category;
					// setBlog(items);
					// console.log(items.fields.title);
				});
				const result = res.items;
				setBlog(result);
				// console.log(res.items);
			})
			.catch((err: any) => {
				console.log(err);
			});
	}, []);
	// const renderItem = ({ fields }: any) => (
	// <View style={styles.card}>
	// 	<Text style={styles.title}>{fields.title}</Text>
	// 	<Image
	// 		style={styles.cardImage}
	// 		source={{ uri: `https://${fields.coverImage.fields.file.url}` }}
	// 	/>
	// 	<View style={styles.cardHeader}>
	// 		<View>
	// 			<Text style={styles.description}>{fields.description}</Text>
	// 			<View style={styles.timeContainer}>
	// 				<Text style={styles.time}>{fields.publishedOn}</Text>
	// 				{/* <View style={styles.boomark}> */}
	// 			</View>
	// 		</View>
	// 	</View>
	// </View>
	// <View></View>
	// );

	// console.log(typeof blog);

	return (
		<ScrollView>
			<View style={styles.container}>
				{blog.map((item: any) => (
					<View style={styles.card} key={item.sys.id}>
						<View style={styles.list}>
							<View style={styles.separator}>
								<Text style={styles.title}>{item.fields.title}</Text>
								<Image
									style={styles.cardImage}
									source={{
										uri: `https://${item.fields.coverImage.fields.file.url}`,
									}}
								/>

								<View style={styles.cardHeader}>
									<View>
										<Text style={styles.description}>
											{item.fields.description}
										</Text>
										<View style={styles.timeContainer}>
											<Text style={styles.time}>{item.fields.publishedOn}</Text>
											{/* <View style={styles.boomark}> */}
										</View>
									</View>
								</View>
							</View>
						</View>
					</View>
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		backgroundColor: "#fff",
	},
	list: {
		paddingHorizontal: 17,
		backgroundColor: "#ffffff",
	},
	separator: {
		marginTop: 10,
		borderBottomColor: "#c4bfbe",
		borderBottomWidth: 1,
	},
	card: {
		shadowColor: "#00000021",
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.5,
		shadowRadius: 4,
		marginVertical: 8,
		// backgroundColor: "",
		// borderRadius: 12,
	},
	cardHeader: {
		paddingVertical: 17,
		paddingHorizontal: 16,
		borderTopLeftRadius: 1,
		borderTopRightRadius: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	cardContent: {
		paddingVertical: 12.5,
		paddingHorizontal: 16,
		width: undefined,
	},

	cardImage: {
		height: 150,
		width: undefined,
		marginTop: 15,
	},
	title: {
		fontSize: 18,
	},
	description: {
		fontSize: 15,
		borderTopLeftRadius: 1,
		borderTopRightRadius: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 0,
		color: "#888",
		flex: 1,
		marginTop: 5,
		marginBottom: 5,
		width: undefined,
	},
	time: {
		fontSize: 13,
		color: "#808080",
		marginTop: 5,
	},

	timeContainer: {
		flexDirection: "row",
	},
	bookmark: {
		marginLeft: 45,
	},
});

export default HomeScreen;
