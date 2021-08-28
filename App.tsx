import React, { useEffect, useReducer, useState } from "react";
import RNBootSplash from "react-native-bootsplash";
import { SafeAreaView } from "react-native";
import Routes from "./navigation/Routes";
import { defaultState, Provider, reducer } from "./state";

export default function App() {
	const [state, dispatch] = useReducer(reducer, defaultState);

	useEffect(() => {
		setInterval(() => {
			RNBootSplash.hide({ fade: true });
		}, 500);
	}, []);

	return (
		// <SafeAreaView>
		<Provider value={{ state, dispatch }}>
			<Routes />
		</Provider>
		// </SafeAreaView>
	);
}

// import React, { useEffect } from "react";
// import {
// 	SafeAreaView,
// 	ScrollView,
// 	StatusBar,
// 	StyleSheet,
// 	Text,
// 	useColorScheme,
// 	View,
// } from "react-native";

// import {
// 	Colors,
// 	DebugInstructions,
// 	Header,
// 	LearnMoreLinks,
// 	ReloadInstructions,
// } from "react-native/Libraries/NewAppScreen";

// const Section: React.FC<{
// 	title: string;
// }> = ({ children, title }) => {
// 	const isDarkMode = useColorScheme() === "dark";

// 	useEffect(() => {
// 		setInterval(() => {
// 			RNBootSplash.hide({ fade: true });
// 		}, 1000);
// 	}, []);

// 	return (
// 		<View style={styles.sectionContainer}>
// 			<Text
// 				style={[
// 					styles.sectionTitle,
// 					{
// 						color: isDarkMode ? Colors.white : Colors.black,
// 					},
// 				]}
// 			>
// 				{title}
// 			</Text>
// 			<Text
// 				style={[
// 					styles.sectionDescription,
// 					{
// 						color: isDarkMode ? Colors.light : Colors.dark,
// 					},
// 				]}
// 			>
// 				{children}
// 			</Text>
// 		</View>
// 	);
// };

// const App = () => {
// 	const isDarkMode = useColorScheme() === "dark";

// 	const backgroundStyle = {
// 		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
// 	};

// 	return (
// 		<SafeAreaView style={backgroundStyle}>
// 			<StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
// 			<ScrollView
// 				contentInsetAdjustmentBehavior="automatic"
// 				style={backgroundStyle}
// 			>
// 				<Header />
// 				<View
// 					style={{
// 						backgroundColor: isDarkMode ? Colors.black : Colors.white,
// 					}}
// 				>
// 					<Section title="Aviate Coders">
// 						Edit <Text style={styles.highlight}>App.js</Text> to change this
// 						screen and then come back to see your edits.
// 					</Section>
// 					<Section title="See Your Changes">
// 						<ReloadInstructions />
// 					</Section>
// 					<Section title="Debug">
// 						<DebugInstructions />
// 					</Section>
// 					<Section title="Learn More">
// 						Read the docs to discover what to do next:
// 					</Section>
// 					<LearnMoreLinks />
// 				</View>
// 			</ScrollView>
// 		</SafeAreaView>
// 	);
// };

// const styles = StyleSheet.create({
// 	sectionContainer: {
// 		marginTop: 32,
// 		paddingHorizontal: 24,
// 	},
// 	sectionTitle: {
// 		fontSize: 24,
// 		fontWeight: "600",
// 	},
// 	sectionDescription: {
// 		marginTop: 8,
// 		fontSize: 18,
// 		fontWeight: "400",
// 	},
// 	highlight: {
// 		fontWeight: "700",
// 	},
// });

// export default App;
