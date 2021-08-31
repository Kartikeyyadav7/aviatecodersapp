import React, { useState } from "react";
import { TextInput, TextStyle, TouchableOpacity } from "react-native";
import { ImageStyle } from "react-native";
import {
	StyleSheet,
	Text,
	View,
	ViewStyle,
	Image,
	Dimensions,
	SafeAreaView,
	ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import auth from "@react-native-firebase/auth";
import { AuthNavProps } from "../types/AuthParamList";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import firestore from "@react-native-firebase/firestore";
import StatusBarHead from "../components/StatusBarHead";
import { Root, Popup } from "react-native-popup-confirm-toast";

//TODO: Check if the user already exists then throw error

const SignupScreen = ({ navigation }: AuthNavProps<"SignupScreen">) => {
	const [data, setdata] = useState({
		name: "",
		email: "",
		password: "",
	});

	const emailInputChange = (val: string) => {
		if (val.length !== 0) {
			setdata({
				...data,
				email: val,
			});
		}
	};
	const nameInputChange = (val: string) => {
		if (val.length !== 0) {
			setdata({
				...data,
				name: val,
			});
		} else {
			setdata({
				...data,
				name: val,
			});
		}
	};

	const handlePasswordChange = (val: string) => {
		setdata({
			...data,
			password: val,
		});
	};

	const register = async (email: string, password: string) => {
		try {
			await auth()
				.createUserWithEmailAndPassword(email, password)
				.then(() => {
					firestore()
						.collection("users")
						.doc(auth().currentUser?.uid)
						.set({
							name: data.name,
							email: email,
							createdAt: firestore.Timestamp.fromDate(new Date()),
							userImg: null,
							bookmarks: [],
						})
						.catch((error) => {
							// console.log(
							// 	"Something went wrong with added user to firestore: ",
							// 	error
							// );
							Popup.show({
								type: "warning",
								title: "Error creating account",
								callback: () => Popup.hide(),
								timing: 0,
								okButtonStyle: { backgroundColor: "#1E2E46" },
							});
						});
				})
				.catch((error) => {
					Popup.show({
						type: "warning",
						title: "Error creating account",
						callback: () => Popup.hide(),
						timing: 0,
						okButtonStyle: { backgroundColor: "#1E2E46" },
					});
				});
		} catch (e) {
			console.log(e);
		}
	};

	const googleSignup = async () => {
		try {
			const { idToken } = await GoogleSignin.signIn();

			const userGoogleDetails = await GoogleSignin.getCurrentUser();

			const googleCredential = auth.GoogleAuthProvider.credential(idToken);

			await firestore()
				.collection("users")
				.get()
				.then((querySnapshot) => {
					let existingUserEmail: any = [];
					querySnapshot.forEach((documentSnapshot) => {
						existingUserEmail.push(documentSnapshot.data().email);
					});

					if (existingUserEmail.includes(userGoogleDetails?.user.email)) {
						Popup.show({
							type: "warning",
							title: "Account already exists , please login",
							callback: () => Popup.hide(),
							timing: 0,
							okButtonStyle: { backgroundColor: "#1E2E46" },
						});
						// console.log("Please login");
					} else {
						return auth()
							.signInWithCredential(googleCredential)
							.then(() => {
								firestore()
									.collection("users")
									.doc(auth().currentUser?.uid)
									.set({
										name: auth().currentUser?.displayName,
										email: auth().currentUser?.email,
										createdAt: firestore.Timestamp.fromDate(new Date()),
										userImg: auth().currentUser?.photoURL,
										bookmarks: [],
									})
									.catch((error) => {
										console.log(
											"Something went wrong with added user to firestore: ",
											error
										);
									});
							})
							.catch((error) => {
								console.log("Something went wrong with sign up: ", error);
							});
					}
				});
		} catch (error) {
			console.log(error);
		}
	};

	const fbSignup = async () => {
		try {
			const result = await LoginManager.logInWithPermissions([
				"public_profile",
				"email",
			]);

			if (result.isCancelled) {
				throw "User cancelled the login process";
			}

			const data = await AccessToken.getCurrentAccessToken();

			if (!data) {
				throw "Something went wrong obtaining access token";
			}

			const facebookCredential = auth.FacebookAuthProvider.credential(
				data.accessToken
			);

			await auth()
				.signInWithCredential(facebookCredential)
				.then(() => {
					firestore()
						.collection("users")
						.doc(auth().currentUser?.uid)
						.set({
							name: auth().currentUser?.displayName,
							email: auth().currentUser?.email,
							createdAt: firestore.Timestamp.fromDate(new Date()),
							userImg: auth().currentUser?.photoURL,
							bookmarks: [],
						})
						.catch((error) => {
							console.log(
								"Something went wrong with added user to firestore: ",
								error
							);
						});
				})
				.catch((error) => {
					console.log("Something went wrong with sign up: ", error);
				});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Root>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.container}
			>
				<StatusBarHead />
				{/* <View style={styles.container}> */}
				<View style={styles.header}>
					<Image source={require("../assets/logo.png")} style={styles.logo} />
					<Text style={styles.logoText}>Aviate Coders </Text>
				</View>

				<Text style={styles.mainText}>Become An Aviated Coder</Text>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						onPress={() => googleSignup()}
						style={styles.googleButton}
					>
						<Image
							source={require("../assets/google.png")}
							style={styles.googleIcon}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => fbSignup()}
						style={styles.googleButton}
					>
						<FontAwesome name="facebook" size={24} color="#4866AB" />
					</TouchableOpacity>
				</View>
				<TextInput
					style={styles.input}
					placeholder="Name"
					onChangeText={(val) => nameInputChange(val)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					// secureTextEntry={true}
					autoCapitalize="none"
					onChangeText={(val) => handlePasswordChange(val)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Email"
					onChangeText={(val) => emailInputChange(val)}
				/>
				<TouchableOpacity
					style={styles.signupButton}
					onPress={() => register(data.email, data.password)}
				>
					<Text style={styles.btnText}>Sign up</Text>
				</TouchableOpacity>
				<View style={styles.divider} />
				<View style={styles.row}>
					<Text style={styles.redirectText}>Already have an account?</Text>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("LoginScreen");
						}}
					>
						<Text style={styles.redirectTextLink}>Login</Text>
					</TouchableOpacity>
				</View>
				{/* </View> */}
			</ScrollView>
		</Root>
	);
};

