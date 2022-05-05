import { Http } from "@mui/icons-material";
import { Backdrop, CircularProgress } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import React from "react";
import ProgressBackdrop from "../components/ui/ProgressBackdrop";
import User from "../models/User";
import LoginCredential from "../models/util/LoginCredential";
import OriginProps from "../models/util/OriginProps";
import StatusCode from "../models/util/StatusCode";

type AuthContextObject = {
	isInit: boolean;
	isLogin: boolean;
	currentUser: User | null;
	message: string | null;
	onLogin: (credential: LoginCredential) => Promise<boolean>;
	onLogout: () => Promise<boolean>;
	getCurrentUser: () => Promise<User | false>;
	setProfile: () => Promise<User | false>;
};

export const AuthContext = React.createContext<AuthContextObject>({
	isInit: false,
	isLogin: false,
	currentUser: null,
	message: null,
	onLogin: async (credential) => {
		return false;
	},
	onLogout: async () => {
		return false;
	},
	getCurrentUser: async () => {
		return false;
	},
	setProfile: async () => {
		return false;
	},
});

const AuthContextProvider: React.FC<OriginProps> = (props) => {
	const [isInit, setIsinit] = React.useState(false);
	const [isLogin, setIsLogin] = React.useState(false);
	const [currentUser, setCurrentUser] = React.useState<User | null>(null);
	const [message, setMessage] = React.useState<string | null>(null);

	React.useEffect(() => {
		console.log(isInit, isLogin, currentUser, message);
		setup()
			.then(() => {
				setProfile()
					.then(() => {
						setIsinit(true);
					})
					.catch();
			})
			.catch();
	}, []);

	const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
	const apiBase = process.env.NEXT_PUBLIC_API_BASE;
	const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME;

	const GET_HEADER = { Accept: "application/json" };
	const POST_HEADER = { ...GET_HEADER, "Content-Type": "application/json" };
	const FETCH_OPTION: AxiosRequestConfig = { withCredentials: true, xsrfCookieName: cookieName };

	const setup = async () => {
		await axios.get(apiBase + "sanctum/csrf-cookie", { ...FETCH_OPTION, headers: GET_HEADER });
	};

	const setProfile = async () => {
		const user = await getProfile();

		if (user) {
			setCurrentUser(user);
			setIsLogin(true);
			return user;
		}

		return false;
	};

	const getProfile = async () => {
		try {
			const response = await axios.get(endpoint + "profile", { ...FETCH_OPTION, headers: GET_HEADER });
			if (response.status != 200) return false;
			const content = await response.data;
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
		} catch (error) {
			console.log("Unauthenticated.");
		}

		return false;
	};

	const loginHandler = async (credential: LoginCredential) => {
		const response = await axios.post(endpoint + "auth/login", credential, {
			...FETCH_OPTION,
			headers: POST_HEADER,
		});

		console.log(response);
		if (response.status != 200) return false;

		const content = await response.data;

		setMessage(content.message);

		if (content.status == StatusCode.ok) {
			await setIsLogin(true);
			return true;
		}

		if (content.status == StatusCode.bad) {
		}

		if (content.status == StatusCode.error) {
		}

		await setIsLogin(false);
		return false;
	};

	const logoutHandler = async () => {
		const response = await axios.get(endpoint + "auth/logout", { ...FETCH_OPTION, headers: GET_HEADER });

		if (response.status != 200) return false;

		const content = await response.data;

		if (content.status == StatusCode.ok) {
			await setCurrentUser(null);
			await setIsLogin(false);
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
		setProfile: setProfile,
	};

	if (!isInit) {
		return (
			<ProgressBackdrop open={!isInit} />
		);
	}

	return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useContextAuth = () => {
	return React.useContext(AuthContext);
};
