import React, { useContext, useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	ActivityIndicator,
	Dimensions,
} from "react-native";

import firestore from "@react-native-firebase/firestore";
import { context } from "../state";
import ListBookmarks from "../components/ListBookmarks";

const BookmarkScreen = ({ navigation }: any) => {
	const [bookmark, setBookmark] = useState<any | (() => any)>([]);

	const { state } = useContext(context);
	const userId = state.user?.uid;

	const setBookmarkIfExists = () => {
		firestore()
			.collection("users")
			.doc(userId)
			.get()
			.then((documentSnapshot) => {
				if (documentSnapshot.exists) {
					const data = documentSnapshot.data();
					setBookmark(data?.bookmarks);
				}
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => setBookmarkIfExists(), [bookmark]);

	const deviceHeight = Dimensions.get("window").height;
	const deviceWidth = Dimensions.get("window").width;
	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{bookmark ? (
					<View>
						{bookmark.length === 0 ? (
							<View
								style={{
									height: deviceHeight,
									width: deviceWidth,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Text
									style={{
										color: "#000",
										fontFamily: "SourceSerifPro-SemiBold",
										fontSize: 17,
									}}
								>
									{" "}
									No Bookmarks{" "}
								</Text>
							</View>
						) : (
							bookmark
								.reverse()
								.map((item: any) => (
									<ListBookmarks id={item} key={item} navigation={navigation} />
								))
						)}
					</View>
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
				{/* </View> */}
			</ScrollView>
		</View>
	);
};
const { height } = Dimensions.get("screen");
const height_logo = height * 0.1;
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
		width: undefined,
		height: height_logo * 2.5,
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

export default BookmarkScreen;
