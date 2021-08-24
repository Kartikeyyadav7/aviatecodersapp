import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { context } from "../state";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const Routes = () => {
	const { state, dispatch } = useContext(context);
	const [initializing, setInitializing] = useState(true);

	const onAuthStateChanged = (user: any) => {
		dispatch({ type: "SET_USER", payload: user });
		if (initializing) setInitializing(false);
	};

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	if (initializing) return null;

	return (
		<NavigationContainer>
			{state.user ? <AppStack /> : <AuthStack />}
			{/* <AuthStack /> */}
		</NavigationContainer>
	);
};

export default Routes;
