import React from "react";
import ProgressBackdrop from "../components/ui/ProgressBackdrop";
import User from "../models/User";
import LoginCredential from "../models/util/LoginCredential";
import OriginProps from "../models/util/OriginProps";
import StatusCode from "../models/util/StatusCode";
import { useContextHttp } from "./HttpContext";

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

	const http = useContextHttp();

	const setup = React.useCallback(async () => {
		await http.getBase("sanctum/csrf-cookie");
	}, [http]);

	const getProfile = React.useCallback(async () => {
		try {
			const response = await http.get("profile");
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
	}, [http]);

	const setProfile = React.useCallback(async () => {
		const user = await getProfile();

		if (user) {
			setCurrentUser(user);
			setIsLogin(true);
			return user;
		} else {
			setIsLogin(false);
		}

		return false;
	}, [getProfile]);

	const loginHandler = async (credential: LoginCredential) => {
		const response = await http.post("auth/login", credential);

		console.log(response);
		if (response.status != 200) return false;

		const content = await response.data;

		setMessage(content.message);

		if (content.status == StatusCode.ok) {
			setIsLogin(true);
			return true;
		}

		if (content.status == StatusCode.bad) {
		}

		if (content.status == StatusCode.error) {
		}

		setIsLogin(false);
		return false;
	};

	const logoutHandler = async () => {
		const response = await http.get("auth/logout");

		if (response.status != 200) return false;

		const content = await response.data;

		if (content.status == StatusCode.ok) {
			setCurrentUser(null);
			setIsLogin(false);
			return true;
		}

		return false;
	};

	// Initial Component
	React.useEffect(() => {
		if (!isInit) {
			setup()
				.then(() => {
					setProfile()
						.then(() => {
							setIsinit(true);
						})
						.catch();
				})
				.catch();
		}
	}, [isInit, setProfile, setup]);

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
		return <ProgressBackdrop open={!isInit} />;
	}

	return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useContextAuth = () => {
	return React.useContext(AuthContext);
};
