import React, { useContext, useEffect, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	ScrollView,
	View,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { context } from "../state";

import StatusBarHead from "../components/StatusBarHead";

interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = ({}) => {
	const [profile, setProfile] = useState<any | (() => any)>([]);

	const { state } = useContext(context);

	const userId = state.user?.uid;

	const profileDetails = () => {
		firestore()
			.collection("users")
			.doc(userId)
			.get()
			.then((documentSnapshot) => {
				if (documentSnapshot.exists) {
					setProfile(documentSnapshot.data());
				}
			})
			.catch((error) => console.log(error));
	};

	const deviceHeight = Dimensions.get("window").height;
	const deviceWidth = Dimensions.get("window").width;

	const logout = async () => {
		try {
			await auth().signOut();
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			profileDetails();
		}
		return () => {
			mounted = false;
		};
	}, []);

	return (
		<View style={styles.container}>
			<StatusBarHead />
			{profile ? (
				<View>
					<Image
						style={styles.profileImage}
						source={{ uri: profile.userImg }}
					/>
					<Text style={styles.profileName}>{profile.name}</Text>
					<TouchableOpacity
						onPress={() => {
							logout();
						}}
					>
						<Text style={styles.redirectTextLink}>Logout</Text>
					</TouchableOpacity>
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
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
	},
	redirectTextLink: {
		fontFamily: "SourceSerifPro-SemiBold",
		fontSize: 19,
		color: "purple",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		marginTop: 5,
	},
	profileImage: {
		width: 150,
		height: 150,
		borderRadius: 150 / 2,
		overflow: "hidden",
		borderWidth: 3,
		borderColor: "black",
	},
	profileName: {
		color: "#000",
		fontSize: 19,
		textAlign: "center",
		marginTop: 5,
		fontFamily: "SourceSerifPro-SemiBold",
	},
});

export default ProfileScreen;
