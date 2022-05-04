import React, { Fragment } from "react";
import User from "../models/User";
import OriginProps from "../models/util/OriginProps";
import StatusCode from "../models/util/StatusCode";

type LoginCredential = {
	username: string;
	password: string;
};
type AuthContextObject = {
	isInit: boolean;
	isLogin: boolean;
	currentUser: User | null;
	message: string | null;
	onLogin: (credential: LoginCredential) => Promise<boolean>;
	onLogout: () => Promise<boolean>;
	getCurrentUser: () => Promise<User | false>;
};

export const AuthContext = React.createContext<AuthContextObject>({
	isInit: false,
	isLogin: false,
	currentUser: null,
	message: null,
	onLogin: async (credential: LoginCredential) => {
		return false;
	},
	onLogout: async () => {
		return false;
	},
	getCurrentUser: async () => {
		return false;
	},
});

const AuthContextProvider: React.FC<OriginProps> = (props) => {
	React.useEffect(() => {
		getProfile()
			.then((result: User | false) => {
				setCurrentUser(result || null);
				setIsinit(true);
			})
			.catch();
	}, []);

	const [isInit, setIsinit] = React.useState(false);
	const [isLogin, setIsLogin] = React.useState(false);
	const [currentUser, setCurrentUser] = React.useState<User | null>(null);
	const [message, setMessage] = React.useState<string | null>(null);

	const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

	const getProfile = async () => {
		const response = await fetch(endpoint + "profile", { credentials: "include" });

		if (!response.ok) return false;

		const content = await response.json();
		if (content.status == StatusCode.ok) {
			const data = content.data;
			const user: User = {
				id: data.id,
				name: data.name,
				email: data.email,
				created_at: data.created_at,
				updated_at: data.updated_at,
			};
			return user;
		}
		return false;
	};

	const loginHandler = async (credential: LoginCredential) => {
		const response = await fetch(endpoint + "auth/login", {
			body: JSON.stringify(credential),
			credentials: "include",
			method: "POST",
		});

		if (!response.ok) return false;

		const content = await response.json();

		setMessage(content.message);

		if (content.status == StatusCode.ok) {
			return true;
		}

		if (content.status == StatusCode.bad) {
		}

		if (content.status == StatusCode.error) {
		}

		return false;
	};

	const logoutHandler = async () => {
		const response = await fetch(endpoint + "auth/logout", { credentials: "include" });

		if (!response.ok) return false;

		const content = await response.json();

		if (content.status == StatusCode.ok) {
			return true;
		}

		return false;
	};

	const contextValue: AuthContextObject = {
		isInit,
		isLogin,
		currentUser,
		message,
		onLogin: loginHandler,
		onLogout: logoutHandler,
		getCurrentUser: getProfile,
	};

	return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useContextAuth = () => {
	return React.useContext(AuthContext);
};
