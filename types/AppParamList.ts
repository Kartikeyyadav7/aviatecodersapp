import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type AppParamList = {
	HomeScreen: undefined;
};

export type AuthNavProps<T extends keyof AppParamList> = {
	navigation: StackNavigationProp<AppParamList, T>;
	route: RouteProp<AppParamList, T>;
};
