import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React, { createContext } from "react";

type Context = {
	user: FirebaseAuthTypes.User | null;
};

const initialState = {
	user: null,
};

function stateReducer(state: Context, action: { type: string; payload: any }) {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
}

const stateContext = createContext<{ state: Context; dispatch: Function }>({
	state: initialState,
	dispatch: () => 0,
});

export const Provider = stateContext.Provider;

export const reducer = stateReducer;

export const context = stateContext;

export const defaultState = initialState;
