import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import React from "react";
import OriginProps from "../models/util/OriginProps";

type HttpContextObj = {
	endpoint?: string;
	endpointBase?: string;
	get: (uri: string) => Promise<AxiosResponse>;
	post: (uri: string, body?: any) => Promise<AxiosResponse>;
	put: (uri: string, body?: any) => Promise<AxiosResponse>;
	delete: (uri: string) => Promise<AxiosResponse>;

	getBase: (uri: string) => Promise<AxiosResponse>;
};

const AxiosResponseDummy: AxiosResponse = { data: {}, status: 0, headers: {}, config: {}, statusText: "" };

export const HttpContext = React.createContext<HttpContextObj>({
	endpoint: "",
	endpointBase: "",
	get: async (uri: string) => {
		return AxiosResponseDummy;
	},
	post: async (uri: string, body?: any) => {
		return AxiosResponseDummy;
	},
	put: async (uri: string, body?: any) => {
		return AxiosResponseDummy;
	},
	delete: async (uri: string) => {
		return AxiosResponseDummy;
	},
	getBase: async (uri: string) => {
		return AxiosResponseDummy;
	},
});

const HttpContextProvider: React.FC<OriginProps> = (props) => {
	const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
	const endpointBase = process.env.NEXT_PUBLIC_API_BASE;

	const HTTP_HEADER = { Accept: "application/json", "Content-Type": "application/json" };
	const FETCH_OPTION: AxiosRequestConfig = { withCredentials: true };
	const AXIOS_CONFIG = { ...FETCH_OPTION, Headers: HTTP_HEADER };

	const getRequest = async (uri: string) => {
		try {
			const response = await axios.get(endpoint + uri, AXIOS_CONFIG);
			return response;
		} catch (error: any) {
			return error.response;
		}
	};
	const postRequest = async (uri: string, body?: any) => {
		try {
			const data = body ? body : {};
			const response = await axios.post(endpoint + uri, data, AXIOS_CONFIG);
			return response;
		} catch (error: any) {
			return error.response;
		}
	};
	const putRequest = async (uri: string, body?: any) => {
		try {
			const data = body ? body : {};
			const response = await axios.put(endpoint + uri, data, AXIOS_CONFIG);
			return response;
		} catch (error: any) {
			return error.response;
		}
	};
	const deleleRequest = async (uri: string) => {
		try {
			const response = await axios.delete(endpoint + uri, AXIOS_CONFIG);
			return response;
		} catch (error: any) {
			return error.response;
		}
	};

	const getBaseRequest = async (uri: string) => {
		try {
			const response = await axios.get(endpointBase + uri, AXIOS_CONFIG);
			return response;
		} catch (error: any) {
			return error.response;
		}
	};

	const contextValue = {
		endpoint,
		endpointBase,
		get: getRequest,
		post: postRequest,
		put: putRequest,
		delete: deleleRequest,
		getBase: getBaseRequest,
	};
	return <HttpContext.Provider value={contextValue}>{props.children}</HttpContext.Provider>;
};

export default HttpContextProvider;

export const useContextHttp = () => {
	return React.useContext(HttpContext);
};
