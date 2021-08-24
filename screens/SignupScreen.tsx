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
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import auth from "@react-native-firebase/auth";
import { AuthNavProps } from "../types/AuthParamList";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

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
			await auth().createUserWithEmailAndPassword(email, password);
		} catch (e) {
			console.log(e);
		}
	};

	const googleSignin = async () => {
		try {
			// Get the users ID token
			const { idToken } = await GoogleSignin.signIn();

			// Create a Google credential with the token
			const googleCredential = auth.GoogleAuthProvider.credential(idToken);

			// Sign-in the user with the credential
			return auth().signInWithCredential(googleCredential);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={require("../assets/logo.png")} style={styles.logo} />
				<Text style={styles.logoText}>Aviate Coders </Text>
			</View>

			<Text style={styles.mainText}>Become An Aviated Coder</Text>
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
					onPress={() => console.log("hola")}
					style={styles.googleButton}
				>
					<AntDesign
						// style={[styles.twitterIcon, route.params.twitterIconStyle]}
						name="twitter"
						size={24}
						color="#5DA9DD"
					/>
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
		</View>
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
		shadowColor: "rgba(0, 0, 0, 0.1)",
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
	},
	redirectTextLink: {
		fontFamily: `Adamina-Regular`,
		fontSize: 18,
		color: "purple",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "70%",
	},
});

export default SignupScreen;
