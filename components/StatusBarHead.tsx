import React, { useState } from "react";
import { StatusBar } from "react-native";

const STYLES = ["dark-content"];

const StatusBarHead = () => {
	const [statusBarStyle, setStatusBarStyle] = useState<any>(STYLES[0]);

	return (
		<StatusBar
			animated={true}
			backgroundColor="#E0E1E1"
			barStyle={statusBarStyle}
		/>
	);
};

export default StatusBarHead;
