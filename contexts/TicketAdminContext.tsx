import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import React from "react";
import Ticket from "../models/Ticket";
import TicketGroup from "../models/TicketGroup";
import OriginProps from "../models/util/OriginProps";
import StatusCode from "../models/util/StatusCode";
import { useContextHttp } from "./HttpContext";

type TicketAdminContextObj = {
	errMessage: string | null;
	ticketStatus: any[];
	getTicketGroupList: () => Promise<TicketGroup[] | false>;
	activeTicketGroup: (ticketGroup: TicketGroup) => Promise<TicketGroup | false>;
	inactiveTicketGroup: (ticketGroup: TicketGroup) => Promise<TicketGroup | false>;
	nextTicket: (ticketGroupId: number) => Promise<Ticket | false>;
	executeTicket: (ticketId: number) => Promise<Ticket | false>;
	recallTicket: (ticketId: number) => Promise<Ticket | false>;
	postponeTicket: (ticketId: number) => Promise<Ticket | false>;
	rejectTicket: (ticketId: number) => Promise<Ticket | false>;
};

export const TicketAdminContext = React.createContext<TicketAdminContextObj>({
	errMessage: "",
	ticketStatus: [],
	getTicketGroupList: async () => false,
	activeTicketGroup: async (ticketGroup: TicketGroup) => false,
	inactiveTicketGroup: async (ticketGroup: TicketGroup) => false,
	nextTicket: async (ticketGroupId: number) => false,
	executeTicket: async (ticketId: number) => false,
	recallTicket: async (ticketId: number) => false,
	postponeTicket: async (ticketId: number) => false,
	rejectTicket: async (ticketId: number) => false,
});

interface Props extends OriginProps {
	ticketStatus?: any;
}

const TicketAdminContextProvider: React.FC<Props> = (props) => {
	const [errMessage, setErrMessage] = React.useState<string | null>(null);

	const { ticketStatus } = props;

	const router = useRouter();
	const http = useContextHttp();

	const getTicketGroupList = async (): Promise<TicketGroup[] | false> => {
		const response = await http.get("admin/ticket/groups");

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			setErrMessage(content.message);
			return false;
		}

		return content.data;
	};

	const activeTicketGroup = async (ticketGroup: TicketGroup): Promise<TicketGroup | false> => {
		const response = await http.get("admin/setting/ticketGroupActive/" + ticketGroup.id);

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			setErrMessage(content.message);
			return false;
		}

		return content.data;
	};

	const inactiveTicketGroup = async (ticketGroup: TicketGroup): Promise<TicketGroup | false> => {
		const response = await http.get("admin/setting/ticketGroupInactive/" + ticketGroup.id);

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			setErrMessage(content.message);
			return false;
		}

		return content.data;
	};

	const nextTicket = async (ticketGroupId: number): Promise<Ticket | false> => {
		const response = await http.get("admin/ticket/next/" + ticketGroupId);

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			setErrMessage(content.message);
			return false;
		}

		return content.data;
	};

	const executeTicket = async (ticketId: number): Promise<Ticket | false> => {
		const response = await http.get("admin/ticket/execute/" + ticketId);

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			setErrMessage(content.message);
			return false;
		}

		return content.data;
	};

	const recallTicket = async (ticketId: number): Promise<Ticket | false> => {
		const response = await http.get("admin/ticket/recall/" + ticketId);

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			setErrMessage(content.message);
			return false;
		}

		return content.data;
	};

	const postponeTicket = async (ticketId: number): Promise<Ticket | false> => {
		const response = await http.get("admin/ticket/postpone/" + ticketId);

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			setErrMessage(content.message);
			return false;
		}

		return content.data;
	};

	const rejectTicket = async (ticketId: number): Promise<Ticket | false> => {
		const response = await http.get("admin/ticket/reject/" + ticketId);

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			setErrMessage(content.message);
			return false;
		}

		return content.data;
	};

	const handleHttpStatus = async (HttpStatus: number) => {
		if (HttpStatus === 200 || HttpStatus === 204) {
			return true;
		}
		if (HttpStatus === 401) {
			router.push("/auth");
			setErrMessage("Unauthenticate");
			return false;
		} else {
			setErrMessage("Something went Wrong");
			return false;
		}
	};

	const contextValue: TicketAdminContextObj = {
		errMessage,
		ticketStatus,
		getTicketGroupList,
		activeTicketGroup,
		inactiveTicketGroup,
		nextTicket,
		executeTicket,
		recallTicket,
		postponeTicket,
		rejectTicket,
	};

	return <TicketAdminContext.Provider value={contextValue}>{props.children}</TicketAdminContext.Provider>;
};

export default TicketAdminContextProvider;

export async function getStaticProps() {
	let ticketStatus: any;

	const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
	const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME;
	
	const HTTP_HEADER = { Accept: "application/json", "Content-Type": "application/json" };
	const FETCH_OPTION: AxiosRequestConfig = { withCredentials: true, xsrfCookieName: cookieName };
	const AXIOS_CONFIG = { ...FETCH_OPTION, Headers: HTTP_HEADER };

	const response = await axios.get(endpoint + "admin/ticket/status", AXIOS_CONFIG);

	if (response.status != 200) ticketStatus = false;

	const content = response.data;

	if (content.status !== StatusCode.ok) {
		return false;
	}

	ticketStatus = content.data;

	return {
		props: {
			ticketStatus,
		},
	};
}

export const useContextTicketAdmin = () => {
	return React.useContext(TicketAdminContext);
};