interface Styles {
	container: ViewStyle;
	logo: ImageStyle;
	header: ViewStyle;
	logoText: TextStyle;
	googleButton: ViewStyle;
	googleIcon: ImageStyle;
	divider: ViewStyle;
	mainText: TextStyle;
	buttonContainer: ViewStyle;
	input: ViewStyle;
	signupButton: ViewStyle;
	btnText: ViewStyle;
	redirectText: TextStyle;
	redirectTextLink: ViewStyle;
	row: ViewStyle;
}

const { height } = Dimensions.get("screen");
const height_logo = height * 0.1;

const styles = StyleSheet.create<Styles>({
	container: {
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
		paddingTop: 50,
		// backgroundColor: "#fff",
	},
	logo: {
		height: height_logo * 0.6,
		width: height_logo,
		resizeMode: "contain",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
	},
	logoText: {
		fontFamily: "Adamina-Regular",
		fontWeight: "500",
		fontSize: 22,
		color: "black",
	},
	googleButton: {
		width: 131,
		height: 54,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
		backgroundColor: "#ffffff",
		padding: 10,
		shadowColor: "rgba(22, 15, 19, 0.9)",
		// shadowColor: "rgba(0, 0, 0, 0.1)",
		shadowOpacity: 0.5,
		elevation: 10,
		shadowRadius: 20,
		shadowOffset: { width: 10, height: 15 },
	},
	googleIcon: {
		height: height_logo * 0.3,
		width: height_logo,
		resizeMode: "contain",
	},

	mainText: {
		fontFamily: "Adamina-Regular",
		fontWeight: "500",
		fontSize: 25,
		marginTop: 50,
		color: "black",
	},
	buttonContainer: {
		marginTop: 50,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: `80%`,
	},
	input: {
		width: `80%`,
		fontSize: 16,
		fontFamily: "Adamina-Regular",
		borderRadius: 12,
		backgroundColor: "#ffffff",
		padding: 15,
		shadowColor: "rgba(0, 0, 0, 0.1)",
		shadowOpacity: 0.5,
		elevation: 10,
		shadowRadius: 20,
		shadowOffset: { width: 10, height: 15 },
		marginTop: 40,
		color: "black",
	},
	signupButton: {
		width: `80%`,
		backgroundColor: "#1E2E46",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
		marginTop: 40,
		padding: 12,
	},
	btnText: {
		textAlign: "center",
		fontSize: 23,
		fontFamily: `Adamina-Regular`,
		color: "#fff",
	},
	divider: {
		borderWidth: 0.5,
		borderColor: "black",
		margin: 10,
	},
	redirectText: {
		fontSize: 18,
		fontFamily: `Adamina-Regular`,
		color: "black",
		textAlign: "center",
		paddingRight: 5,
	},
	redirectTextLink: {
		fontFamily: `Adamina-Regular`,
		fontSize: 18,
		color: "purple",
		paddingLeft: 1,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		// width: "70%",
	},
});

export default SignupScreen;
