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
	onRegister: (register: any) => Promise<any>;
	onUpdate: (userData: User) => Promise<User | false>;
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
	onRegister: async (register: any) => {},
	onUpdate: async (userData: User) => {
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

	const getCurrentUserHandler = React.useCallback(async () => {
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

	const setProfileHandler = React.useCallback(async () => {
		const user = await getCurrentUserHandler();

		if (user) {
			setCurrentUser(user);
			setIsLogin(true);
			return user;
		} else {
			setIsLogin(false);
		}

		return false;
	}, [getCurrentUserHandler]);

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

	const registerHandler = async (data: any) => {
		const response = await http.post("user/register", data);

		if (response.status != 200) return false;

		const content = await response.data;

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

	const updateHandler = async (userData: User) => {
		const response = await http.put("profile", userData);

		if (response.status != 200) return false;

		const content = await response.data;

		setMessage(content.message);

		if (content.status == StatusCode.ok) {
			return content.data;
		}

		if (content.status == StatusCode.bad) {
		}

		if (content.status == StatusCode.error) {
		}

		return false;
	};

	// Initial Component
	React.useEffect(() => {
		if (!isInit) {
			setup()
				.then(() => {
					setProfileHandler()
						.then(() => {
							setIsinit(true);
						})
						.catch();
				})
				.catch();
		}
	}, [isInit, setProfileHandler, setup]);

	const contextValue: AuthContextObject = {
		isInit,
		isLogin,
		currentUser,
		message,
		onLogin: loginHandler,
		onLogout: logoutHandler,
		getCurrentUser: getCurrentUserHandler,
		setProfile: setProfileHandler,
		onRegister: registerHandler,
		onUpdate: updateHandler,
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
