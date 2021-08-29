import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	ScrollView,
	Image,
	ActivityIndicator,
	Dimensions,
	StyleSheet,
} from "react-native";
import { client } from "../lib/contentful";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Markdown from "react-native-markdown-display";

const BlogScreen = ({ route }: any) => {
	const [blog, setBlog] = useState<any | (() => any)>([]);
	const { id } = route.params;

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
	let formatedTheformatedDate: any;
	if (blog.fields) {
		const date = new Date(blog.fields.publishedOn);
		const formatedDate = date.toDateString();
		formatedTheformatedDate = formatedDate.slice(4, 19);
	}
	return (
		<View>
			{blog.fields ? (
				<ScrollView>
					<View style={styles.container}>
						<View style={styles.attributeContainer}>
							<Text style={styles.title}>{blog.fields.title}</Text>
							<MaterialIcons name="bookmark-border" color="black" size={26} />
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
