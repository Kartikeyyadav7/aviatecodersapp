import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	ScrollView,
	ActivityIndicator,
	Dimensions,
} from "react-native";
import { client } from "../lib/contentful";
import { formatedDate } from "../lib/date";
import Categories from "../components/Categories";

const HomeScreen = ({ navigation }: any) => {
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
	const deviceHeight = Dimensions.get("window").height;
	const deviceWidth = Dimensions.get("window").width;
	return (
		<View>
			<Categories navigation={navigation} />
			<ScrollView>
				<View style={styles.container}>
					{blog ? (
						blog.map((item: any) => (
							<TouchableOpacity
								key={item.sys.id}
								onPress={() => navigation.navigate("Blog", { id: item.sys.id })}
							>
								<View style={styles.card}>
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
														<Text style={styles.time}>
															{formatedDate(item.fields.publishedOn)}
														</Text>
													</View>
												</View>
											</View>
										</View>
									</View>
								</View>
							</TouchableOpacity>
						))
					) : (
						<ActivityIndicator
							style={{
								height: deviceHeight,
								width: deviceWidth,
								alignItems: "center",
								justifyContent: "center",
							}}
							size="large"
							color="black"
						/>
					)}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
		color: "#000",
	},
	description: {
		fontSize: 15,
		borderTopLeftRadius: 1,
		borderTopRightRadius: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 0,
		color: "#808080",
		flex: 1,
		marginTop: 5,
		marginBottom: 5,
		width: undefined,
	},
	time: {
		fontSize: 13,
		color: "#808080",
		// color: "#000",
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
