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
					if (data?.bookmarks === null) {
						firestore()
							.collection("users")
							.doc(userId)
							.update({ bookmarks: firestore.FieldValue.arrayUnion(id) })
							.then(() => {
								console.log("User bookmark updated!");
								setIsBookmark(true);
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
								})
								.catch((error) => console.log(error));
						} else {
							firestore()
								.collection("users")
								.doc(userId)
								.update({ bookmarks: firestore.FieldValue.arrayUnion(id) })
								.then(() => {
									setIsBookmark(true);
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

	useEffect(() => checkIfBookmarkExists(), []);
	return (
		<View>
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
									body: { color: "#000", fontSize: 15 },
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
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		marginHorizontal: 12,
		paddingTop: 10,
	},
	title: {
		color: "#000",
		fontSize: 19,
		fontWeight: "700",
	},
	attributeContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		// marginTop: 6,
	},
	attribute: {
		flexDirection: "row",

		marginTop: 6,
	},
	author: {
		color: "#000",
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
		height: 150,
		width: undefined,
		marginTop: 15,
	},
});

export default BlogScreen;
