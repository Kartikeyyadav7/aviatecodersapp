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
	StatusBar,
} from "react-native";
import { client } from "../lib/contentful";
import { formatedDate } from "../lib/date";
import Categories from "../components/Categories";
import StatusBarHead from "../components/StatusBarHead";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const HomeScreen = ({ navigation }: any) => {
	const [blog, setBlog] = useState<any | (() => any)>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		client
			.getEntries({ content_type: "avaiteCoders" })
			.then((res: any) => {
				const result = res.items;
				setBlog(result);
				setLoading(false);
			})
			.catch((err: any) => {
				console.log(err);
			});
	}, []);

	const deviceHeight = Dimensions.get("window").height;
	const deviceWidth = Dimensions.get("window").width;

	return (
		<View>
			<StatusBarHead />
			<Categories navigation={navigation} />
			{loading ? (
				<ScrollView
					// style={{ flex: 1 }}
					contentContainerStyle={{ alignItems: "center", marginHorizontal: 20 }}
				>
					<SkeletonPlaceholder>
						<View
							style={{
								marginTop: 10,
								marginBottom: 30,
							}}
						>
							<View
								style={{
									marginTop: 15,
									width: 200,
									height: 20,
									borderRadius: 4,
								}}
							/>
							<View
								style={{
									marginVertical: 5,
									width: undefined,
									height: 200,
									borderRadius: 4,
								}}
							/>
							<View
								style={{
									width: 300,
									height: 20,
									borderRadius: 4,
									marginTop: 3,
								}}
							/>
						</View>
					</SkeletonPlaceholder>
					<SkeletonPlaceholder>
						<View
							style={{
								marginTop: 10,
								marginBottom: 30,
							}}
						>
							<View
								style={{
									marginTop: 15,
									width: 200,
									height: 20,
									borderRadius: 4,
								}}
							/>
							<View
								style={{
									marginVertical: 5,
									width: undefined,
									height: 200,
									borderRadius: 4,
								}}
							/>
							<View
								style={{
									width: 300,
									height: 20,
									borderRadius: 4,
									marginTop: 3,
								}}
							/>
						</View>
					</SkeletonPlaceholder>
				</ScrollView>
			) : (
				<ScrollView
					contentContainerStyle={styles.scrollContainer}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.container}>
						{blog ? (
							blog.map((item: any) => (
								<View key={item.sys.id}>
									<TouchableOpacity
										key={item.sys.id}
										onPress={() =>
											navigation.navigate("Blog", { id: item.sys.id })
										}
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
								</View>
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
			)}
		</View>
	);
};

const { height } = Dimensions.get("screen");
const height_logo = height * 0.1;

const styles = StyleSheet.create({
	scrollContainer: {
		marginVertical: 1,
	},
	container: {
		backgroundColor: "#fff",
		paddingBottom: 45,
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
		// height: 150,
		width: undefined,
		height: height_logo * 2.5,
		marginTop: 15,
		// width: height_logo,
		resizeMode: "contain",
	},
	title: {
		fontSize: 19,
		color: "#000",
		fontFamily: "SourceSerifPro-SemiBold",
	},
	description: {
		fontSize: 16,
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
		fontFamily: "SourceSerifPro-Regular",
	},
	time: {
		fontSize: 14,
		color: "#808080",
		// color: "#000",
		marginTop: 5,
		fontFamily: "SourceSerifPro-Regular",
	},

	timeContainer: {
		flexDirection: "row",
	},
	bookmark: {
		marginLeft: 45,
	},
});

export default HomeScreen;
