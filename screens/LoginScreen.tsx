import React, { useEffect, useRef, useState } from "react";
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
import { AuthNavProps } from "../types/AuthParamList";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import StatusBarHead from "../components/StatusBarHead";
import { Root, Popup } from "react-native-popup-confirm-toast";

import firestore from "@react-native-firebase/firestore";

const LoginScreen = ({ navigation }: AuthNavProps<"LoginScreen">) => {
	const [data, setdata] = useState({
		email: "",
		password: "",
	});

	const emailInputChange = (val: string) => {
		if (val.length !== 0) {
			setdata({
				...data,
				email: val,
			});
		} else {
			setdata({
				...data,
				email: val,
			});
		}
	};

	const handlePasswordChange = (val: string) => {
		setdata({
			...data,
			password: val,
		});
	};

	const login = async (email: string, password: string) => {
		try {
			await auth().signInWithEmailAndPassword(email, password);
		} catch (e) {
			console.log(e);
			Popup.show({
				type: "warning",
				title: "Email or password is wrong or you haven't signed in",
				callback: () => Popup.hide(),
				timing: 0,
				okButtonStyle: { backgroundColor: "#1E2E46" },
			});
		}
	};

	const googleSignin = async () => {
		try {
			// Get the users ID token
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
						return auth().signInWithCredential(googleCredential);
					} else {
						Popup.show({
							type: "warning",
							title: "Account does not exists, please sign up first",
							callback: () => Popup.hide(),
							timing: 0,
							okButtonStyle: { backgroundColor: "#1E2E46" },
						});
					}
				});

			// await auth().fetchSignInMethodsForEmail()
		} catch (error) {
			console.log(error);
		}
	};

	const fblogin = async () => {
		try {
			// Attempt login with permissions
			const result = await LoginManager.logInWithPermissions([
				"public_profile",
				"email",
			]);

			if (result.isCancelled) {
				throw "User cancelled the login process";
			}

			// Once signed in, get the users AccesToken
			const data = await AccessToken.getCurrentAccessToken();

			if (!data) {
				throw "Something went wrong obtaining access token";
			}

			// Create a Firebase credential with the AccessToken
			const facebookCredential = auth.FacebookAuthProvider.credential(
				data.accessToken
			);

			// Sign-in the user with the credential
			await auth().signInWithCredential(facebookCredential);
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
				<View style={styles.header}>
					<Image source={require("../assets/logo.png")} style={styles.logo} />
					<Text style={styles.logoText}>Aviate Coders </Text>
				</View>
				<Text style={styles.mainText}>Welcome back</Text>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						onPress={() => googleSignin()}
						style={styles.googleButton}
					>
						<Image
							source={require("../assets/google.png")}
							style={styles.googleIcon}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => fblogin()}
						style={styles.googleButton}
					>
						<FontAwesome name="facebook" size={24} color="#4866AB" />
					</TouchableOpacity>
				</View>
				<TextInput
					style={styles.input}
					placeholder={"Email"}
					secureTextEntry={false}
					placeholderTextColor="#ACA6A7"
					onChangeText={(val) => emailInputChange(val)}
				/>
				{/* <TextInput
					style={styles.input}
					placeholder={"Password"}
					secureTextEntry={true}
					placeholderTextColor="#ACA6A7"
					autoCapitalize="none"
					// ref={inputElementRef}
					onChangeText={(val) => handlePasswordChange(val)}
				/> */}
				<TextInput
					ref={(ref) =>
						ref &&
						ref.setNativeProps({
							// text: ref.props.value,
							style: { fontFamily: "Adamina-Regular" },
						})
					}
					style={styles.input}
					placeholder="Password"
					placeholderTextColor="grey"
					secureTextEntry={true}
					value={data.password}
					onChangeText={(val) => handlePasswordChange(val)}
				/>

				<TouchableOpacity
					onPress={() => login(data.email, data.password)}
					style={styles.signupButton}
				>
					<Text style={[styles.btnText]}>Login</Text>
				</TouchableOpacity>
				<View style={styles.divider} />
				<View style={styles.row}>
					<Text style={styles.redirectText}>Don't have an account?</Text>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("SignupScreen");
						}}
					>
						<Text style={[styles.redirectTextLink]}>Signup</Text>
					</TouchableOpacity>
				</View>
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
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
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
		shadowOpacity: 1,
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
		width: "80%",
	},
	input: {
		width: "80%",
		fontSize: 16,
		fontFamily: "Adamina-Regular",
		// fontFamily: "Helvetica",
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
		width: "80%",
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
		fontFamily: "Adamina-Regular",
		color: "#fff",
	},
	divider: {
		borderWidth: 0.5,
		borderColor: "black",
		margin: 10,
	},
	redirectText: {
		fontSize: 18,
		fontFamily: "Adamina-Regular",
		color: "black",
		textAlign: "center",
		paddingRight: 5,
	},
	redirectTextLink: {
		fontSize: 18,
		fontFamily: "Adamina-Regular",
		color: "purple",
		paddingLeft: 1,

		// fontWeight: "bold",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		// width: "70%",
	},
});

export default LoginScreen;
