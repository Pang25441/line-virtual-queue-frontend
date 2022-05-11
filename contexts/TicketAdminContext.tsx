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
			return false;
		}

		return content.data;
	};

	const nextTicket = async (ticketGroupId: number): Promise<Ticket | false> => {
		const response = await http.get("admin/ticket/next/" + ticketGroupId);

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			return false;
		}

		return content.data;
	};

	const executeTicket = async (ticketId: number): Promise<Ticket | false> => {
		const response = await http.get("admin/ticket/execute/" + ticketId);

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			return false;
		}

		return content.data;
	};

	const recallTicket = async (ticketId: number): Promise<Ticket | false> => {
		const response = await http.get("admin/ticket/recall/" + ticketId);

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			return false;
		}

		return content.data;
	};

	const postponeTicket = async (ticketId: number): Promise<Ticket | false> => {
		const response = await http.get("admin/ticket/postpone/" + ticketId);

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
			return false;
		}

		return content.data;
	};

	const rejectTicket = async (ticketId: number): Promise<Ticket | false> => {
		const response = await http.get("admin/ticket/reject/" + ticketId);

		if (!(await handleHttpStatus(response.status))) return false;

		const content = response.data;

		if (content.status !== StatusCode.ok) {
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

	const http = useContextHttp();

	const response = await http.get("admin/ticket/status");

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
