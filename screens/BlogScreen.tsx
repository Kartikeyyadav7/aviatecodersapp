import React, { useContext, useEffect, useState } from "react";
import {
	View,
	Text,
	ScrollView,
	Image,
	ActivityIndicator,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { client } from "../lib/contentful";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Markdown from "react-native-markdown-display";
import firestore from "@react-native-firebase/firestore";
import { context } from "../state";
import StatusBarHead from "../components/StatusBarHead";
import { Root, Popup } from "react-native-popup-confirm-toast";

const BlogScreen = ({ route }: any) => {
	const [blog, setBlog] = useState<any | (() => any)>([]);
	const [isBookmark, setIsBookmark] = useState(false);
	const { id } = route.params;
	const { state } = useContext(context);
	const userId = state.user?.uid;
	useEffect(() => {
		client
			.getEntry(id)
			.then((entry: any) => {
				setBlog(entry);
			})
			.catch(console.error);
	}, []);

	const deviceHeight = Dimensions.get("window").height;
	const deviceWidth = Dimensions.get("window").width;

	const bookmarkBlog = () => {
		firestore()
			.collection("users")
			.doc(userId)
			.get()
			.then((documentSnapshot) => {
				if (documentSnapshot.exists) {
					const data = documentSnapshot.data();
					if (data?.bookmarks === []) {
						firestore()
							.collection("users")
							.doc(userId)
							.update({ bookmarks: firestore.FieldValue.arrayUnion(id) })
							.then(() => {
								console.log("User bookmark updated!");
								setIsBookmark(true);
								const popup = Popup;
								popup.show({
									type: "confirm",
									title: "Bookmark Added",
									iconEnabled: false,
									timing: 2000,
									titleTextStyle: {
										fontFamily: "SourceSerifPro-Regular",
									},
									buttonEnabled: false,
									confirmText: false,
									modalContainerStyle: {
										width: "70%",
										backgroundColor: "#fff",
										borderRadius: 8,
										alignItems: "center",
										overflow: "hidden",
										position: "absolute",
										height: 67,
									},
								});
							})
							.catch((error) => console.log(error));
					} else {
						const bookmarkExists = data?.bookmarks.includes(id);

						if (bookmarkExists) {
							firestore()
								.collection("users")
								.doc(userId)
								.update({ bookmarks: firestore.FieldValue.arrayRemove(id) })
								.then(() => {
									setIsBookmark(false);
									const popup = Popup;
									popup.show({
										type: "confirm",
										title: "Bookmark Removed",
										iconEnabled: false,
										timing: 2000,
										buttonEnabled: false,
										confirmText: false,
										modalContainerStyle: {
											width: "70%",
											backgroundColor: "#fff",
											borderRadius: 8,
											alignItems: "center",
											overflow: "hidden",
											position: "absolute",
											height: 67,
										},
									});
								})
								.catch((error) => console.log(error));
						} else {
							firestore()
								.collection("users")
								.doc(userId)
								.update({ bookmarks: firestore.FieldValue.arrayUnion(id) })
								.then(() => {
									setIsBookmark(true);
									const popup = Popup;
									popup.show({
										type: "confirm",
										title: "Bookmark Added",
										iconEnabled: false,
										timing: 2000,
										buttonEnabled: false,
										confirmText: false,
										modalContainerStyle: {
											width: "70%",
											backgroundColor: "#fff",
											borderRadius: 8,
											alignItems: "center",
											overflow: "hidden",
											position: "absolute",
											height: 67,
										},
									});
								})
								.catch((error) => console.log(error));
						}
					}
				}
			})
			.catch((error) => console.log(error));
	};

	const checkIfBookmarkExists = () => {
		firestore()
			.collection("users")
			.doc(userId)
			.get()
			.then((documentSnapshot) => {
				if (documentSnapshot.exists) {
					const data = documentSnapshot.data();
					if (data?.bookmarks === []) {
						setIsBookmark(false);
					} else {
						const bookmarkExists = data?.bookmarks.includes(id);
						if (bookmarkExists) {
							setIsBookmark(true);
						} else {
							setIsBookmark(false);
						}
					}
				}
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			checkIfBookmarkExists();
		}
		return () => {
			mounted = false;
		};
	}, []);

	return (
		<Root>
			<View style={{ backgroundColor: "#fff" }}>
				<StatusBarHead />
				{blog.fields ? (
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={styles.container}>
							<View style={styles.attributeContainer}>
								<Text style={styles.title}>{blog.fields.title}</Text>
								<TouchableOpacity
									onPress={() => {
										bookmarkBlog();
									}}
								>
									{isBookmark ? (
										<MaterialIcons name="bookmark" color="black" size={26} />
									) : (
										<MaterialIcons
											name="bookmark-border"
											color="black"
											size={26}
										/>
									)}
								</TouchableOpacity>
							</View>
							<View>
								<View style={styles.attribute}>
									<Text style={styles.author}>By {blog.fields.author}</Text>
									{/* <Text style={styles.date}>{formatedTheformatedDate}</Text> */}
								</View>
							</View>
							<Image
								style={styles.cardImage}
								source={{
									uri: `https://${blog.fields.coverImage.fields.file.url}`,
								}}
							/>
							<View style={styles.separator}></View>
							<View style={styles.blog}>
								<Markdown
									style={{
										body: {
											color: "#000",
											fontSize: 16,
											fontFamily: "SourceSerifPro-Regular",
											lineHeight: 20,
										},
										// heading1: {color: 'purple'},
										code_block: {
											backgroundColor: "#000",
											color: "#fff",
											fontSize: 14,
										},
									}}
								>
									{blog.fields.blogContent}
								</Markdown>
							</View>
						</View>
					</ScrollView>
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
		</Root>
	);
};
const { height } = Dimensions.get("screen");
const height_logo = height * 0.1;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		marginHorizontal: 12,
		paddingTop: 10,
	},
	title: {
		color: "#000",
		fontSize: 20,
		// fontWeight: "700",
		fontFamily: "SourceSerifPro-SemiBold",
	},
	attributeContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	attribute: {
		flexDirection: "row",
		marginTop: 6,
	},
	author: {
		color: "#000",
		fontSize: 15,
		fontFamily: "SourceSerifPro-Regular",
	},
	separator: {
		marginTop: 10,
		borderBottomColor: "#c4bfbe",
		borderBottomWidth: 1,
	},
	date: {
		paddingLeft: 5,
		color: "#000",
	},
	blog: {
		marginTop: 2,
	},
	cardImage: {
		width: undefined,
		height: height_logo * 2.5,
		marginTop: 15,
	},
});

export default BlogScreen;
