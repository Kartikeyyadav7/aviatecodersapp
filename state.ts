// import React, {createContext, useState} from 'react';
// import auth from '@react-native-firebase/auth';

// export const AuthContext = createContext({
//     user: null,
//     setUser: () => 0,
//     login : () => 0,
//     register: () => 0,
//     logout: () => 0
// })

// interface AuthProviderProps {
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
//   const [user, setUser] = useState(null);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         setUser,
//         login: async (email, password) => {
//           try {
//             await auth().signInWithEmailAndPassword(email, password);
//           } catch (e) {
//             console.log(e);
//           }
//         },
//         register: async (email, password) => {
//           try {
//             await auth().createUserWithEmailAndPassword(email, password)
//           } catch (e) {
//             console.log(e);
//           }
//         },
//         logout: async () => {
//           try {
//             await auth().signOut();
//           } catch (e) {
//             console.log(e);
//           }
//         },
//       }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { createContext } from "react";

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
